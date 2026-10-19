import React from "react";
import AdminContentManager from "@/components/JTG/AdminContentManager";

export default function AdminSectionCopy() {
  return (
    <AdminContentManager
      entityName="SectionCopy"
      title="Section Copy"
      sortField="key"
      fields={[
        { key: "key", label: "Key (unique identifier)" },
        { key: "label", label: "Label (admin only)" },
        { key: "value", label: "Value", type: "textarea" },
      ]}
    />
  );
}