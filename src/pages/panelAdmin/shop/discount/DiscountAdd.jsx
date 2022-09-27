import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import { FormControl } from "@mui/material";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const initialValues = {
	code: "",
	value: 0,
	isPercentage: true,
	isActive: true,
	startDate: "",
	dueDate: "",
	isReusable: false,
};

const validationSchema = yup.object().shape({
	code: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("کد تخفیف را وارد کنید"),
	value: yup
		.number()
		.typeError("میزان تخفیف باید عدد باشد")
		.required("میزان تخفیف را وارد کنید"),
	isPercentage: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نوع تخفیف را انتخاب کنید"),
	isActive: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("وضعیت تخفیف را انتخاب کنید"),
	startDate: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("تاریخ شروع را وارد کنید"),
	dueDate: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("تاریخ انقضا را وارد کنید"),
	isReusable: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نوع مصرف تخفیف را انتخاب کنید"),
});

const submit = (values) => {
	alert(JSON.stringify(values, null, 2));
};

export default function DiscountAdd(props) {
	const navigate = useNavigate();

	return (
		<Formik
			{...props}
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={submit}
		>
			{({ handleChange, values, setFieldValue, errors, touched }) => (
				<Form>
					<div className="mainPanelTitle bold">اضافه کردن تخفیف</div>
					<div className="profileInputContainer">
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="code"
							label="کد تخفیف"
							type="text"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.code}
							onChange={handleChange}
							error={touched.code && Boolean(errors.code)}
							helperText={touched.code && errors.code}
						/>
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="value"
							label="میزان تخفیف"
							type="number"
							fullWidth
							variant="outlined"
							className="profileInput"
							defaultValue="0"
							value={values.value}
							onChange={handleChange}
							error={touched.value && Boolean(errors.value)}
							helperText={touched.value && errors.value}
						/>
					</div>
					<div className="profileInputContainer">
						<FormControl
							fullWidth
							className="selectContainer profileInput"
							sx={{ margin: "5px 0" }}
						>
							<InputLabel
								error={touched.isPercentage && Boolean(errors.isPercentage)}
								id="type"
							>
								نوع تخفیف
							</InputLabel>
							<Select
								labelId="type"
								id="isPercentage"
								variant="outlined"
								fullWidth
								label="نوع تخفیف"
								value={values.isPercentage}
								onChange={(e) => {
									setFieldValue("isPercentage", e.target.value);
								}}
								error={touched.isPercentage && Boolean(errors.isPercentage)}
							>
								<MenuItem value="" sx={{ justifyContent: "flex-end" }}>
									<em>انتخاب کنید</em>
								</MenuItem>
								<MenuItem value={true} sx={{ justifyContent: "flex-end" }}>
									درصد
								</MenuItem>
								<MenuItem value={false} sx={{ justifyContent: "flex-end" }}>
									قیمت
								</MenuItem>
							</Select>
							<FormHelperText
								error={touched.isPercentage && Boolean(errors.isPercentage)}
							>
								{touched.isPercentage && errors.isPercentage}
							</FormHelperText>
						</FormControl>
						<FormControl
							fullWidth
							className="selectContainer profileInput"
							sx={{ margin: "5px 0" }}
						>
							<InputLabel
								error={touched.isActive && Boolean(errors.isActive)}
								id="type"
							>
								وضعیت تخفیف
							</InputLabel>
							<Select
								labelId="type"
								id="isActive"
								variant="outlined"
								fullWidth
								label="نوع تخفیف"
								value={values.isActive}
								onChange={(e) => {
									setFieldValue("isActive", e.target.value);
								}}
								error={touched.isActive && Boolean(errors.isActive)}
							>
								<MenuItem value="" sx={{ justifyContent: "flex-end" }}>
									<em>انتخاب کنید</em>
								</MenuItem>
								<MenuItem value={true} sx={{ justifyContent: "flex-end" }}>
									فعال
								</MenuItem>
								<MenuItem value={false} sx={{ justifyContent: "flex-end" }}>
									غیرفعال
								</MenuItem>
							</Select>
							<FormHelperText
								error={touched.isActive && Boolean(errors.isActive)}
							>
								{touched.isActive && errors.isActive}
							</FormHelperText>
						</FormControl>
					</div>
					<div className="profileInputContainer">
						<TextField
							dir="rtl"
							margin="dense"
							id="startDate"
							label="تاریخ شروع"
							type="date"
							fullWidth
							variant="outlined"
							className="profileInput"
							InputLabelProps={{ shrink: true }}
							value={values.startDate}
							onChange={handleChange}
							error={touched.startDate && Boolean(errors.startDate)}
							helperText={touched.startDate && errors.startDate}
						/>
						<TextField
							dir="rtl"
							margin="dense"
							id="dueDate"
							label="تاریخ انقضا"
							type="date"
							fullWidth
							variant="outlined"
							className="profileInput"
							InputLabelProps={{ shrink: true }}
							value={values.dueDate}
							onChange={handleChange}
							error={touched.dueDate && Boolean(errors.dueDate)}
							helperText={touched.dueDate && errors.dueDate}
						/>
					</div>
					<div className="profileInputContainer">
						<FormControl
							fullWidth
							className="selectContainer profileInput"
							sx={{ margin: "5px 0" }}
						>
							<InputLabel
								error={touched.isReusable && Boolean(errors.isReusable)}
								id="type"
							>
								نوع مصرف تخفیف
							</InputLabel>
							<Select
								labelId="type"
								id="isReusable"
								variant="outlined"
								fullWidth
								label="نوع تخفیف"
								value={values.isReusable}
								onChange={(e) => {
									setFieldValue("isReusable", e.target.value);
								}}
								error={touched.isReusable && Boolean(errors.isReusable)}
							>
								<MenuItem value="" sx={{ justifyContent: "flex-end" }}>
									<em>انتخاب کنید</em>
								</MenuItem>
								<MenuItem value={true} sx={{ justifyContent: "flex-end" }}>
									کلی
								</MenuItem>
								<MenuItem value={false} sx={{ justifyContent: "flex-end" }}>
									شخصی
								</MenuItem>
							</Select>
							<FormHelperText
								error={touched.isReusable && Boolean(errors.isReusable)}
							>
								{touched.isReusable && errors.isReusable}
							</FormHelperText>
						</FormControl>
					</div>
					<div className="profileInputContainer">
						<Button
							variant="outlined"
							className="profileInput"
							component="label"
							margin="dense"
							color="error"
							onClick={(event) => navigate("/admin/discount")}
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
							disabled
						>
							اضافه کردن
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
