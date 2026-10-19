import React from "react";
import AdminContentManager from "@/components/JTG/AdminContentManager";

export default function AdminPlans() {
  return (
    <AdminContentManager
      entityName="FuneralPlan"
      title="Funeral Plans"
      fields={[
        { key: "name", label: "Plan name" },
        { key: "tagline", label: "Tagline" },
        { key: "blurb", label: "Blurb", type: "textarea" },
        { key: "benefits", label: "Benefits (one per line)", type: "list" },
        { key: "photo_url", label: "Photo URL" },
        { key: "order", label: "Display order", type: "number" },
      ]}
    />
  );
}