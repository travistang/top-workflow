import axios from "axios";
import { io, Socket } from 'socket.io-client';
import { getConfigFromLS, SettingsConfig } from "../atoms/settings";
import { Changes } from "../domain/Changes";
import TaskRepository from "../repositories/TaskRepository";

class TaskService {
  private socket: Socket | null = null;

  get baseUrl(): string {
    const settings = getConfigFromLS() as SettingsConfig;
    return settings.workflowServerUrl;
  }

  set baseUrl(newString: string) {
    if (this.socket?.connected) {
      this.socket.disconnect();
    }
    this.socket = io(newString);
  }

  async synchronizeDatabaseWithRemote() {
    const allTasks = await TaskRepository.find({});
    return axios.post(`${this.baseUrl}/synchronize`, allTasks);
  };

  async informChangesToRemote(changes: Changes) {
    if (!this.socket) return;
    this.socket.emit('client-task-changes', changes);
  }
};

export default new TaskService();
export const initializeSocket = (serverUrl: string) => {

};
