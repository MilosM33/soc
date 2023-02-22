import React, { useEffect } from "react";
import { useFormik } from "formik";
import TextInput from "../../../Components/Forms/TextInput/TextInput";
import { ShippingSchema } from "../../../Schemas/ShippingSchema";
import Select from "../../../Components/Forms/Select/Select";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router";
import Button from "../../../Components/Forms/Button/Button";
import {
  setShippingForm,
  CheckoutState,
} from "../../../Reducers/Cart/CheckoutReducer";
import { User } from "../../../Api/User/User";
export interface ShippingFormProps {
  readOnly?: boolean;
}
export default function ShippingForm(props: ShippingFormProps) {
  const dispatch = useDispatch();
  const selector: CheckoutState = useSelector((state: any) => state.checkout);

  const [prevStep, nextStep] =
    useOutletContext<[prev: Function, next: Function]>();

  function handleNextStep(values: any) {
    dispatch(setShippingForm(values));
    nextStep();
  }
  function handlePrevStep(values: any) {
    dispatch(setShippingForm(values));
    prevStep();
  }

  function handleChanges(e: any) {
    handleChange(e);
    dispatch(setShippingForm(values));
  }

  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    handleBlur,
    errors,
    setValues,
  } = useFormik({
    initialValues: selector.shippingForm,
    onSubmit: (values) => {
      handleNextStep(values);
    },

    validationSchema: ShippingSchema,
  });

  const user = useSelector((state: any) => state.user);
  useEffect(() => {
    if (user.isAuth) {
      User.getUserDetails().then((res) => {
        setValues(res.data);
      });
    }
  }, []);

  return (
    <>
      <h1 className="text-center text-3xl my-2">Billing and Shipping</h1>
      <section className="my-4">
        <form
          className="flex flex-col gap-4 lg:w-1/2 md:mx-auto"
          onSubmit={handleSubmit}
        >
          <section className="flex gap-4 justify-between">
            <TextInput
              placeholder="First name"
              fullWidth
              value={values.firstName}
              onChange={handleChanges}
              id="firstName"
              error={
                errors.firstName && touched.firstName ? errors.firstName : ""
              }
              onBlur={handleBlur}
              disabled={props.readOnly}
            ></TextInput>
            <TextInput
              placeholder="Last name"
              fullWidth
              value={values.lastName}
              onChange={handleChanges}
              id="lastName"
              error={errors.lastName && touched.lastName ? errors.lastName : ""}
              onBlur={handleBlur}
              disabled={props.readOnly}
            ></TextInput>
          </section>
          <TextInput
            placeholder="Street Address"
            value={values.address}
            onChange={handleChanges}
            id="address"
            error={errors.address && touched.address ? errors.address : ""}
            onBlur={handleBlur}
            disabled={props.readOnly}
          ></TextInput>
          <TextInput
            placeholder="Apartment, suite"
            value={values.appartment}
            onChange={handleChanges}
            id="appartment"
            error={
              errors.appartment && touched.appartment ? errors.appartment : ""
            }
            onBlur={handleBlur}
            disabled={props.readOnly}
          ></TextInput>
          <TextInput
            placeholder="City"
            value={values.city}
            onChange={handleChanges}
            id="city"
            error={errors.city && touched.city ? errors.city : ""}
            onBlur={handleBlur}
            disabled={props.readOnly}
          ></TextInput>

          <TextInput
            placeholder="State"
            value={values.state}
            onChange={handleChanges}
            id="state"
            error={errors.state && touched.state ? errors.state : ""}
            onBlur={handleBlur}
            disabled={props.readOnly}
          ></TextInput>
          <TextInput
            placeholder="Zip code"
            value={values.zip}
            onChange={handleChanges}
            id="zip"
            error={errors.zip && touched.zip ? errors.zip : ""}
            onBlur={handleBlur}
            disabled={props.readOnly}
          ></TextInput>
          <TextInput
            placeholder="Phone"
            value={values.phone}
            onChange={handleChanges}
            id="phone"
            error={errors.phone && touched.phone ? errors.phone : ""}
            onBlur={handleBlur}
            disabled={props.readOnly}
          ></TextInput>
          <TextInput
            placeholder="Email"
            value={values.email}
            onChange={handleChanges}
            id="email"
            error={errors.email && touched.email ? errors.email : ""}
            onBlur={handleBlur}
            disabled={props.readOnly}
          ></TextInput>
          <Select
            options={["Delivery", "Pickup", "Shipping"]}
            selected={values.deliveryMethod}
            onChange={handleChanges}
            id="deliveryMethod"
            error={
              errors.deliveryMethod && touched.deliveryMethod
                ? errors.deliveryMethod
                : ""
            }
            onBlur={handleBlur}
            disabled={props.readOnly}
          ></Select>
        </form>
      </section>
      <section
        className={
          "mt-auto text-center space-x-4 " +
          (props.readOnly === false ? "" : " hidden")
        }
      >
        <Button variant="secondary" onClick={() => handlePrevStep(values)}>
          Prev step
        </Button>
        <Button variant="primary" onClick={() => handleSubmit()}>
          Next step
        </Button>
      </section>
    </>
  );
}

ShippingForm.defaultProps = {
  readOnly: false,
};
