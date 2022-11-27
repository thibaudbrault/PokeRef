export const registerSchema = yup.object().shape({
  username: yup.string().required,
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  cpassword: yup.string().oneOf([yup.ref(`password`), null]),
});
