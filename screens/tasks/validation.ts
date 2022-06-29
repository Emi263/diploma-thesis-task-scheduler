import * as yup from "yup";

export const TaskSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  date: yup.date(),
  time: yup.date(),
});
