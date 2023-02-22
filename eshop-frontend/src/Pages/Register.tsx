import Layout from "../Layout/Layout";
import { useFormik } from "formik";
import { RegisterSchema } from "../Schemas/RegisterSchema";
import TextInput from "../Components/Forms/TextInput/TextInput";
import Button from "../Components/Forms/Button/Button";

import { User } from "../Api/User/User";
import { toast } from "react-toastify";
import { login } from "../Reducers/User/UserReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, touched, handleBlur, errors } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: RegisterSchema,
      onSubmit: (values) => {
        User.register({
          ...values,
        }).then((response) => {
          toast.success("Successfully registered");
          navigate("/my-account/verify");
          dispatch(login(response.data));
        });
      },
    });
  return (
    <Layout>
      <section className=" lg:w-1/2 md:mx-auto">
        <h1 className="text-2xl">Account Registration</h1>
        <h3 className="text-lg text-gray-500 mb-4">
          Create an account to get access to our
          <span className="text-secondary"> exclusive offers </span>
          and <span className="text-secondary">promotions</span>
        </h3>
        <h3 className="text-lg text-gray-500 mb-4">
          Also you can track your orders, save your favorite products and much
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <section className="flex gap-4 justify-between">
            <TextInput
              placeholder="First Name"
              fullWidth
              value={values.firstName}
              onChange={handleChange}
              id="firstName"
              error={
                errors.firstName && touched.firstName ? errors.firstName : ""
              }
              onBlur={handleBlur}
            ></TextInput>
            <TextInput
              placeholder="Last Name"
              fullWidth
              value={values.lastName}
              onChange={handleChange}
              id="lastName"
              error={errors.lastName && touched.lastName ? errors.lastName : ""}
              onBlur={handleBlur}
            ></TextInput>
          </section>
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
            placeholder="Phone Number"
            fullWidth
            value={values.phoneNumber}
            onChange={handleChange}
            id="phoneNumber"
            error={
              errors.phoneNumber && touched.phoneNumber
                ? errors.phoneNumber
                : ""
            }
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
          <TextInput
            placeholder="Confirm Password"
            fullWidth
            value={values.confirmPassword}
            onChange={handleChange}
            id="confirmPassword"
            error={
              errors.confirmPassword && touched.confirmPassword
                ? errors.confirmPassword
                : ""
            }
            onBlur={handleBlur}
            type="password"
          ></TextInput>

          <div className="flex justify-start"></div>
          <Button type="submit" variant="primary">
            Create Account
          </Button>
        </form>
      </section>
    </Layout>
  );
}
