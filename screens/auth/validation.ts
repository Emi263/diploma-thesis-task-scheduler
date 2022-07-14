import * as yup from "yup";

export const LoginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address!"),
  password: yup.string().required("Password is required"),
});

export const SignupSchema = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"), //need to specify a pattern for it
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must have at least 3 letters"),
  age: yup
    .number()
    .required("Age is required")
    .min(16, "The minimum age must be 16"),
});

export const PasswordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup.string().required("New password is required"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});
