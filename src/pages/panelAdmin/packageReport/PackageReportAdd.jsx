import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewPost } from "./packageReportSlice";
import { Formik, Form, Field, FieldArray, getIn } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
	fetchFunctions,
	selectAllPosts as selectAllFunctions,
} from "../package/functions/functionSlice";
import {
	fetchPackage,
	selectAllPosts as selectAllPackages,
} from "../package/package/packageSlice";

export default function PackageReportAdd(props) {
	const formRef = useRef();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const dataPackage = useSelector((state) => selectAllPackages(state));
	const dataFunction = useSelector((state) => selectAllFunctions(state));

	useEffect(() => {
		dispatch(fetchFunctions());
		dispatch(fetchPackage());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = () => {
		if (formRef.current) {
			formRef.current.handleSubmit();
		}
	};

	const initialValues = {
		packageId: "",
		manuscript: "",
		numberOfFunctions: "",
		reportValues: [],
	};

	const validationSchema = Yup.object().shape({
		packageId: Yup.string().required("شناسه اجرا را انتخاب کنید"),
		manuscript: Yup.string().required("نوشته را وارد کنید"),
		numberOfFunctions: Yup.string().required("تعداد عملکرد را انتخاب کنید"),
		reportValues: Yup.array().of(
			Yup.object().shape({
				functionId: Yup.string().required("عملکرد را انتخاب کنید"),
				value: Yup.number()
					.min(0, "نمره حداقل 1 می باشد")
					.max(10, "نمره حداکثر 10 می باشد")
					.typeError("نمره باید عدد باشد")
					.required("نمره را وارد کنید"),
			})
		),
	});

	function onChangeTickets(e, field, values, setValues) {
		// update dynamic form
		const reportValues = [...values.reportValues];
		const numberOfFunctions = e.target.value || 0;
		const previousNumber = parseInt(field.value || "0");
		if (previousNumber < numberOfFunctions) {
			for (let i = previousNumber; i < numberOfFunctions; i++) {
				reportValues.push({ functionId: "", value: "" });
			}
		} else {
			for (let i = previousNumber; i >= numberOfFunctions; i--) {
				reportValues.splice(i, 1);
			}
		}
		setValues({ ...values, reportValues });

		// call formik onChange method
		field.onChange(e);
	}

	function onSubmit(fields) {
		// display form field values on success
		alert(JSON.stringify(fields, null, 3));
		try {
			dispatch(
				addNewPost({
					packageId: fields.packageId,
					manuscript: fields.manuscript,
					reportValues: fields.reportValues,
				})
			).unwrap();
			console.log({
				packageId: fields.packageId,
				manuscript: fields.manuscript,
				reportValues: fields.reportValues,
			});
			// navigate(`/admin/report`);
		} catch (err) {
			console.error("Failed to save the post", err);
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
			innerRef={formRef}
		>
			{({
				errors,
				values,
				setFieldValue,
				touched,
				setValues,
				handleChange,
			}) => (
				<Form>
					<div className="mainPanelTitle bold">اضافه کردن کارنامه</div>
					<div className="profileInputContainer">
						<Field name="numberOfFunctions">
							{({ field }) => (
								<>
									<Autocomplete
										fullWidth
										id="packageId"
										name="packageId"
										className="profileInput"
										options={dataPackage.map((item) => {
											return { ...item, label: item.id };
										})}
										// getOptionLabel={(option) => option.name}
										onChange={(e, value) => {
											setFieldValue(
												"packageId",
												value !== null ? value.id : initialValues.packageId
											);
										}}
										renderInput={(params) => (
											<TextField
												margin="normal"
												label="شناسه اجرا"
												fullWidth
												name="packageId"
												value={values.packageId}
												error={touched.packageId && Boolean(errors.packageId)}
												helperText={touched.packageId && errors.packageId}
												{...params}
											/>
										)}
									/>
									<FormControl
										fullWidth
										className="selectContainer profileInput"
									>
										<InputLabel
											error={
												touched.numberOfFunctions &&
												Boolean(errors.numberOfFunctions)
											}
											id="numberOfFunctions"
										>
											تعداد عملکرد
										</InputLabel>
										<Select
											{...field}
											labelId="numberOfFunctions"
											id="numberOfFunctions"
											variant="outlined"
											fullWidth
											label="تعداد عملکرد"
											value={values.numberOfFunctions}
											// onChange={(e) => {
											// 	setFieldValue("numberOfFunctions", e.target.value);
											// }}
											onChange={(e) =>
												onChangeTickets(e, field, values, setValues)
											}
											error={
												touched.numberOfFunctions &&
												Boolean(errors.numberOfFunctions)
											}
										>
											<MenuItem value="" sx={{ justifyContent: "flex-end" }}>
												<em>انتخاب کنید</em>
											</MenuItem>
											{[3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
												<MenuItem
													key={i}
													value={i}
													sx={{ justifyContent: "flex-end" }}
												>
													{i}
												</MenuItem>
											))}
										</Select>
										<FormHelperText
											error={
												touched.numberOfFunctions &&
												Boolean(errors.numberOfFunctions)
											}
										>
											{touched.numberOfFunctions && errors.numberOfFunctions}
										</FormHelperText>
									</FormControl>
								</>
							)}
						</Field>
					</div>
					<div className="profileInputContainer">
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="manuscript"
							label="توضیحات"
							multiline
							maxRows={4}
							minRows={2}
							type="text"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.manuscript}
							onChange={handleChange}
							error={touched.manuscript && Boolean(errors.manuscript)}
							helperText={touched.manuscript && errors.manuscript}
						/>
					</div>
					<FieldArray name="reportValues">
						{() =>
							values.reportValues.map((func, index) => {
								const functionId = `reportValues[${index}].functionId`;
								const touchedFunctionId = getIn(touched, functionId);
								const errorFunctionId = getIn(errors, functionId);

								const value = `reportValues[${index}].value`;
								const touchedValue = getIn(touched, value);
								const errorValue = getIn(errors, value);
								return (
									<div className="profileInputContainer">
										<Autocomplete
											fullWidth
											margin="dense"
											className="profileInput"
											options={dataFunction.map((item) => {
												return { ...item, label: item.name };
											})}
											// getOptionLabel={(option) => option.name}
											onChange={(e, value) => {
												setFieldValue(
													functionId,
													value !== null
														? value.id
														: initialValues.reportValues[index].functionId
												);
											}}
											renderInput={(params) => (
												<TextField
													margin="normal"
													label={`نام عملکرد ${index + 1}`}
													fullWidth
													name={functionId}
													value={func.functionId}
													error={touchedFunctionId && Boolean(errorFunctionId)}
													helperText={touchedFunctionId && errorFunctionId}
													{...params}
												/>
											)}
										/>
										<TextField
											autoFocus
											dir="rtl"
											margin="dense"
											name={value}
											label={`نمره ${index + 1}`}
											type="number"
											fullWidth
											variant="outlined"
											className="profileInput"
											value={func.value}
											onChange={handleChange}
											error={touchedValue && Boolean(errorValue)}
											helperText={touchedValue && errorValue}
										/>
									</div>
								);
							})
						}
					</FieldArray>
					<div className="profileInputContainer">
						<Button
							variant="outlined"
							className="profileInput"
							component="label"
							margin="dense"
							color="error"
							onClick={(event) => navigate("/admin/report")}
							id="logoFileName"
							sx={{ padding: "15px 0", marginTop: "4px" }}
							fullWidth
						>
							انصراف
						</Button>
						<Button
							variant="outlined"
							className="profileInput"
							component="label"
							margin="dense"
							id="logoFileName"
							color="primary"
							sx={{ padding: "15px 0", marginTop: "4px" }}
							onClick={(event) => handleSubmit()}
							fullWidth
						>
							اضافه کردن
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
