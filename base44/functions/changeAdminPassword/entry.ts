import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { hashPassword } from '../../shared/adminPassword.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    const current = (body && body.current_password) || '';
    const next = (body && body.new_password) || '';
    if (!current || !next) {
      return Response.json({ error: 'Current and new passwords are required' }, { status: 400 });
    }
    if (next.length < 6) {
      return Response.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    const settings = await base44.asServiceRole.entities.AdminSetting.list();
    let setting = settings[0];
    if (!setting) {
      const hash = await hashPassword('Admin2026');
      setting = await base44.asServiceRole.entities.AdminSetting.create({
        label: 'admin',
        password_hash: hash,
      });
    }

    const currentHash = await hashPassword(current);
    if (currentHash !== setting.password_hash) {
      return Response.json({ error: 'Current password is incorrect' }, { status: 400 });
    }

    const newHash = await hashPassword(next);
    await base44.asServiceRole.entities.AdminSetting.update(setting.id, { password_hash: newHash });
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}