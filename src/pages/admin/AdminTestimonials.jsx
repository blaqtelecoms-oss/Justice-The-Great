import React from "react";
import AdminContentManager from "@/components/JTG/AdminContentManager";

export default function AdminTestimonials() {
  return (
    <AdminContentManager
      entityName="Testimonial"
      title="Testimonials"
      fields={[
        { key: "name", label: "Member name" },
        { key: "role_city", label: "Role / City" },
        { key: "quote", label: "Quote", type: "textarea" },
        { key: "order", label: "Display order", type: "number" },
      ]}
    />
  );
}