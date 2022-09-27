import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "../../../panelPersonal/profile/profile.css";
import { selectAllPosts as selectAllComplementTypes } from "../complementType/complementTypeSlice";
import { fetchComplementType } from "../complementType/complementTypeSlice";
import { selectAllPosts as selectAllOrganizations } from "../organizationTabel/organizationSlice";
import { fetchOrganization } from "../organizationTabel/organizationSlice";
import { addNewPost } from "./complementValueSlice";

const initialValues = {
	organizationId: "",
	organizationComplementryFieldId: "",
	content: "",
};

const validationSchema = yup.object().shape({
	organizationId: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("سازمان را انتخاب کنید"),
	organizationComplementryFieldId: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("فیلد تکمیلی را انتخاب کنید"),
	content: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("اطلاعات را وارد کنید"),
});

export default function ComplementValueAdd(props) {
	const navigate = useNavigate();
	const formRef = useRef();

	const dataComplementType = useSelector((state) =>
		selectAllComplementTypes(state)
	);
	const dataOrganization = useSelector((state) =>
		selectAllOrganizations(state)
	);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchComplementType());
		dispatch(fetchOrganization());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const submit = (values) => {
		// alert(JSON.stringify(values, null, 2));
		try {
			dispatch(addNewPost(values)).unwrap();
			console.log(values);
			navigate(`/admin/complementValue`);
		} catch (err) {
			console.error("Failed to save the post", err);
		}
	};

	const handleSubmit = () => {
		if (formRef.current) {
			formRef.current.handleSubmit();
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
					<div className="mainPanelTitle bold">
						اضافه کردن ورودی تکمیلی
					</div>
					<div className="profileInputContainer">
						<Autocomplete
							fullWidth
							id="organizationId"
							name="organizationId"
							className="profileInput"
							options={dataOrganization.map((item) => {
								return { ...item, label: item.name };
							})}
							// getOptionLabel={(option) => option.name}
							onChange={(e, value) => {
								setFieldValue(
									"organizationId",
									value !== null ? value.id : initialValues.organizationId
								);
							}}
							renderInput={(params) => (
								<TextField
									margin="normal"
									label="سازمان"
									fullWidth
									name="organizationId"
									value={values.organizationId}
									error={
										touched.organizationId && Boolean(errors.organizationId)
									}
									helperText={touched.organizationId && errors.organizationId}
									{...params}
								/>
							)}
						/>
						<Autocomplete
							fullWidth
							id="organizationComplementryFieldId"
							name="organizationComplementryFieldId"
							className="profileInput"
							options={dataComplementType.map((item) => {
								return { ...item, label: item.name };
							})}
							// getOptionLabel={(option) => option.name}
							onChange={(e, value) => {
								setFieldValue(
									"organizationComplementryFieldId",
									value !== null
										? value.id
										: initialValues.organizationComplementryFieldId
								);
							}}
							renderInput={(params) => (
								<TextField
									margin="normal"
									label="فیلد تکمیلی"
									fullWidth
									name="organizationComplementryFieldId"
									value={values.organizationComplementryFieldId}
									error={
										touched.organizationComplementryFieldId &&
										Boolean(errors.organizationComplementryFieldId)
									}
									helperText={
										touched.organizationComplementryFieldId &&
										errors.organizationComplementryFieldId
									}
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
							id="content"
							label="ورودی تکمیلی"
							type="text"
							fullWidth
							variant="outlined"
							className="profileInput"
							name="content"
							value={values.content}
							onChange={handleChange}
							error={touched.content && Boolean(errors.content)}
							helperText={touched.content && errors.content}
						/>
					</div>
					<div className="profileInputContainer">
						<Button
							variant="outlined"
							className="profileInput"
							component="label"
							margin="dense"
							color="error"
							onClick={(event) => navigate("/admin/complementValue")}
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
