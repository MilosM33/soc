import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Button from "../Components/Forms/Button/Button";
import Select from "../Components/Forms/Select/Select";
import TextInput from "../Components/Forms/TextInput/TextInput";
import Layout from "../Layout/Layout";
import ChangeUserLogin from "./ChangeUserLogin";
import * as yup from "yup";
import { User } from "../Api/User/User";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function MyAccount() {
  const [userDetails, setUserDetails] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    appartment: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    delivery_method: string;
  }>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    appartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    delivery_method: "",
  });

  const { values, handleChange, handleSubmit, touched, handleBlur, errors } =
    useFormik({
      initialValues: userDetails,
      enableReinitialize: true,
      validationSchema: yup.object().shape({
        email: yup.string().email().nullable(),
        password: yup.string().min(8),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password"), null], "Passwords must match"),
        phone: yup
          .string()
          .matches(
            /^(\\+421|09)[0-9]{8}$/,
            'Phone number is not valid. Use format "+421999999999" or "0999999999"'
          ),
        zip: yup.string().matches(/^[0-9]{5}$/, "Zip must be 5 digits"),
      }),

      onSubmit: (values) => {
        User.setUserDetails({
          ...values,
        })
          .then((response) => {
            toast.success("Successfully updated");
          })
          .catch((error) => {
            toast.error("Error updating user details");
          });
      },
    });

  useEffect(() => {
    User.getUserDetails().then((response) => {
      setUserDetails(response.data);
    });
  }, []);

  const user = useSelector((state: any) => state.user);
  if (!user.isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-2xl my-4">My Account</h1>
        <h2 className="text-xl my-4">My Account Details</h2>
        <ChangeUserLogin></ChangeUserLogin>

        <h2 className="text-xl my-4">My Shipping Details</h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full md:w-1/2"
        >
          <section className="flex gap-4 justify-between">
            <TextInput
              placeholder="First name"
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
              placeholder="Last name"
              fullWidth
              value={values.lastName}
              onChange={handleChange}
              id="lastName"
              error={errors.lastName && touched.lastName ? errors.lastName : ""}
              onBlur={handleBlur}
            ></TextInput>
          </section>
          <TextInput
            placeholder="Street Address"
            value={values.address}
            onChange={handleChange}
            id="address"
            error={errors.address && touched.address ? errors.address : ""}
            onBlur={handleBlur}
          ></TextInput>
          <TextInput
            placeholder="Apartment, suite"
            value={values.appartment}
            onChange={handleChange}
            id="appartment"
            error={
              errors.appartment && touched.appartment ? errors.appartment : ""
            }
            onBlur={handleBlur}
          ></TextInput>
          <TextInput
            placeholder="City"
            value={values.city}
            onChange={handleChange}
            id="city"
            error={errors.city && touched.city ? errors.city : ""}
            onBlur={handleBlur}
          ></TextInput>

          <TextInput
            placeholder="State"
            value={values.state}
            onChange={handleChange}
            id="state"
            error={errors.state && touched.state ? errors.state : ""}
            onBlur={handleBlur}
          ></TextInput>
          <TextInput
            placeholder="Zip code"
            value={values.zip}
            onChange={handleChange}
            id="zip"
            error={errors.zip && touched.zip ? errors.zip : ""}
            onBlur={handleBlur}
          ></TextInput>
          <TextInput
            placeholder="Phone"
            value={values.phone}
            onChange={handleChange}
            id="phone"
            error={errors.phone && touched.phone ? errors.phone : ""}
            onBlur={handleBlur}
          ></TextInput>
          <TextInput
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            id="email"
            error={errors.email && touched.email ? errors.email : ""}
            onBlur={handleBlur}
          ></TextInput>
          <Select
            options={["Delivery", "Pickup", "Shipping"]}
            selected={values.delivery_method}
            onChange={handleChange}
            id="delivery_method"
            error={
              errors.delivery_method && touched.delivery_method
                ? errors.delivery_method
                : ""
            }
            onBlur={handleBlur}
          ></Select>

          <div>
            <Button variant="primary" type="submit">
              Update Shipping Details
            </Button>
          </div>
        </form>

        <h2 className="text-xl my-4">My Reviews</h2>
      </div>
    </Layout>
  );
}
