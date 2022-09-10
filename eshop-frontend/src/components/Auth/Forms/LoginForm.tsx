import Button from "../../Utils/Button/Button";
import InputText from "../../Utils/InputText/InputText";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AiOutlineClose } from "react-icons/ai";
import React, { useState } from "react";
import { UserAuth } from "../../../services/User/UserAuth";
import { useDispatch } from "react-redux";
import { login } from "../../../services/User/UserReducer";
export default function LoginForm(props: any) {
  const dispatch = useDispatch();

  function Login(values: any) {
    UserAuth.login(values).then((res: any) => {
      if (res.status === 200) {
        props.onClose();
        dispatch(login(res.data));
      }
    });
  }

  const [loginState, setLoginState] = useState("");
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email")
      .required("Required"),
    password: Yup.string()
      .min(3, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
  });
  return (
    <section className="fixed p-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-96 z-30">
      <AiOutlineClose
        className="ml-auto cursor-pointer"
        onClick={props.onClose}
      />
      <h1 className="text-center text-2xl font-semibold">Login</h1>
      <p className="text-red-500">{loginState}</p>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginSchema}
        onSubmit={(values) => Login(values)}
      >
        {({ errors, touched, values, handleChange, setFieldTouched }) => (
          <Form className="w-full">
            <InputText
              {...{
                label: "Email",
                name: "email",
                value: values.email,
                onChange: (e: any) => {
                  setFieldTouched("email");
                  handleChange(e);
                },
              }}
            />
            {errors.email && touched.email && (
              <p className="text-red-500">{errors.email}</p>
            )}
            <InputText
              {...{
                label: "Password",
                hide: true,
                name: "password",
                value: values.password,
                onChange: (e: any) => {
                  setFieldTouched("password");
                  handleChange(e);
                },
              }}
            ></InputText>
            {errors.password && touched.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
            <div className="mt-4 space-y-4">
              <Button type="submit"> Login</Button>
              <Button type="secondary"> Register</Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
