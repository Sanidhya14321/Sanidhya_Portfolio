"use client";

import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: "100%", minHeight: "100%" }}>
      {children}
    </div>
  );
}
