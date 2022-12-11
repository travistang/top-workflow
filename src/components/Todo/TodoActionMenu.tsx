import React from "react";
import {
  VscAdd,
  VscArrowDown,
  VscArrowUp,
  VscCollapseAll,
  VscExpandAll,
  VscInfo,
} from "react-icons/vsc";
import { useRecoilValue } from "recoil";
import { subTaskAtom } from "../../atoms/tasks";
import Dropdown from "../Input/Dropdown";

type Props = {
  taskId: string;
  expanded: boolean;
  allExpanded: boolean;
  onRequestCreateSubTask?: () => void;
  onEditDetails: () => void;
  onToggleExpand: () => void;
  onToggleAllExpand: () => void;
};

export default function TodoActionMenu({
  taskId,
  expanded,
  allExpanded,
  onEditDetails,
  onRequestCreateSubTask,
  onToggleAllExpand,
  onToggleExpand,
}: Props) {
  const hasSubTasks = useRecoilValue(subTaskAtom(taskId)).length > 0;
  const options = [
    {
      value: "create-task",
      label: "Create subtask",
      icon: <VscAdd />,
    },
    {
      value: "details",
      label: "Edit details",
      icon: <VscInfo />,
    },

    ...(hasSubTasks
      ? [
          {
            value: "expand",
            label: expanded ? "Collapse subtasks" : "Expand subtasks",
            icon: expanded ? <VscArrowUp /> : <VscArrowDown />,
          },
          {
            value: "all-expand",
            label: allExpanded
              ? "Collapse all subtasks"
              : "Expand all subtasks",
            icon: allExpanded ? <VscCollapseAll /> : <VscExpandAll />,
          },
        ]
      : []),
  ];
  const onSelectOption = (value: string) => {
    switch (value) {
      case "create-task":
        onRequestCreateSubTask?.();
        break;
      case "details":
        onEditDetails();
        break;
      case "expand":
        onToggleExpand();
        break;
      case "all-expand":
        onToggleAllExpand();
        break;
    }
  };

  return (
    <Dropdown
      inputClassName="bg-text bg-opacity-0"
      dropdownClassName="w-64 z-50"
      value=""
      onSelect={onSelectOption}
      options={options}
    >
      <VscInfo />
    </Dropdown>
  );
}
