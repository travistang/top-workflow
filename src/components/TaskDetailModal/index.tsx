import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  VscListTree,
  VscPinned,
  VscPinnedDirty,
  VscSave,
  VscTrash,
} from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { taskDetailModalAtom } from "../../atoms/taskDetailModal";
import { CachedTask } from "../../atoms/tasks";
import { useTaskValidation } from "../../domain/Task";
import useTaskManager from "../../domain/TaskManager";
import { TaskDTO, TaskState } from "../../entities/Task";
import { Modifier } from "../../utils/object";
import Button, { ButtonTheme } from "../Input/Button";
import DateInput from "../Input/Dropdown/DateInput";
import LabelInput from "../Input/LabelInput";
import TaskStateDropdown from "../Input/TaskStateDropdown";
import TextInput from "../Input/TextInput";
import Modal from "../Modal";
import StateMachineStateChip from "./StateMachineStateChip";
import TaskFocusToggle from "./TaskFocusToggle";
import TaskStateMachinePicker from "./TaskStateMachinePicker";

export default function TaskDetailModal() {
  const [taskDetail, setTaskDetail] = useRecoilState(taskDetailModalAtom);
  const [taskPlaceHolder, setTaskPlaceholder] = useState<CachedTask | null>(
    null
  );
  const isTaskPlaceholderValid = useTaskValidation(taskPlaceHolder);
  const taskManager = useTaskManager();
  const navigate = useNavigate();

  const isUsingStateMachine = !!taskPlaceHolder?.stateMachine;
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
    if (!isTaskPlaceholderValid) return;
    taskManager.upsert(taskPlaceHolder);
    onClose();
  };

  const updatePlaceHolder: Modifier<TaskDTO> = (field) => (value) => {
    setTaskPlaceholder({
      ...taskPlaceHolder,
      [field]: value,
    });
  };

  const updateTaskState = (newState: string | TaskState) => {
    if (Object.values(TaskState).includes(newState as TaskState)) {
      updatePlaceHolder('state')(newState as TaskState);
      return;
    }
    if (taskPlaceHolder.stateMachine) {
      updatePlaceHolder('stateMachine')({
        ...taskPlaceHolder.stateMachine,
        stateId: newState as string,
      });
    }
  }

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
              onClick={() => navigate(`/graph/${taskPlaceHolder.id}`)}
              className="bg-text-secondary px-2 gap-2">
              <VscListTree />
              Graph view
            </Button>
            <Button
              theme={taskPlaceHolder.flagged ? ButtonTheme.Danger : undefined}
              className="flex items-center gap-2 px-2 bg-secondary h-8 rounded-lg flex-shrink-0"
              onClick={() =>
                updatePlaceHolder("flagged")(!taskPlaceHolder.flagged)
              }
            >
              {taskPlaceHolder.flagged ? <VscPinnedDirty /> : <VscPinned />}
            </Button>
            <TaskFocusToggle task={taskPlaceHolder} />
            {isUsingStateMachine ?
              <StateMachineStateChip task={taskPlaceHolder} /> :
              <TaskStateDropdown
                className="flex-shrink-0 bg-opacity-0"
                task={taskPlaceHolder}
                onChange={updateTaskState}
              />
            }
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
          state={taskPlaceHolder.stateMachine}
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
          disabled={!isTaskPlaceholderValid}
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
