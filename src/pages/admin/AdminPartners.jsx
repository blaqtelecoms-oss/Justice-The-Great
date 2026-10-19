import React from "react";
import AdminContentManager from "@/components/JTG/AdminContentManager";

export default function AdminPartners() {
  return (
    <AdminContentManager
      entityName="Partner"
      title="Partners & Supporters"
      fields={[
        { key: "name", label: "Partner name" },
        { key: "logo_url", label: "Logo URL (optional)" },
        { key: "order", label: "Display order", type: "number" },
      ]}
    />
  );
}