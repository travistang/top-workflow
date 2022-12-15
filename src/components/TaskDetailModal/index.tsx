import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { VscRemove, VscSave, VscTrash } from "react-icons/vsc";
import { useRecoilState } from "recoil";
import { taskDetailModalAtom } from "../../atoms/taskDetailModal";
import useTaskManager from "../../domain/TaskManager";
import { TaskDTO } from "../../entities/Task";
import { Modifier } from "../../utils/object";
import Button from "../Input/Button";
import DateInput from "../Input/Dropdown/DateInput";
import TaskStateDropdown from "../Input/TaskStateDropdown";
import TextInput from "../Input/TextInput";
import Modal from "../Modal";

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

  const onRemove = async () => {
    if (taskDetail) {
      await taskManager.remove(taskDetail.id);
      onClose();
    }
  }

  const onCommitChanges = () => {
    taskManager.upsert(taskPlaceHolder);
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
          <TaskStateDropdown
            className="col-end-7 col-span-2 bg-opacity-0"
            value={taskPlaceHolder.state}
            onChange={(newState) =>
              setTaskPlaceholder({ ...taskPlaceHolder, state: newState })
            }
          />
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
        <TextInput
          textarea
          label="Description"
          className="col-span-full"
          inputClassName="h-24"
          value={taskPlaceHolder.description}
          onChange={updatePlaceHolder('description')}
        />

        <Button
          onClick={onRemove}
          className={classNames(
            "col-start-1 col-span-3 bg-accent bg-opacity-5 text-accent gap-2 sm:rounded-lg -mb-4 -ml-4 h-12 -mr-2",
            "sm:col-start-1 sm:col-span-2 sm:h-10 sm:mt-4 sm:mb-0 sm:ml-0 sm:mr-0"
          )}
        >
          <VscTrash />
          Delete
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
    </Modal>
  );
}
