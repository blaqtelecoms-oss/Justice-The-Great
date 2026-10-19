import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const policy_number = (body.policy_number || '').trim();
    const id_number = (body.id_number || '').trim();
    if (!policy_number || !id_number) {
      return Response.json({ error: 'Policy number and ID number are required.' }, { status: 400 });
    }

    // Find member matching policy_number + id_number (service role: admin created the record)
    const members = await base44.asServiceRole.entities.Member.filter({
      policy_number,
      id_number
    });

    if (!members || members.length === 0) {
      return Response.json({ error: 'No policy found matching those details. Please check your policy and ID number, or contact us to register your policy.' }, { status: 404 });
    }

    const member = members[0];
    if (member.user_id && member.user_id !== user.id) {
      return Response.json({ error: 'This policy is already linked to another account. Please contact us if you believe this is an error.' }, { status: 409 });
    }

    // Link member to this user
    await base44.asServiceRole.entities.Member.update(member.id, { user_id: user.id });
    // Store member_id and group_scheme_id on the user for portal access
    const updateUser = { member_id: member.id };
    if (member.scheme_type === "Group" && member.group_scheme_id) {
      updateUser.group_scheme_id = member.group_scheme_id;
    }
    await base44.auth.updateMe(updateUser);

    return Response.json({ success: true, member_id: member.id, member });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}