import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Plus, Trash2, X } from "lucide-react";

// Generic CRUD manager for landing-content entities. Driven by a field
// config so each admin page is a thin wrapper.
// field types: "text" (default), "textarea", "number", "list" (array of
// strings, edited as one item per line), "image" (a URL).
export default function AdminContentManager({ entityName, title, fields, sortField = "order" }) {
  const { toast } = useToast();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const list = await base44.entities[entityName].list(sortField);
      setItems(list);
    } catch (e) {
      toast({ title: "Failed to load", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startNew = () => {
    const blank = {};
    fields.forEach((f) => {
      blank[f.key] = f.type === "list" ? [] : f.type === "number" ? 0 : "";
    });
    setForm(blank);
    setEditing("new");
  };

  const startEdit = (item) => {
    const f = {};
    fields.forEach((fld) => {
      f[fld.key] =
        fld.type === "list" ? (item[fld.key] || []).join("\n") : item[fld.key] ?? "";
    });
    setForm(f);
    setEditing(item);
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {};
      fields.forEach((f) => {
        if (f.type === "list") {
          payload[f.key] = (form[f.key] || "")
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean);
        } else if (f.type === "number") {
          payload[f.key] = Number(form[f.key]) || 0;
        } else {
          payload[f.key] = form[f.key];
        }
      });
      if (editing === "new") {
        await base44.entities[entityName].create(payload);
      } else {
        await base44.entities[entityName].update(editing.id, payload);
      }
      toast({ title: "Saved" });
      setEditing(null);
      load();
    } catch (e) {
      toast({ title: "Save failed", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item) => {
    if (!window.confirm("Delete this item?")) return;
    try {
      await base44.entities[entityName].delete(item.id);
      toast({ title: "Deleted" });
      load();
    } catch (e) {
      toast({ title: "Delete failed", description: e.message, variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-[#001f3f]">{title}</h1>
        <Button onClick={startNew}>
          <Plus className="w-4 h-4 mr-1" /> Add new
        </Button>
      </div>

      {loading ? (
        <div className="text-slate-500">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-slate-500">No items yet. Click "Add new" to create one.</div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-4 flex items-start justify-between gap-4"
            >
              <div className="min-w-0">
                {fields.map((f, idx) => (
                  <div
                    key={f.key}
                    className={
                      idx === 0
                        ? "font-semibold text-[#001f3f]"
                        : "text-sm text-slate-500"
                    }
                  >
                    {f.type === "list"
                      ? `${(item[f.key] || []).length} items`
                      : String(item[f.key] ?? "").slice(0, 140)}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => startEdit(item)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                  aria-label="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => remove(item)}
                  className="p-2 hover:bg-slate-100 rounded-lg text-destructive"
                  aria-label="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setEditing(null)}
        >
          <div
            className="bg-white rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#001f3f]">
                {editing === "new" ? "Add" : "Edit"} {title}
              </h3>
              <button onClick={() => setEditing(null)} aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <Label htmlFor={f.key}>{f.label}</Label>
                  {f.type === "textarea" || f.type === "list" ? (
                    <Textarea
                      id={f.key}
                      value={form[f.key] || ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      rows={f.type === "list" ? 6 : 3}
                      className="mt-1"
                      placeholder={f.type === "list" ? "One item per line" : ""}
                    />
                  ) : (
                    <Input
                      id={f.key}
                      type={f.type === "number" ? "number" : "text"}
                      value={form[f.key] ?? ""}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="mt-1"
                    />
                  )}
                </div>
              ))}
              <Button onClick={save} disabled={saving} className="w-full">
                {saving ? "Saving…" : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}