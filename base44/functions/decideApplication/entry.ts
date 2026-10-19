import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden — admin access required' }, { status: 403 });

    const body = await req.json();
    const applicationId = (body && body.application_id) || '';
    const decision = (body && body.decision) || '';
    const notes = (body && body.decision_notes) || '';

    if (!applicationId || !['Approve', 'Decline'].includes(decision)) {
      return Response.json({ error: 'Application id and a valid decision (Approve or Decline) are required.' }, { status: 400 });
    }

    const application = await base44.asServiceRole.entities.MembershipApplication.get(applicationId);
    if (!application) {
      return Response.json({ error: 'Application not found.' }, { status: 404 });
    }
    if (application.status !== 'Pending') {
      return Response.json({ error: `Application has already been ${application.status.toLowerCase()}.` }, { status: 409 });
    }

    const status = decision === 'Approve' ? 'Approved' : 'Declined';
    const today = new Date().toISOString().slice(0, 10);

    // Update the application record with the decision
    await base44.asServiceRole.entities.MembershipApplication.update(applicationId, {
      status,
      decision_notes: notes,
      decided_by_id: user.id,
      decided_date: today,
    });

    let member = null;
    if (decision === 'Approve') {
      // Create a Member policy record from the approved application
      const policyNumber = 'JTG-' + Date.now().toString().slice(-8);
      const memberData = {
        full_name: application.full_name,
        id_number: application.id_number,
        phone: application.phone || '',
        email: application.email || '',
        address: application.address || '',
        policy_number: policyNumber,
        plan_type: application.plan_type || 'Individual',
        scheme_type: application.scheme_type || 'Individual',
        group_scheme_id: application.scheme_type === 'Group' ? (application.group_name || '') : '',
        cover_amount: application.cover_amount || 0,
        premium_amount: application.premium_amount || 0,
        policy_start_date: today,
        status: 'active',
        premium_paid_up_to: today,
      };
      member = await base44.asServiceRole.entities.Member.create(memberData);
    }

    return Response.json({ success: true, status, member });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}