import React from 'react';
import { TaskStateMachine } from '../../../entities/TaskStateMachine';

type TaskStateMachineViewContextValue = {
  stateMachine: TaskStateMachine;
  updateStateMachine: React.Dispatch<TaskStateMachine>;
} | null;
export const taskStateMachineViewContext = React.createContext<TaskStateMachineViewContextValue>(null);

type Props = Exclude<TaskStateMachineViewContextValue, null> & {
  children: React.ReactNode;
};
export default function TaskStateMachineViewContextProvider({ children, stateMachine, updateStateMachine }: Props) {
  return (
    <taskStateMachineViewContext.Provider value={{stateMachine, updateStateMachine}}>
      {children}
    </taskStateMachineViewContext.Provider>
  )
}