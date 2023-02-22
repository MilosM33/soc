import Select from "../Forms/Select/Select";
import { useFormik } from "formik";
import Button from "../Forms/Button/Button";
import { useEffect, useState } from "react";
import TextInput from "../Forms/TextInput/TextInput";

export default function Filters({
  filters,
  OnSubmit,
  OnReset,
}: {
  filters: any;
  OnSubmit: any;
  OnReset: any;
}) {
  const [initialValues, setInitialValues] = useState<any>({
    priceFrom: "",
    priceTo: "",
  });

  useEffect(() => {
    const valuesFromApi: any = { ...initialValues };
    filters.forEach((filter: any) => {
      if (filter.type === "select") {
        valuesFromApi[filter.name] = filter.name;
      }
    });
    setInitialValues(valuesFromApi);
  }, [filters]);

  const { values, handleSubmit, handleChange, handleBlur, resetForm } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      onSubmit: (values) => {
        // if value name isnt in filters, remove it
        const ignore = ["priceFrom", "priceTo"];

        const request = { ...values };

        Object.keys(request).forEach((key) => {
          if (request[key] === key) {
            delete request[key];
          }
        });
        OnSubmit(request);
      },
    });

  return (
    <section>
      <h1 className="text-2xl">Filters</h1>
      <form action="" onSubmit={handleSubmit}>
        <ul>
          <li>
            <TextInput
              placeholder="Price from"
              value={values.priceFrom}
              onChange={handleChange}
              id="priceFrom"
              onBlur={handleBlur}
            ></TextInput>
          </li>
          <li>
            <TextInput
              placeholder="Price to"
              value={values.priceTo}
              onChange={handleChange}
              id="priceTo"
              onBlur={handleBlur}
            ></TextInput>
          </li>
          {filters.length != null &&
            filters.map((filter: any) => {
              if (filter.type === "select") {
                return (
                  <li>
                    <Select
                      placeholder={"Select Variant"}
                      options={[
                        filter.name,
                        ...filter.values.map((value: any) => {
                          return value.value;
                        }),
                      ]}
                      onChange={handleChange}
                      id={filter.name}
                      onBlur={handleBlur}
                      selected={values[filter.name]}
                    ></Select>
                  </li>
                );
              }
            })}
          <li>
            <div className="flex flex-col md:flex-row justify-between">
              <Button type="submit">Filter</Button>
              <Button
                variant="secondary"
                onClick={() => {
                  OnReset();
                }}
              >
                Reset filters
              </Button>
            </div>
          </li>
        </ul>
      </form>
    </section>
  );
}
