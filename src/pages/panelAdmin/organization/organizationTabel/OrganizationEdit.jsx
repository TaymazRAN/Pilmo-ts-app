import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { packageRows } from "../../../../Data/Package";
import { useNavigate, useParams } from "react-router-dom";
import { selectPostById, updatePost } from "./organizationSlice";
import "../../../panelPersonal/profile/profile.css";
import Loading from "../../../../component/loading/Loading";
import { fixNull } from "../../../../services/fixNull";

let packageRowsAutoComplete = [];

for (let i = 0; i < packageRows.length; i++) {
	packageRowsAutoComplete[i] = packageRows[i].name;
}

const validationSchema = yup.object().shape({
	name: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نام سازمان را وارد کنید"),
	address: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("آدرس را وارد کنید"),
	postCode: yup
		.number()
		.typeError("کد پستی باید عدد باشد")
		.required("کد پستی را وارد کنید"),
	contactNumber: yup
		.number()
		.typeError("شماره تماس باید عدد باشد")
		.required("شماره تماس را وارد کنید"),
	emailAddress: yup
		.string("ایمیل را وارد کنید")
		.matches(
			/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
			"ایمیل را با ساختار صحیح وارد کنید"
		)
		.required("ایمیل را وارد کنید"),
	description: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("توضیحات را وارد کنید"),
	logoFileName: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("لینک لوگو را وارد کنید"),
	refCode: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("کد ارجاع را وارد کنید"),
	plan: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("طرح را انتخاب کنید"),
	planExpDate: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("تاریخ انقضا طرح را وارد کنید"),
});

export default function OrganizationEdit(props) {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const post = useSelector((state) => selectPostById(state, id));
	const formRef = useRef();

	const initialValues = {
		name: fixNull(post?.name),
		address: fixNull(post?.address),
		postCode: fixNull(post?.postCode),
		plan: fixNull(post?.plan),
		planExpDate: fixNull(post?.planExpDate),
		contactNumber: fixNull(post?.contactNumber),
		emailAddress: fixNull(post?.emailAddress),
		description: fixNull(post?.description),
		logoFileName: fixNull(post?.logoFileName),
		refCode: fixNull(post?.refCode),
		credit: 0,
	};

	const submit = (values) => {
		console.log(values);
		dispatch(updatePost({ id: post.id, ...values })).unwrap();

		navigate(`/admin/organization`);
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
					innerRef={formRef}
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={submit}
				>
					{({ handleChange, values, setFieldValue, errors, touched }) => (
						<Form>
							<div className="mainPanelTitle bold">ویرایش سازمان</div>
							<div className="profileInputContainer">
								<TextField
									dir="rtl"
									margin="dense"
									id="name"
									label="نام سازمان"
									type="text"
									fullWidth
									variant="outlined"
									className="profileInput"
									value={values.name}
									onChange={handleChange}
									error={touched.name && Boolean(errors.name)}
									helperText={touched.name && errors.name}
								/>
								<TextField
									dir="rtl"
									margin="dense"
									id="address"
									label="آدرس"
									type="text"
									fullWidth
									variant="outlined"
									className="profileInput"
									value={values.address}
									onChange={handleChange}
									error={touched.address && Boolean(errors.address)}
									helperText={touched.address && errors.address}
								/>
							</div>
							<div className="profileInputContainer">
								<TextField
									dir="rtl"
									margin="dense"
									id="postCode"
									label="کد پستی"
									type="text"
									fullWidth
									variant="outlined"
									className="profileInput"
									value={values.postCode}
									onChange={handleChange}
									error={touched.postCode && Boolean(errors.postCode)}
									helperText={touched.postCode && errors.postCode}
								/>
								<TextField
									dir="rtl"
									margin="dense"
									id="contactNumber"
									label="شماره تماس"
									type="tel"
									fullWidth
									variant="outlined"
									className="profileInput"
									value={values.contactNumber}
									onChange={handleChange}
									error={touched.contactNumber && Boolean(errors.contactNumber)}
									helperText={touched.contactNumber && errors.contactNumber}
								/>
							</div>
							<div className="profileInputContainer">
								<TextField
									dir="rtl"
									margin="dense"
									id="emailAddress"
									label="ایمیل"
									type="email"
									fullWidth
									variant="outlined"
									className="profileInput"
									value={values.emailAddress}
									onChange={handleChange}
									error={touched.emailAddress && Boolean(errors.emailAddress)}
									helperText={touched.emailAddress && errors.emailAddress}
								/>
								<TextField
									dir="rtl"
									margin="dense"
									id="description"
									label="توضیحات"
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
									dir="rtl"
									margin="dense"
									id="logoFileName"
									label="لینک لوگو"
									type="text"
									fullWidth
									variant="outlined"
									className="profileInput"
									value={values.logoFileName}
									onChange={handleChange}
									error={touched.logoFileName && Boolean(errors.logoFileName)}
									helperText={touched.logoFileName && errors.logoFileName}
								/>
								<TextField
									dir="rtl"
									margin="dense"
									id="refCode"
									label="کد ارجاع"
									type="text"
									fullWidth
									variant="outlined"
									className="profileInput"
									value={values.refCode}
									onChange={handleChange}
									error={touched.refCode && Boolean(errors.refCode)}
									helperText={touched.refCode && errors.refCode}
								/>
							</div>
							<div className="profileInputContainer">
								<Autocomplete
									fullWidth
									id="plan"
									name="plan"
									sx={{ marginTop: "0" }}
									className="profileInput"
									options={packageRowsAutoComplete}
									// defaultValue={
									// 	packageRowsAutoComplete.find(
									// 		(item) => item.name === post?.plan
									// 	)
									// }
									defaultValue={packageRowsAutoComplete.find(
										(item) => item === post?.plan
									)}
									// getOptionLabel={(option) => option.name}
									onChange={(e, value) => {
										setFieldValue("plan", value !== null ? value : post.plan);
									}}
									renderInput={(params) => (
										<TextField
											margin="normal"
											label="طرح"
											fullWidth
											name="plan"
											value={values.plan}
											error={touched.plan && Boolean(errors.plan)}
											helperText={touched.plan && errors.plan}
											{...params}
										/>
									)}
								/>
								<TextField
									dir="rtl"
									margin="dense"
									id="planExpDate"
									label="تاریخ انقضا طرح"
									type="date"
									fullWidth
									variant="outlined"
									className="profileInput"
									InputLabelProps={{ shrink: true }}
									value={values.planExpDate.substr(0, 10)}
									onChange={handleChange}
									error={touched.planExpDate && Boolean(errors.planExpDate)}
									helperText={touched.planExpDate && errors.planExpDate}
								/>
							</div>
							<div className="profileInputContainer">
								<Button
									variant="outlined"
									className="profileInput"
									component="label"
									margin="dense"
									color="error"
									onClick={(event) => navigate("/admin/organization")}
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
									type="submit"
									onClick={(event) => handleSubmit()}
									color="primary"
									sx={{ padding: "15px 0", marginTop: "4px" }}
									fullWidth
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
