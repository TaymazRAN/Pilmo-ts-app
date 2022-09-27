import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { FormControl } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { selectAllPosts as selectAllTypes } from "../type/postsSlice";
import { fetchPosts as fetchTypes } from "../type/postsSlice";
import { addNewPost } from "./complementTypeSlice";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "../../../panelPersonal/profile/profile.css";

const initialValues = {
	name: "",
	organizationCategoryId: "",
	type: "",
	isRequired: "",
};

const validationSchema = yup.object().shape({
	name: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نام فیلد تکمیلی را وارد کنید"),
	organizationCategoryId: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نوع سازمان را انتخاب کنید"),
	type: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نوع فیلد را انتخاب کنید"),
	isRequired: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("اجباری بودن فیلد را انتخاب کنید"),
});

export default function ComplementTypeAdd(props) {
	const navigate = useNavigate();
	const formRef = useRef();
	const dispatch = useDispatch();

	const dataType = useSelector((state) => selectAllTypes(state));
	useEffect(() => {
		dispatch(fetchTypes());
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
			navigate(`/admin/complementType`);
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
					<div className="mainPanelTitle bold">اضافه کردن فیلد تکمیلی</div>
					<div className="profileInputContainer">
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="name"
							label="نام فیلد تکمیلی"
							type="text"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.name}
							onChange={handleChange}
							error={touched.name && Boolean(errors.name)}
							helperText={touched.name && errors.name}
						/>
						<FormControl fullWidth className="profileInput">
							<InputLabel error={touched.type && Boolean(errors.type)}>
								نوع فیلد
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
								label="نوع فیلد"
							>
								<MenuItem value="" sx={{ justifyContent: "flex-end" }}>
									<em>انتخاب کنید</em>
								</MenuItem>
								<MenuItem value={1} sx={{ justifyContent: "flex-end" }}>
									نوع 1
								</MenuItem>
								<MenuItem value={2} sx={{ justifyContent: "flex-end" }}>
									نوع 2
								</MenuItem>
								<MenuItem value={3} sx={{ justifyContent: "flex-end" }}>
									نوع 3
								</MenuItem>
							</Select>
							<FormHelperText error={touched.type && Boolean(errors.type)}>
								{touched.type && errors.type}
							</FormHelperText>
						</FormControl>
					</div>
					<div className="profileInputContainer">
						<FormControl margin="dense" fullWidth className="profileInput">
							<InputLabel
								error={touched.isRequired && Boolean(errors.isRequired)}
							>
								فیلد اجباری
							</InputLabel>
							<Select
								labelId="isRequired"
								id="isRequired"
								variant="outlined"
								value={values.isRequired}
								onChange={(e) => {
									setFieldValue("isRequired", e.target.value);
								}}
								error={touched.isRequired && Boolean(errors.isRequired)}
								fullWidth
								label="فیلد اجباری"
							>
								<MenuItem value="" sx={{ justifyContent: "flex-end" }}>
									<em>انتخاب کنید</em>
								</MenuItem>
								<MenuItem value={true} sx={{ justifyContent: "flex-end" }}>
									بله
								</MenuItem>
								<MenuItem value={false} sx={{ justifyContent: "flex-end" }}>
									خیر
								</MenuItem>
							</Select>
							<FormHelperText
								error={touched.isRequired && Boolean(errors.isRequired)}
							>
								{touched.isRequired && errors.isRequired}
							</FormHelperText>
						</FormControl>
						<Autocomplete
							fullWidth
							id="organizationCategoryId"
							name="organizationCategoryId"
							className="profileInput"
							options={dataType.map((item) => {
								return { ...item, label: item.title };
							})}
							// getOptionLabel={(option) => option.name}
							onChange={(e, value) => {
								setFieldValue(
									"organizationCategoryId",
									value !== null
										? value.id
										: initialValues.organizationCategoryId
								);
							}}
							renderInput={(params) => (
								<TextField
									margin="normal"
									label="نوع سازمان"
									fullWidth
									name="organizationCategoryId"
									value={values.organizationCategoryId}
									error={
										touched.organizationCategoryId &&
										Boolean(errors.organizationCategoryId)
									}
									helperText={
										touched.organizationCategoryId &&
										errors.organizationCategoryId
									}
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
							onClick={(event) => navigate("/admin/complementType")}
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
