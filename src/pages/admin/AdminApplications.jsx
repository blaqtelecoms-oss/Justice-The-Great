import React, { useEffect, useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  Search,
  Inbox,
} from "lucide-react";

const TABS = [
  { key: "Pending", label: "Pending", icon: Clock },
  { key: "Approved", label: "Approved", icon: CheckCircle2 },
  { key: "Declined", label: "Declined", icon: XCircle },
  { key: "All", label: "All", icon: ClipboardList },
];

const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Declined: "bg-red-50 text-red-700 border-red-200",
};

export default function AdminApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("Pending");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [deciding, setDeciding] = useState(false);
  const [notes, setNotes] = useState("");
  const [counts, setCounts] = useState({ Pending: 0, Approved: 0, Declined: 0 });
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await base44.entities.MembershipApplication.filter(
        {},
        { sort: "-created_date", limit: 200 }
      );
      const items = res?.items || [];
      setApps(items);
      setCounts({
        Pending: items.filter((a) => a.status === "Pending").length,
        Approved: items.filter((a) => a.status === "Approved").length,
        Declined: items.filter((a) => a.status === "Declined").length,
      });
    } catch (err) {
      toast({ title: "Could not load applications", description: err?.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = apps.filter((a) => {
    if (tab !== "All" && a.status !== tab) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      a.full_name?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q) ||
      a.id_number?.toLowerCase().includes(q) ||
      a.policy_number?.toLowerCase().includes(q)
    );
  });

  const decide = async (decision) => {
    setDeciding(true);
    try {
      await base44.functions.invoke("decideApplication", {
        application_id: selected.id,
        decision,
        decision_notes: notes,
      });
      toast({
        title: `Application ${decision === "Approve" ? "approved" : "declined"}`,
        description:
          decision === "Approve"
            ? "A new member policy has been created."
            : "The application has been declined.",
      });
      setSelected(null);
      setNotes("");
      await load();
    } catch (err) {
      toast({
        title: "Could not decide",
        description: err?.response?.data?.error || err?.message,
        variant: "destructive",
      });
    } finally {
      setDeciding(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#001f3f]">Membership applications</h1>
          <p className="text-slate-500 mt-1">Review and decide on new membership applications.</p>
        </div>
        <button
          onClick={load}
          className="text-sm font-medium text-[#0077b6] hover:underline flex items-center gap-1.5"
        >
          <Loader2 className={`w-4 h-4 ${loading ? "animate-spin" : "hidden"}`} />
          Refresh
        </button>
      </div>

      {/* Stat chips */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TABS.map((t) => {
          const count = t.key === "All" ? apps.length : counts[t.key] || 0;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-3 p-3.5 rounded-xl border text-left transition ${
                tab === t.key
                  ? "border-[#0077b6] bg-[#0077b6]/5"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                t.key === "Pending" ? "bg-amber-50 text-amber-600"
                : t.key === "Approved" ? "bg-emerald-50 text-emerald-600"
                : t.key === "Declined" ? "bg-red-50 text-red-600"
                : "bg-blue-50 text-blue-600"
              }`}>
                <t.icon className="w-4.5 h-4.5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">{t.label}</p>
                <p className="text-lg font-bold text-[#001f3f]">{count}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="mt-5 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, ID..."
          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0077b6]/30"
        />
      </div>

      {/* List */}
      <div className="mt-5 space-y-3">
        {loading && apps.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Inbox className="w-10 h-10 mb-3" />
            <p className="text-sm font-medium">No {tab === "All" ? "" : tab.toLowerCase()} applications</p>
            <p className="text-xs mt-1">New applications will appear here.</p>
          </div>
        ) : (
          filtered.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-[#001f3f]">{a.full_name}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[a.status]}`}>
                      {a.status}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-slate-500 flex flex-wrap gap-x-4 gap-y-0.5">
                    {a.email && <span>{a.email}</span>}
                    {a.phone && <span>{a.phone}</span>}
                    {a.id_number && <span>ID: {a.id_number}</span>}
                  </div>
                  <div className="mt-1 text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-0.5">
                    <span>Plan: {a.plan_type}</span>
                    <span>Scheme: {a.scheme_type}</span>
                    {a.group_name && <span>Group: {a.group_name}</span>}
                    {a.cover_amount ? <span>Cover: R{a.cover_amount.toLocaleString()}</span> : null}
                    {a.premium_amount ? <span>Premium: R{a.premium_amount.toLocaleString()}/mo</span> : null}
                    <span>Submitted {new Date(a.created_date).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelected(a);
                    setNotes(a.decision_notes || "");
                  }}
                  className="px-4 py-2 rounded-lg bg-[#001f3f] text-white text-sm font-medium hover:bg-[#001f3f]/90 transition whitespace-nowrap"
                >
                  {a.status === "Pending" ? "Review" : "View"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail / decision drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-xl">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-[#001f3f]">{selected.full_name}</h2>
                <span className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-full border ${STATUS_STYLES[selected.status]}`}>
                  {selected.status}
                </span>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <DetailRow label="Email" value={selected.email} />
              <DetailRow label="Phone" value={selected.phone} />
              <DetailRow label="ID number" value={selected.id_number} />
              <DetailRow label="Address" value={selected.address} />
              <DetailRow label="Plan type" value={selected.plan_type} />
              <DetailRow label="Scheme type" value={selected.scheme_type} />
              {selected.group_name && <DetailRow label="Group" value={selected.group_name} />}
              {selected.cover_amount ? <DetailRow label="Cover amount" value={`R ${selected.cover_amount.toLocaleString()}`} /> : null}
              {selected.premium_amount ? <DetailRow label="Monthly premium" value={`R ${selected.premium_amount.toLocaleString()}`} /> : null}
              {selected.notes && <DetailRow label="Applicant notes" value={selected.notes} />}
              <DetailRow label="Submitted" value={new Date(selected.created_date).toLocaleString()} />
              {selected.status !== "Pending" && (
                <>
                  <DetailRow label="Decided by" value={selected.decided_by_id} />
                  {selected.decided_date && <DetailRow label="Decision date" value={selected.decided_date} />}
                  {selected.decision_notes && <DetailRow label="Decision notes" value={selected.decision_notes} />}
                </>
              )}

              {selected.status === "Pending" && (
                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Admin notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add a note about this decision..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#0077b6]/30"
                  />
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => decide("Approve")}
                      disabled={deciding}
                      className="flex-1 px-4 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      {deciding ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                      Approve
                    </button>
                    <button
                      onClick={() => decide("Decline")}
                      disabled={deciding}
                      className="flex-1 px-4 py-2.5 rounded-lg bg-white text-red-600 border border-red-200 text-sm font-semibold hover:bg-red-50 disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" />
                      Decline
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs text-slate-400 font-medium">{label}</p>
      <p className="text-sm text-[#001f3f] mt-0.5">{value}</p>
    </div>
  );
}