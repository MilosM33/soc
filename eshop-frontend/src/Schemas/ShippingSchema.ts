import * as yup from "yup";

export const ShippingSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  appartment: yup.string().required("Appartment is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zip: yup
    .string()
    .required("Zip is required")
    .matches(/^[0-9]{5}$/, "Zip must be 5 digits"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^(\\+421|09)[0-9]{8}$/,
      'Phone number is not valid. Use format "+421999999999" or "0999999999"'
    ),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be valid"),
  deliveryMethod: yup
    .string()
    .required("Delivery method is required")
    .notOneOf(["", "Delivery"], "Delivery method is required"),
});
