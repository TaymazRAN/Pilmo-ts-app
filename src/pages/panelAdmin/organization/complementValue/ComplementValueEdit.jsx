import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import "../../../panelPersonal/profile/profile.css";
// import { selectAllPosts as selectAllComplementTypes } from "../complementType/complementTypeSlice";
// import { fetchComplementType } from "../complementType/complementTypeSlice";
// import { selectAllPosts as selectAllOrganizations } from "../organizationTabel/organizationSlice";
// import { fetchOrganization } from "../organizationTabel/organizationSlice";
import { selectPostById, updatePost } from "./complementValueSlice";
import { fixNull } from "../../../../services/fixNull";
import Loading from "../../../../component/loading/Loading";

const validationSchema = yup.object().shape({
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
	const { id } = useParams();
	const post = useSelector((state) => selectPostById(state, id));

	const initialValues = {
		content: fixNull(post?.content),
	};

	const dispatch = useDispatch();

	const submit = (values) => {
		// alert(JSON.stringify(values, null, 2));
		dispatch(updatePost({ id: post.id, ...values })).unwrap();
		navigate(`/admin/complementValue`);
	};

	const handleSubmit = () => {
		if (formRef.current) {
			formRef.current.handleSubmit();
		}
	};

	return (
		<>
			{post ? (
				<Formik
					{...props}
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={submit}
					innerRef={formRef}
				>
					{({ handleChange, values, setFieldValue, errors, touched }) => (
						<Form>
							{/* <Autocomplete
									fullWidth
									id="organizationComplementryFieldId"
									name="organizationComplementryFieldId"
									className="profileInput"
									options={dataComplementType.map((item) => {
										return { ...item, label: item.name };
									})}
									defaultValue={
										dataComplementType.find(
											(item) =>
												item.id ===
												fixNull(post?.organizationComplementryInfoFieldId)
										)?.name
									}
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
											label="ویژگی"
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
								/> */}
							<div className="mainPanelTitle bold">
								ویرایش ورودی تکمیلی
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
									ویرایش
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			) : (
				<Loading />
			)}
		</>
	);
}
