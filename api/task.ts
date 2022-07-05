import { Task } from "../models/task";
import { post, apiUrl, get, put, remove } from "../utils/apiMgmt";

export const createTask = (data: Task) => {
  return post(apiUrl + "/tasks", data);
};

export const updateTask = async ({ id, ...rest }: Task) => {
  console.log(id);

  const { data } = await put(apiUrl + "/tasks/" + id, rest);
  return data;
};

export const getAllTaks = async (): Promise<Task[]> => {
  const { data } = await get("/tasks");
  return data;
};

export const getTask = async (id: number): Promise<Task> => {
  const { data } = await get(`/tasks/${id}`);
  return data;
};

export const getTopTasks = async (): Promise<Task[]> => {
  const { data } = await get("/tasks/top-tasks");
  return data;
};

export const deleteTask = async (id: string) => {
  const { data } = await remove("/tasks/" + id);
};
