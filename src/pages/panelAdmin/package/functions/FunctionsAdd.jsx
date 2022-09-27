import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addNewPost } from "./functionSlice";
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

const initialValues = {
	name: "",
	description: "",
	price: "",
	duration: "",
	difficulty: "",
	fileName: "testId",
};

const validationSchema = yup.object().shape({
	name: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نام عملکرد را وارد کنید"),
	description: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("توضیحات را وارد کنید"),
	price: yup
		.number()
		.typeError("قیمت باید عدد باشد")
		.required("قیمت را وارد کنید"),
	duration: yup
		.number()
		.typeError("مدت زمان باید عدد باشد")
		.required("مدت زمان را وارد کنید"),
	difficulty: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("سختی را انتخاب کنید"),
});

export default function FunctionAdd(props) {
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
			navigate(`/admin/function`);
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
					<div className="mainPanelTitle bold">اضافه کردن عملکرد</div>
					<div className="profileInputContainer">
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="name"
							label="نام عملکرد"
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
							<InputLabel
								error={touched.difficulty && Boolean(errors.difficulty)}
							>
								سختی
							</InputLabel>
							<Select
								labelId="difficulty"
								id="difficulty"
								variant="outlined"
								value={values.difficulty}
								onChange={(e) => {
									setFieldValue("difficulty", e.target.value);
								}}
								error={touched.difficulty && Boolean(errors.difficulty)}
								fullWidth
								label="سختی"
							>
								<MenuItem value="" sx={{ justifyContent: "flex-end" }}>
									<em>انتخاب کنید</em>
								</MenuItem>
								<MenuItem value={"Easy"} sx={{ justifyContent: "flex-end" }}>
									آسان
								</MenuItem>
								<MenuItem value={"Normal"} sx={{ justifyContent: "flex-end" }}>
									معمولی
								</MenuItem>
								<MenuItem value={"Hard"} sx={{ justifyContent: "flex-end" }}>
									سخت
								</MenuItem>
							</Select>
							<FormHelperText
								error={touched.difficulty && Boolean(errors.difficulty)}
							>
								{touched.difficulty && errors.difficulty}
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
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="price"
							label="قیمت"
							type="number"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.price}
							onChange={handleChange}
							error={touched.price && Boolean(errors.price)}
							helperText={touched.price && errors.price}
						/>
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="duration"
							label="مدت زمان"
							type="number"
							fullWidth
							variant="outlined"
							className="profileInput"
							value={values.duration}
							onChange={handleChange}
							error={touched.duration && Boolean(errors.duration)}
							helperText={touched.duration && errors.duration}
						/>
					</div>
					<div className="profileInputContainer">
						<Button
							variant="outlined"
							className="profileInput"
							component="label"
							margin="dense"
							color="error"
							onClick={(event) => navigate("/admin/function")}
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
