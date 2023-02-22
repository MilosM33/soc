import { useFormik } from "formik";
import Button from "../Components/Forms/Button/Button";
import TextInput from "../Components/Forms/TextInput/TextInput";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { User } from "../Api/User/User";
import { toast } from "react-toastify";

export default function ChangeUserLogin() {
  const { values, handleChange, handleSubmit, touched, handleBlur, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: yup.object({
        email: yup.string().email().required(),
        password: yup.string().required(),
      }),
      onSubmit: (values) => {
        User.changeUserLogin({
          email: values.email,
          password: values.password,
        })
          .then((response) => {
            toast.success("Login details changed");
          })
          .catch((error) => {
            toast.error("Error changing login details");
          });
      },
    });
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full md:w-1/2"
    >
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
      <div className="w-32">
        <Button variant="primary" type="submit">
          <span>Update</span>
        </Button>
      </div>
    </form>
  );
}
