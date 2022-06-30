import { Task } from "../models/task";
import { post, apiUrl, get } from "../utils/apiMgmt";

export const createTask = (data: Task) => {
  return post(apiUrl + "/tasks", data);
};

export const getAllTaks = async (): Promise<Task[]> => {
  const { data } = await get("/tasks");
  return data;
};

export const getTask = async (id: number): Promise<Task> => {
  const { data } = await get(`/tasks/${id}`);
  return data;
};
