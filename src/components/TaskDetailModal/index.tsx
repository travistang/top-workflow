import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  VscEye,
  VscEyeClosed,
  VscPinned,
  VscPinnedDirty,
  VscSave,
  VscTrash,
} from "react-icons/vsc";
import { useRecoilState } from "recoil";
import { taskDetailModalAtom } from "../../atoms/taskDetailModal";
import { CachedTask, focusedTaskSelector } from "../../atoms/tasks";
import useTaskManager from "../../domain/TaskManager";
import { TaskDTO } from "../../entities/Task";
import { Modifier } from "../../utils/object";
import Button, { ButtonTheme } from "../Input/Button";
import DateInput from "../Input/Dropdown/DateInput";
import LabelInput from "../Input/LabelInput";
import TaskStateDropdown from "../Input/TaskStateDropdown";
import TextInput from "../Input/TextInput";
import Modal from "../Modal";
import TaskStateMachinePicker from "./TaskStateMachinePicker";

export default function TaskDetailModal() {
  const [taskDetail, setTaskDetail] = useRecoilState(taskDetailModalAtom);
  const [focusedTask, setFocusedTask] = useRecoilState(focusedTaskSelector);
  const [taskPlaceHolder, setTaskPlaceholder] = useState<CachedTask | null>(
    null
  );
  const taskManager = useTaskManager();
  const isFocused = focusedTask && focusedTask.id === taskDetail?.id;

  useEffect(() => {
    setTaskPlaceholder(taskDetail);
  }, [taskDetail]);

  if (!taskPlaceHolder) return null;

  const onClose = () => {
    setTaskDetail(null);
  };

  const onRemove = async () => {
    if (taskDetail) {
      await taskManager.remove(taskDetail.id);
      onClose();
    }
  };

  const onCommitChanges = () => {
    const isTaskFocused = focusedTask?.id === taskPlaceHolder.id;
    const updatedPayload: CachedTask = {
      ...taskPlaceHolder,
      focused: isTaskFocused,
    };
    taskManager.upsert(updatedPayload);
    onClose();
  };

  const updatePlaceHolder: Modifier<TaskDTO> = (field) => (value) => {
    setTaskPlaceholder({
      ...taskPlaceHolder,
      [field]: value,
    });
  };

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-t-lg sm:rounded-lg p-4 grid grid-cols-6 gap-2 bg-text bg-opacity-20"
      >
        <div className="grid grid-cols-6 col-span-full items-center">
          <h3 className="col-span-2 font-bold mb-4">Task details</h3>
          <div className="col-span-4 flex justify-end gap-2 flex-wrap flex-row">
            <Button
              theme={taskPlaceHolder.flagged ? ButtonTheme.Danger : undefined}
              className="flex items-center gap-2 px-2 bg-secondary h-8 rounded-lg flex-shrink-0"
              onClick={() =>
                updatePlaceHolder("flagged")(!taskPlaceHolder.flagged)
              }
            >
              {taskPlaceHolder.flagged ? <VscPinnedDirty /> : <VscPinned />}
            </Button>
            <Button
              className={classNames(
                "flex items-center gap-2 px-2 bg-secondary h-8 rounded-lg flex-shrink-0",
                !isFocused ? "bg-secondary" : "bg-text bg-opacity-20"
              )}
              onClick={() => setFocusedTask(isFocused ? null : taskDetail)}
            >
              {!isFocused ? <VscEyeClosed /> : <VscEye />}
            </Button>
            <TaskStateDropdown
              className="flex-shrink-0 bg-opacity-0"
              value={taskPlaceHolder.state}
              onChange={(newState) =>
                setTaskPlaceholder({ ...taskPlaceHolder, state: newState })
              }
            />
          </div>
        </div>
        <TextInput
          label="Task name"
          value={taskPlaceHolder.name}
          onChange={(v) => setTaskPlaceholder({ ...taskPlaceHolder, name: v })}
          className="col-span-4"
        />
        <DateInput
          label="Due date"
          className="col-span-2 bg-opacity-0"
          value={taskPlaceHolder.dueDate}
          onChange={updatePlaceHolder("dueDate")}
        />
        <TaskStateMachinePicker
          updateTaskDetails={updatePlaceHolder("stateMachine")}
          selectedStateMachine={taskPlaceHolder.stateMachine}
          initialStateMachine={taskDetail?.stateMachine}
        />
        <TextInput
          textarea
          label="Description"
          className="col-span-full"
          inputClassName="h-24"
          value={taskPlaceHolder.description}
          onChange={updatePlaceHolder("description")}
        />
        <LabelInput
          label="Labels"
          className="col-span-full"
          placeholder="Give a label that helps finding this task..."
          labels={taskPlaceHolder.labels}
          onChange={updatePlaceHolder("labels")}
        />

        <Button
          onClick={onRemove}
          theme={ButtonTheme.Warning}
          className={classNames(
            "col-start-1 col-span-3 gap-2 sm:rounded-lg -mb-4 -ml-4 h-12 -mr-2",
            "sm:col-start-1 sm:col-span-2 sm:h-10 sm:mt-4 sm:mb-0 sm:ml-0 sm:mr-0"
          )}
        >
          <VscTrash />
          Delete
        </Button>
        <Button
          onClick={onCommitChanges}
          theme={ButtonTheme.Success}
          className={classNames(
            "col-start-4 col-span-4 gap-2 -mb-4 -mr-4 h-12",
            "sm:col-start-5 sm:col-span-3 sm:rounded-lg sm:h-10 sm:mr-2 sm:mt-4"
          )}
        >
          <VscSave />
          Save changes
        </Button>
      </div>
    </Modal>
  );
}
