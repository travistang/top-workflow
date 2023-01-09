import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TaskListPage from "./pages/TaskListPage";
import TodoListPage from "./pages/TodoListPage";
import TaskDetailModal from "./components/TaskDetailModal";
import SettingsPage from "./pages/SettingsPage";
import TaskStateMachinePage from "./pages/TaskStateMachinePage";
import { ReactFlowProvider } from "reactflow";

function App() {
  return (
    <RecoilRoot>
      <ReactFlowProvider>
        <Router basename="/top-workflow">
          <div className="bg-background fixed inset-0 p-2 flex flex-col gap-2 items-stretch">
            <Header />
            <div className="flex-1 overflow-y-auto flex-shrink-0 flex flex-col">
              <Routes>
                <Route path="/" element={<TaskListPage />} />
                <Route path="/todo" element={<TodoListPage />} />
                <Route path="/flow" element={<>Flow</>} />
                <Route path="/stateMachine" element={<TaskStateMachinePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </div>
            <TaskDetailModal />
            <Footer />
          </div>
        </Router>
      </ReactFlowProvider>
    </RecoilRoot>
  );
}

export default App;
