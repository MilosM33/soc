import TextInput from "../Forms/TextInput/TextInput";
import NavLink from "../Navigation/NavLink/NavLink";
import { useFormik } from "formik";
import Button from "../Forms/Button/Button";
import { LoginSchema } from "../../Schemas/LoginSchema";

import { User } from "../../Api/User/User";

import { login } from "../../Reducers/User/UserReducer";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
export default function LoginForm() {
  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit, touched, handleBlur, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: (values) => {
        User.login({ email: values.email, password: values.password })
          .then((response) => {
            dispatch(login(response.data));

            toast.success("Successfully logged in");
          })
          .catch((error) => {
            toast.error("Invalid credentials");
          });
      },
    });

  return (
    <section className="w-56">
      <form onSubmit={handleSubmit}>
        <TextInput
          placeholder="Email"
          fullWidth
          value={values.email}
          onChange={handleChange}
          id="email"
          error={errors.email && touched.email ? errors.email : ""}
          onBlur={handleBlur}
        ></TextInput>
        <TextInput
          placeholder="Password"
          fullWidth
          value={values.password}
          onChange={handleChange}
          id="password"
          error={errors.password && touched.password ? errors.password : ""}
          onBlur={handleBlur}
          type="password"
        ></TextInput>

        <NavLink to="/register" label="Nemáte účet?"></NavLink>

        <Button type="submit" variant="primary">
          Login
        </Button>
      </form>
    </section>
  );
}
