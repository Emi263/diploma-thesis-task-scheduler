import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup.string().required().min(4).email("Must be an email"),
  password: yup.string().required(),
});

export const SignupSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(), //need to specify a pattern for it
  name: yup.string().required().min(5),
  age: yup.number().required().min(16),
});

export const PasswordSchema = yup.object({
  currentPassword: yup.string().required(),
  newPassword: yup.string().required(),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});
