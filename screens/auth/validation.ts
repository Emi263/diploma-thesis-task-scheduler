import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup.string().required().min(4).email("Must be an email"),
  password: yup.string().required(),
});
