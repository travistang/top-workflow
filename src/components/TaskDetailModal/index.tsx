import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { VscClose, VscRemove, VscSave } from "react-icons/vsc";
import { useRecoilState } from "recoil";
import { taskDetailModalAtom } from "../../atoms/taskDetailModal";
import useTaskManager from "../../domain/TaskManager";
import { TaskDTO } from "../../entities/Task";
import Button from "../Input/Button";
import TaskStateDropdown from "../Input/TaskStateDropdown";
import TextInput from "../Input/TextInput";

export default function TaskDetailModal() {
  const [taskDetail, setTaskDetail] = useRecoilState(taskDetailModalAtom);
  const [taskPlaceHolder, setTaskPlaceholder] = useState<TaskDTO | null>(null);
  const taskManager = useTaskManager();

  useEffect(() => {
    setTaskPlaceholder(taskDetail);
  }, [taskDetail]);

  if (!taskPlaceHolder) return null;

  const onClose = () => {
    setTaskDetail(null);
  };

  const onCommitChanges = () => {
    taskManager.upsert(taskPlaceHolder);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex flex-col justify-end items-stretch backdrop-blur-lg bg-background bg-opacity-20 sm:justify-center sm:px-[10vw]"
    >
      <div className="flex items-center justify-end py-2 bg-opacity-0">
        <Button onClick={onClose} className="w-8 h-8">
          <VscClose />
        </Button>
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-t-lg sm:rounded-lg p-4 grid grid-cols-6 gap-2 bg-text bg-opacity-5"
      >
        <h3 className="font-bold col-span-full mb-4">Task details</h3>
        <TextInput
          label="Task name"
          value={taskPlaceHolder.name}
          onChange={(v) => setTaskPlaceholder({ ...taskPlaceHolder, name: v })}
          className="col-span-4"
        />
        <TaskStateDropdown
          label="Task state"
          className="col-span-2 bg-opacity-0 self-end"
          value={taskPlaceHolder.state}
          onChange={(newState) =>
            setTaskPlaceholder({ ...taskPlaceHolder, state: newState })
          }
        />
        <Button
          onClick={onClose}
          className={classNames(
            "col-start-1 col-span-2 bg-text bg-opacity-5 text-text gap-2 sm:rounded-lg -mb-4 -ml-4 h-12 -mr-2",
            "sm:col-span-3 sm:h-10 sm:mt-4 sm:mb-0 sm:ml-0 sm:mr-0"
          )}
        >
          <VscRemove />
          Discard
        </Button>
        <Button
          onClick={onCommitChanges}
          className={classNames(
            "col-start-4 col-span-4 text-primary gap-2 bg-primary bg-opacity-10 -mb-4 -mr-4 h-12",
            "sm:col-start-5 sm:col-span-3 sm:rounded-lg sm:h-10 sm:mr-2 sm:mt-4"
          )}
        >
          <VscSave />
          Save changes
        </Button>
      </div>
    </div>
  );
}
