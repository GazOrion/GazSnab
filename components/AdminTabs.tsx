"use client";

import { ReactNode, useState } from "react";

type Tab = {
  id: string;
  label: string;
  content: ReactNode;
};

export function AdminTabs({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");
  const activeTab = tabs.find((tab) => tab.id === active) ?? tabs[0];

  return (
    <div className="admin-tabs">
      <div className="admin-tab-list" role="tablist" aria-label="Разделы админки">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={tab.id === activeTab.id ? "admin-tab admin-tab-active" : "admin-tab"}
            role="tab"
            aria-selected={tab.id === activeTab.id}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="admin-tab-panel" role="tabpanel">
        {activeTab.content}
      </div>
    </div>
  );
}
