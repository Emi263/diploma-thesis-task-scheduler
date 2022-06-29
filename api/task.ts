import { Task } from "../models/task";
import { post, apiUrl } from "../utils/apiMgmt";

export const createTask = (data: Task) => {
  return post(apiUrl + "/tasks", data);
};
