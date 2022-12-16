import React from "react";
import { VscCode, VscEye } from "react-icons/vsc";
import { useRecoilState } from "recoil";
import { focusedTaskSelector } from "../atoms/tasks";
import Button from "./Input/Button";
export default function Header() {
  const [focusedTask, setFocusedTask] = useRecoilState(focusedTaskSelector);
  return (
    <div className="flex items-center h-16 z-50 justify-between">
      <span className="font-bold flex items-center gap-2">
        <VscCode className="h-8 w-8" />
        Workflow
      </span>
      <div className="flex items-center justify-end">
        {focusedTask && (
          <Button onClick={() => setFocusedTask(null)}
            className="flex items-center gap-2">
            <VscEye />
            Show all Tasks
          </Button>
        )}
      </div>
    </div>
  );
}
