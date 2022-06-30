import { Task } from "../models/task";
import { post, apiUrl, get } from "../utils/apiMgmt";

export const createTask = (data: Task) => {
  return post(apiUrl + "/tasks", data);
};

export const getAllTaks = () => {
  return get("/tasks");
};
