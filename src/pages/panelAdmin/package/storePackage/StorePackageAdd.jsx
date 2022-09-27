import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addNewPost } from "./storePackageSlice";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { selectAllPosts as selectAllCategory } from "../category/categorySlice";
import { fetchCategory } from "../category/categorySlice";
import { selectAllPosts as selectAllFunction } from "../functions/functionSlice";
import { fetchFunctions } from "../functions/functionSlice";
import Autocomplete from "@mui/material/Autocomplete";

const initialValues = {
	name: "",
	description: "",
	isExcersise: false,
	packageDiscountValue: 0,
	imageId: "",
	type: "",
	categoryId: "",
	functions: [],
};

const validationSchema = yup.object().shape({
	name: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نام بسته را وارد کنید"),
	description: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("توضیحات را وارد کنید"),
	isExcersise: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نوع اجرا را انتخاب کنید"),
	packageDiscountValue: yup
		.number()
		.typeError("تخفیف باید عدد باشد")
		.required("تخفیف را وارد کنید"),
	imageId: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("لینک تصویر را وارد کنید"),
	type: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نوع بسته را انتخاب کنید"),
	categoryId: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("دسته بندی را انتخاب کنید"),
	functions: yup
		.array()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("عملکرد ها را انتخاب کنید"),
});

export default function StorePackageAdd(props) {
	const navigate = useNavigate();
	const formRef = useRef();
	const dispatch = useDispatch();

	const dataCategory = useSelector((state) => selectAllCategory(state));
	const dataFunction = useSelector((state) => selectAllFunction(state));

	useEffect(() => {
		dispatch(fetchCategory());
		dispatch(fetchFunctions());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = () => {
		if (formRef.current) {
			formRef.current.handleSubmit();
		}
	};

	const submit = (values) => {
		// alert(JSON.stringify(values, null, 2));
		try {
			dispatch(addNewPost(values)).unwrap();
			console.log(values);
			navigate(`/admin/storePackage`);
		} catch (err) {
			console.error("Failed to save the post", err);
		}
	};

	return (
		<Formik
			{...props}
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={submit}
			innerRef={formRef}
		>
			{({ handleChange, values, setFieldValue, errors, touched }) => (
				<Form>
					<div className="mainPanelTitle bold">اضافه کردن بسته</div>
					<div className="profileInputContainer">
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="name"
							label="نام بسته"
							type="text"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.name}
							onChange={handleChange}
							error={touched.name && Boolean(errors.name)}
							helperText={touched.name && errors.name}
						/>
						<FormControl margin="dense" fullWidth className="profileInput">
							<InputLabel error={touched.type && Boolean(errors.type)}>
								نوع بسته
							</InputLabel>
							<Select
								labelId="type"
								id="type"
								variant="outlined"
								value={values.type}
								onChange={(e) => {
									setFieldValue("type", e.target.value);
								}}
								error={touched.type && Boolean(errors.type)}
								fullWidth
								label="نوع بسته"
							>
								<MenuItem value="" sx={{ justifyContent: "flex-end" }}>
									<em>انتخاب کنید</em>
								</MenuItem>
								<MenuItem
									value={"Disorder"}
									sx={{ justifyContent: "flex-end" }}
								>
									ناهنجاری
								</MenuItem>
								<MenuItem
									value={"Measurment"}
									sx={{ justifyContent: "flex-end" }}
								>
									ارزیابی
								</MenuItem>
							</Select>
							<FormHelperText error={touched.type && Boolean(errors.type)}>
								{touched.type && errors.type}
							</FormHelperText>
						</FormControl>
					</div>
					<div className="profileInputContainer">
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="description"
							label="توضیحات"
							multiline
							maxRows={4}
							minRows={2}
							type="text"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.description}
							onChange={handleChange}
							error={touched.description && Boolean(errors.description)}
							helperText={touched.description && errors.description}
						/>
					</div>
					<div className="profileInputContainer">
						<FormControl margin="dense" fullWidth className="profileInput">
							<InputLabel
								error={touched.isExcersise && Boolean(errors.isExcersise)}
							>
								نوع اجرا
							</InputLabel>
							<Select
								labelId="isExcersise"
								id="isExcersise"
								variant="outlined"
								value={values.isExcersise}
								onChange={(e) => {
									setFieldValue("isExcersise", e.target.value);
								}}
								error={touched.isExcersise && Boolean(errors.isExcersise)}
								fullWidth
								label="نوع اجرا"
							>
								<MenuItem value="" sx={{ justifyContent: "flex-end" }}>
									<em>انتخاب کنید</em>
								</MenuItem>
								<MenuItem value={false} sx={{ justifyContent: "flex-end" }}>
									آزمون
								</MenuItem>
								<MenuItem value={true} sx={{ justifyContent: "flex-end" }}>
									تمرین
								</MenuItem>
							</Select>
							<FormHelperText
								error={touched.isExcersise && Boolean(errors.isExcersise)}
							>
								{touched.isExcersise && errors.isExcersise}
							</FormHelperText>
						</FormControl>
						<Autocomplete
							fullWidth
							id="categoryId"
							name="categoryId"
							className="profileInput"
							options={dataCategory.map((item) => {
								return { ...item, label: item.name };
							})}
							// getOptionLabel={(option) => option.name}
							onChange={(e, value) => {
								setFieldValue(
									"categoryId",
									value !== null ? value.id : initialValues.categoryId
								);
							}}
							renderInput={(params) => (
								<TextField
									margin="normal"
									label="دسته بندی"
									fullWidth
									name="categoryId"
									value={values.categoryId}
									error={touched.categoryId && Boolean(errors.categoryId)}
									helperText={touched.categoryId && errors.categoryId}
									{...params}
								/>
							)}
						/>
					</div>
					<div className="profileInputContainer">
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="packageDiscountValue"
							label="تخفیف"
							type="number"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.packageDiscountValue}
							onChange={handleChange}
							error={
								touched.packageDiscountValue &&
								Boolean(errors.packageDiscountValue)
							}
							helperText={
								touched.packageDiscountValue && errors.packageDiscountValue
							}
						/>
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="imageId"
							className="profileInput"
							label="لینک تصویر"
							type="text"
							fullWidth
							variant="outlined"
							value={values.imageId}
							onChange={handleChange}
							error={touched.imageId && Boolean(errors.imageId)}
							helperText={touched.imageId && errors.imageId}
						/>
					</div>
					<div className="profileInputContainer">
						<Autocomplete
							multiple
							fullWidth
							id="functions"
							name="functions"
							className="profileInput"
							options={dataFunction.map((item) => {
								return { ...item, label: item.name };
							})}
							// getOptionLabel={(option) => option.name}
							onChange={(e, value) => {
								setFieldValue(
									"functions",
									value !== null ? value.map((item, i) => {
										return item.id;
									}) : initialValues.functions
								);
							}}
							renderInput={(params) => (
								<TextField
									margin="normal"
									label="عملکرد ها"
									fullWidth
									name="functions"
									value={values.functions}
									error={touched.functions && Boolean(errors.functions)}
									helperText={touched.functions && errors.functions}
									{...params}
								/>
							)}
						/>
					</div>
					<div className="profileInputContainer">
						<Button
							variant="outlined"
							className="profileInput"
							component="label"
							margin="dense"
							color="error"
							onClick={(event) => navigate("/admin/storePackage")}
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
