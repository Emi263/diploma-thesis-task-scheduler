import * as yup from "yup";

export const TaskSchema = yup.object({
  author: yup.string().required(),
  title: yup.string().required(),
  desription: yup.string().required(),
  date: yup.date().required(),
  time: yup.date().required(),
});
