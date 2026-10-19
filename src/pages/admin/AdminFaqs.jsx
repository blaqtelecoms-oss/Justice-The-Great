import React from "react";
import AdminContentManager from "@/components/JTG/AdminContentManager";

export default function AdminFaqs() {
  return (
    <AdminContentManager
      entityName="FAQItem"
      title="FAQ Items"
      fields={[
        { key: "question", label: "Question" },
        { key: "answer", label: "Answer", type: "textarea" },
        { key: "order", label: "Display order", type: "number" },
      ]}
    />
  );
}