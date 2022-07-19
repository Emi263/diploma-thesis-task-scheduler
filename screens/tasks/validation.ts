import * as yup from "yup";
let now = new Date();
now.setMinutes(now.getMinutes() + 1); // timestamp
now = new Date(now); // Date object
export const TaskSchema = yup.object({
  title: yup.string().required("Task title is required!"),
  description: yup.string().required("Task description is required!"),
  date: yup.date(),
  shouldNotify: yup.boolean().required(),
});
