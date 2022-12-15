import React from 'react';
import { VscAdd, VscArrowDown, VscArrowUp, VscCollapseAll, VscExpandAll, VscInfo, VscKebabVertical } from 'react-icons/vsc';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { expandedTaskAtom, useToggleExpandAll } from '../../../atoms/expandedTask';
import { taskDetailModalAtom } from '../../../atoms/taskDetailModal';
import { TaskDTO } from '../../../entities/Task';
import Modal from '../../Modal';
import ActionButton from './ActionButton';

type Props = {
  task: TaskDTO;
  onClose: () => void;
  onRequestCreateSubTask?: () => void;
};
export default function TodoActionModal({ onRequestCreateSubTask, onClose, task }: Props) {
  const taskId = task.id;
  const { allExpanded, toggleExpandAll } = useToggleExpandAll(taskId);
  const [expandedTodoIds, setExpandedTodoId] = useRecoilState(expandedTaskAtom);
  const setTaskDetail = useSetRecoilState(taskDetailModalAtom);
  const expanded = expandedTodoIds.includes(taskId);

  const openDetailModal = () => {
    setTaskDetail(task);
    onClose();
  };

  const requestCreateSubTask = () => {
    onRequestCreateSubTask?.();
    onClose();
  }
  const toggleExpanded = () => {
    if (!expanded) {
      setExpandedTodoId([...expandedTodoIds, task.id]);
      onClose();
      return;
    }
    setExpandedTodoId(expandedTodoIds.filter((id) => id !== task.id));
    onClose();
  };

  return (
    <Modal onClose={onClose} className="sm:px-[20vw]">
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-t-lg sm:rounded-lg p-4 grid grid-cols-4 gap-2 bg-text bg-opacity-20"
      >
        <h4 className="col-span-full flex items-center gap-1 mb-4">
          <VscKebabVertical /> Choose an action
        </h4>
        <ActionButton
          onClick={requestCreateSubTask}
          icon={VscAdd}
          label="Create subtask"
        />
        <ActionButton
          onClick={openDetailModal}
          icon={VscInfo}

          label="Edit details"
        />
        {!expanded && (
          <>
            <ActionButton
              onClick={toggleExpanded}
              icon={expanded ? VscArrowUp : VscArrowDown}
              label="Expand"
            />
            <ActionButton
              onClick={toggleExpandAll}
              icon={allExpanded ? VscCollapseAll : VscExpandAll}

              label="Expand all sub tasks"
            />
          </>
        )}
      </div>
    </Modal>
  );
}