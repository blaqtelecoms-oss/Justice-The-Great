import React, { useEffect, useState, useOutletContext } from "react";
import { base44 } from "@/api/base44Client";

const statusBadge = (s) =>
  s === "active"
    ? "bg-green-100 text-green-700"
    : s === "lapsed"
    ? "bg-red-100 text-red-700"
    : "bg-slate-100 text-slate-600";

export default function SchemeMembers() {
  const { member } = useOutletContext();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!member || member.scheme_type !== "Group" || !member.group_scheme_id) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const list = await base44.entities.Member.filter({ group_scheme_id: member.group_scheme_id });
        setMembers(list || []);
      } finally {
        setLoading(false);
      }
    })();
  }, [member]);

  if (!member || member.scheme_type !== "Group") {
    return (
      <div>
        <h1 className="text-2xl font-bold text-[#001f3f]">Scheme members</h1>
        <p className="text-slate-500 mt-2">This page is only available for group scheme members.</p>
      </div>
    );
  }

  const activeCount = members.filter((m) => m.status === "active").length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#001f3f]">Scheme members</h1>
      <p className="text-slate-500 mt-1">Everyone covered under your group scheme.</p>

      <div className="mt-6 grid sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Scheme ID</p>
          <p className="text-lg font-bold text-[#001f3f] mt-1">{member.group_scheme_id}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Total members</p>
          <p className="text-lg font-bold text-[#001f3f] mt-1">{members.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-500 font-medium">Active</p>
          <p className="text-lg font-bold text-[#001f3f] mt-1">{activeCount}</p>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="p-8 flex justify-center">
            <div className="w-6 h-6 border-4 border-slate-200 border-t-[#0077b6] rounded-full animate-spin" />
          </div>
        ) : members.length === 0 ? (
          <p className="p-8 text-sm text-slate-500">No members found in this scheme.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Name</th>
                <th className="text-left px-5 py-3 font-medium">Plan</th>
                <th className="text-left px-5 py-3 font-medium">Cover</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {members.map((m) => (
                <tr key={m.id}>
                  <td className="px-5 py-3 font-medium text-[#001f3f]">
                    {m.full_name}
                    {m.id === member.id && <span className="ml-2 text-xs text-[#0077b6]">(you)</span>}
                  </td>
                  <td className="px-5 py-3 text-slate-600">{m.plan_type}</td>
                  <td className="px-5 py-3 text-slate-600">R {m.cover_amount?.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusBadge(m.status)}`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}