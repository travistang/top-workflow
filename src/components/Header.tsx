import React from "react";
import { VscCode } from "react-icons/vsc";
export default function Header() {
  return (
    <div className="flex items-center h-16 z-50">
      <span className="font-bold flex items-center gap-2">
        <VscCode className="h-8 w-8" />
        Workflow
      </span>
    </div>
  );
}
