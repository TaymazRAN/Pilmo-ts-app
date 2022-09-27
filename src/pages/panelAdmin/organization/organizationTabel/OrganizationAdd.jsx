import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { packageRows } from "../../../../Data/Package";
import { useNavigate } from "react-router-dom";
import "../../../panelPersonal/profile/profile.css";
import { selectAllPosts as selectAllTypes } from "../type/postsSlice";
import { fetchPosts as fetchTypes } from "../type/postsSlice";
import { addNewPost } from "./organizationSlice";

let packageRowsAutoComplete = [];

for (let i = 0; i < packageRows.length; i++) {
	packageRowsAutoComplete[i] = packageRows[i].name;
}

const initialValues = {
	name: "",
	address: "",
	postCode: "",
	contactNumber: "",
	emailAddress: "",
	description: "",
	logoFileName: "",
	customData: "",
	refCode: "",
	categoryId: "",
	plan: "",
	planExpDate: "",
	excutiveUsername: "",
	executivePassoword: "",
	executiveName: "",
	executivePhoneNum: "",
	executiveEmail: "",
};

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
		.string()
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
	customData: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("اطلاعات را وارد کنید"),
	refCode: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("کد ارجاع را وارد کنید"),
	categoryId: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نوع سازمان را انتخاب کنید"),
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
	excutiveUsername: yup
		.string()
		.matches(
			/^[A-Za-z][A-Za-z0-9_]{5,}$/,
			"باید شامل 5 حرف باشد و با حرف انگلیسی شروع شود. فقط حروف انگلیسی، شماره ها و زیر خط مجاز است."
		)
		.required("نام کاربری مدیر را وارد کنید"),
	executivePassoword: yup
		.string()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			"باید شامل 8 حرف، یک حرف بزرگ انگلیسی، یک حرف کوچک انگلیسی، یک شماره و یک علامت خاص باشد."
		)
		.required("گذرواژه مدیر را وارد کنید"),
	executiveName: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نام مدیر را وارد کنید"),
	executivePhoneNum: yup
		.number()
		.typeError("شماره تماس باید عدد باشد")
		.required("شماره تماس مدیر را وارد کنید"),
	executiveEmail: yup
		.string()
		.matches(
			/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
			"ایمیل را با ساختار صحیح وارد کنید"
		)
		.required("ایمیل مدیر را وارد کنید"),
});

export default function OrganizationAdd(props) {
	const formRef = useRef();
	const navigate = useNavigate();
	const dataType = useSelector((state) => selectAllTypes(state));
	const dispatch = useDispatch();

	const handleSubmit = () => {
		if (formRef.current) {
			formRef.current.handleSubmit();
		}
	};

	const submit = (values) => {
		console.log(values);
		try {
			dispatch(addNewPost(values)).unwrap();
			console.log(values);
			navigate(`/admin/organization`);
		} catch (err) {
			console.error("Failed to save the post", err);
		}
	};

	useEffect(() => {
		dispatch(fetchTypes());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Formik
			{...props}
			innerRef={formRef}
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={submit}
		>
			{({ handleChange, values, setFieldValue, errors, touched }) => (
				<Form>
					<div className="mainPanelTitle bold">اضافه کردن سازمان</div>
					<div className="secondaryPanelTitle">مشخصات سازمان</div>
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
							id="customData"
							label="اطلاعات"
							type="text"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.customData}
							onChange={handleChange}
							error={touched.customData && Boolean(errors.customData)}
							helperText={touched.customData && errors.customData}
						/>
					</div>
					<div className="profileInputContainer">
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
						<Autocomplete
							fullWidth
							id="categoryId"
							name="categoryId"
							margin="dense"
							className="profileInput"
							options={dataType.map((item) => {
								return { ...item, label: item.title };
							})}
							// getOptionLabel={(option) => option.name}
							onChange={(e, value) => {
								setFieldValue(
									"categoryId",
									value !== null ? value.id : initialValues.package
								);
							}}
							renderInput={(params) => (
								<TextField
									margin="normal"
									label="نوع سازمان"
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
						<Autocomplete
							fullWidth
							id="plan"
							name="plan"
							margin="dense"
							className="profileInput"
							options={packageRowsAutoComplete}
							// getOptionLabel={(option) => option.name}
							onChange={(e, value) => {
								setFieldValue(
									"plan",
									value !== null ? value : initialValues.package
								);
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
							value={values.planExpDate}
							onChange={handleChange}
							error={touched.planExpDate && Boolean(errors.planExpDate)}
							helperText={touched.planExpDate && errors.planExpDate}
						/>
					</div>
					<div className="secondaryPanelTitle">مشخصات مدیر</div>
					<div className="profileInputContainer">
						<TextField
							dir="rtl"
							margin="dense"
							id="executiveName"
							label="نام مدیر"
							type="text"
							fullWidth
							variant="outlined"
							value={values.executiveName}
							onChange={handleChange}
							error={touched.executiveName && Boolean(errors.executiveName)}
							helperText={touched.executiveName && errors.executiveName}
						/>
					</div>
					<div className="profileInputContainer">
						<TextField
							dir="rtl"
							margin="dense"
							id="executivePhoneNum"
							label="شماره تماس مدیر"
							type="tel"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.executivePhoneNum}
							onChange={handleChange}
							error={
								touched.executivePhoneNum && Boolean(errors.executivePhoneNum)
							}
							helperText={touched.executivePhoneNum && errors.executivePhoneNum}
						/>
						<TextField
							dir="rtl"
							margin="dense"
							id="executiveEmail"
							label="ایمیل مدیر"
							type="email"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.executiveEmail}
							onChange={handleChange}
							error={touched.executiveEmail && Boolean(errors.executiveEmail)}
							helperText={touched.executiveEmail && errors.executiveEmail}
						/>
					</div>
					<div className="profileInputContainer">
						<TextField
							dir="rtl"
							margin="dense"
							id="excutiveUsername"
							label="نام کاربری مدیر"
							type="text"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.excutiveUsername}
							onChange={handleChange}
							error={
								touched.excutiveUsername && Boolean(errors.excutiveUsername)
							}
							helperText={touched.excutiveUsername && errors.excutiveUsername}
						/>
						<TextField
							dir="rtl"
							margin="dense"
							id="executivePassoword"
							label="گذرواژه مدیر"
							type="password"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.executivePassoword}
							onChange={handleChange}
							error={
								touched.executivePassoword && Boolean(errors.executivePassoword)
							}
							helperText={
								touched.executivePassoword && errors.executivePassoword
							}
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
							اضافه کردن
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
