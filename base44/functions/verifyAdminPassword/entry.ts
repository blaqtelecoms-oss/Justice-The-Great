import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';
import { hashPassword } from '../../shared/adminPassword.ts';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const body = await req.json();
    const password = (body && body.password) || '';
    if (!password) return Response.json({ error: 'Password is required' }, { status: 400 });

    const settings = await base44.asServiceRole.entities.AdminSetting.list();
    let setting = settings[0];
    if (!setting) {
      // First-time setup: seed the default admin password (Admin2026).
      const hash = await hashPassword('Admin2026');
      setting = await base44.asServiceRole.entities.AdminSetting.create({
        label: 'admin',
        password_hash: hash,
      });
    }

    const submittedHash = await hashPassword(password);
    return Response.json({ valid: submittedHash === setting.password_hash });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}