import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TodoListPage from "./pages/TodoListPage";
import TaskDetailModal from "./components/TaskDetailModal";

function App() {
  return (
    <RecoilRoot>
      <Router basename="/top-workflow">
        <div className="bg-background fixed inset-0 p-2 flex flex-col gap-2 items-stretch">
          <Header />
          <div className="flex-1 overflow-y-auto flex-shrink-0 flex flex-col">
            <Routes>
              <Route path="/" element={<TodoListPage />} />
              <Route path="/flow" element={<>Flow</>} />
            </Routes>
          </div>
          <TaskDetailModal />
          <Footer />
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
