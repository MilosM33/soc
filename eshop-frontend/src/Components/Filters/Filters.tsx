import Select from "../Forms/Select/Select";
import { useFormik } from "formik";
import Button from "../Forms/Button/Button";
import { useEffect, useState } from "react";
import TextInput from "../Forms/TextInput/TextInput";
import { useDispatch } from "react-redux";
import { setHamburger } from "../../Reducers/Hamburger/HamburgerReducer";

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

	const dispatch = useDispatch();

	useEffect(() => {
		const valuesFromApi: any = { ...initialValues };

		filters.filters.forEach((filter: any) => {
			if (filter.type === "select") {
				valuesFromApi[filter.name] = filter.name;
			}
		});
		filters.variantFilters.forEach((filter: any) => {
			if (filter.type === "select") {
				valuesFromApi["variant" + filter.name] = filter.name;
			}
		});
		setInitialValues(valuesFromApi);
	}, [filters]);

	function HHandleChange(e: any) {
		handleChange(e);
		handleSubmit();
	}

	const { values, handleSubmit, handleChange, handleBlur, resetForm } =
		useFormik({
			initialValues,
			enableReinitialize: true,
			onSubmit: (values) => {
				// if value name isnt in filters, remove it
				const ignore = ["priceFrom", "priceTo"];

				const request = { ...values };

				Object.keys(request).forEach((key) => {
					console.log(key, request[key]);
					if (request[key] === key) {
						delete request[key];
					} else if ("variant" + request[key] === key) {
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
					{filters.filters.length != null &&
						filters.filters.map((filter: any) => {
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
											onChange={HHandleChange}
											id={filter.name}
											onBlur={handleBlur}
											selected={values[filter.name]}
										></Select>
									</li>
								);
							}
						})}
					{filters.variantFilters.length != null &&
						filters.variantFilters.map((filter: any) => {
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
											onChange={HHandleChange}
											id={"variant" + filter.name}
											onBlur={handleBlur}
											selected={values["variant" + filter.name]}
										></Select>
									</li>
								);
							}
						})}
					<li>
						<div className="flex flex-col md:flex-row justify-between">
							<Button
								type="submit"
								onClick={() => {
									dispatch(setHamburger(false));
								}}
							>
								Filter
							</Button>
							<Button
								variant="secondary"
								onClick={() => {
									resetForm();
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
