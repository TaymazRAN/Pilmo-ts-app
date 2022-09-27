import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "./categorySlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "../../../panelPersonal/profile/profile.css";

const initialValues = {
	name: "",
	description: "",
	imageId: "",
	backgroundImageId: "",
};

const validationSchema = yup.object().shape({
	name: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نام دسته بندی را وارد کنید"),
	description: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("توضیحات را وارد کنید"),
	imageId: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("لینک تصویر را وارد کنید"),
	backgroundImageId: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("لینک تصویر زمینه را وارد کنید"),
});

export default function CategoryAdd(props) {
	const navigate = useNavigate();
	const formRef = useRef();
	const dispatch = useDispatch();

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
			navigate(`/admin/category`);
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
					<div className="mainPanelTitle bold">اضافه کردن دسته بندی</div>
					<div className="profileInputContainer">
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="name"
							label="نام دسته بندی"
							type="text"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.name}
							onChange={handleChange}
							error={touched.name && Boolean(errors.name)}
							helperText={touched.name && errors.name}
						/>
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
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="backgroundImageId"
							className="profileInput"
							label="لینک تصویر زمینه"
							type="text"
							fullWidth
							variant="outlined"
							value={values.backgroundImageId}
							onChange={handleChange}
							error={
								touched.backgroundImageId && Boolean(errors.backgroundImageId)
							}
							helperText={touched.backgroundImageId && errors.backgroundImageId}
						/>
					</div>
					<div className="profileInputContainer">
						<Button
							variant="outlined"
							className="profileInput"
							component="label"
							margin="dense"
							color="error"
							onClick={(event) => navigate("/admin/category")}
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
							fullWidth
							onClick={(event) => handleSubmit()}
						>
							اضافه کردن
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
