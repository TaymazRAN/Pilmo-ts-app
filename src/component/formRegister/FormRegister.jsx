import React, { useRef,useState } from "react";
import TextField from "@mui/material/TextField";
import "./formRegister.css";
import { Button } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Autocomplete from "@mui/material/Autocomplete";
import { userRows } from "../../Data/Users";
import { useDispatch } from "react-redux";
import { addNewPost } from "../../pages/panelAdmin/loginForm/user/userSlice";
import FormHelperText from "@mui/material/FormHelperText";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const initialValues = {
	username: "",
	password: "",
	firstName: "",
	address: "",
	lastName: "",
	nationalId: "",
	contactNum: "",
	email: "",
	currentOccupation: "",
	gender: "",
};

const validationSchema = yup.object().shape({
	firstName: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نام را وارد کنید"),
	lastName: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("نام خانوادگی را وارد کنید"),
	address: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("آدرس را وارد کنید"),
	contactNum: yup
		.number()
		.typeError("شماره تماس باید عدد باشد")
		.required("شماره تماس را وارد کنید"),
	nationalId: yup
		.number()
		.typeError("کد ملی باید عدد باشد")
		.required("کد ملی را وارد کنید"),
	username: yup
		.string()
		.matches(
			/^[A-Za-z][A-Za-z0-9_]{5,}$/,
			"باید شامل 5 حرف باشد و با حرف انگلیسی شروع شود. فقط حروف انگلیسی، شماره ها و زیر خط مجاز است."
		)
		.required("نام کاربری را وارد کنید"),
	password: yup
		.string()
		.matches(
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
			"باید شامل 8 حرف، یک حرف بزرگ انگلیسی، یک حرف کوچک انگلیسی، یک شماره و یک علامت خاص باشد."
		)
		.required("گذرواژه را وارد کنید"),
	currentOccupation: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("شغل فعلی را انتخاب کنید"),
	gender: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("جنسیت را انتخاب کنید"),
	email: yup
		.string()
		.matches(
			/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
			"ایمیل را با ساختار صحیح وارد کنید"
		)
		.required("ایمیل را وارد کنید"),
});

let jobAutoComplete = [];

for (let i = 0; i < userRows.length; i++) {
	jobAutoComplete[i] = userRows[i].currentOccupation;
}

export default function FormRegister() {
	// eslint-disable-next-line no-unused-vars
	const navigate = useNavigate();
	const formRef = useRef();
	const dispatch = useDispatch();

	const handleSubmit = () => {
		if (formRef.current) {
			formRef.current.handleSubmit();
		}
	};

	const [success, setSuccess] = useState(false);
	const [successText, setSuccessText] = useState("");
	const handleOpenSuccess = (text) => {
		setSuccessText(text);
		setSuccess(true);
	};

	const handleCloseSuccess = () => {
		setSuccess(false);
	};

	const [error, setError] = useState(false);
	const [errorText, setErrorText] = useState("");

	const handleOpenError = (text) => {
		setErrorText(text);
		setError(true);
	};

	const handleCloseError = () => {
		setError(false);
	};

	const submit = (values) => {
		// alert(JSON.stringify(values, null, 2));
		try {
			dispatch(addNewPost(values)).unwrap();
			console.log(values);
			// navigate();
			handleOpenSuccess("حساب شما با موفقیت ایجاد شد");
		} catch (err) {
			console.error("Failed to save the post", err);
			handleOpenError("Failed to save the post" + err);
		}
	};

	const [showPassword, setShowPassword] = React.useState(false);

	return (
		<>
			<div style={{ direction: "rtl" }}>
				<Snackbar
					open={success}
					autoHideDuration={6000}
					onClose={handleCloseSuccess}
					sx={{ direction: "right" }}
				>
					<Alert
						onClose={handleCloseSuccess}
						severity="success"
						sx={{ width: "100%" }}
					>
						{successText}
					</Alert>
				</Snackbar>
				<Snackbar
					open={error}
					autoHideDuration={6000}
					onClose={handleCloseError}
					sx={{ direction: "right" }}
				>
					<Alert
						onClose={handleCloseError}
						severity="error"
						sx={{ width: "100%" }}
					>
						{errorText}
					</Alert>
				</Snackbar>
			</div>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={submit}
				innerRef={formRef}
			>
				{({ handleChange, values, setFieldValue, errors, touched }) => (
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginBottom: "40px",
							padding: "20px",
						}}
					>
						<Form className="widthFix signup boxshodow1">
							<div className="loginForm" dir="rtl">
								<div className="loginTitle bold">ساخت حساب کاربری</div>
								<div className="formInputContainer signup">
									<TextField
										className="formInput signup"
										variant="outlined"
										label="نام"
										id="firstName"
										value={values.firstName}
										onChange={handleChange}
										error={touched.firstName && Boolean(errors.firstName)}
										helperText={touched.firstName && errors.firstName}
									/>
									<TextField
										className="formInput signup"
										variant="outlined"
										label="نام خانوادگی"
										id="lastName"
										value={values.lastName}
										onChange={handleChange}
										error={touched.lastName && Boolean(errors.lastName)}
										helperText={touched.lastName && errors.lastName}
									/>
								</div>
								<div className="formInputContainer signup">
									<TextField
										className="formInput signup"
										variant="outlined"
										label="شناسه کاربری"
										id="username"
										value={values.username}
										onChange={handleChange}
										error={touched.username && Boolean(errors.username)}
										helperText={touched.username && errors.username}
									/>
									<FormControl className="formInput signup" variant="outlined">
										<InputLabel
											error={touched.password && Boolean(errors.password)}
										>
											رمز عبور
										</InputLabel>
										<OutlinedInput
											type={showPassword ? "text" : "password"}
											id="password"
											value={values.password}
											onChange={handleChange}
											error={touched.password && Boolean(errors.password)}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={(event) => setShowPassword(!showPassword)}
														edge="end"
													>
														{showPassword ? (
															<VisibilityOff className="passwordIcon" />
														) : (
															<Visibility className="passwordIcon" />
														)}
													</IconButton>
												</InputAdornment>
											}
											label="رمز عبور"
										/>
										<FormHelperText
											error={touched.password && Boolean(errors.password)}
										>
											{touched.password && errors.password}
										</FormHelperText>
									</FormControl>
								</div>
								<div className="formInputContainer signup">
									<TextField
										className="formInput signup"
										variant="outlined"
										type="text"
										label="کد ملی"
										id="nationalId"
										value={values.nationalId}
										onChange={handleChange}
										error={touched.nationalId && Boolean(errors.nationalId)}
										helperText={touched.nationalId && errors.nationalId}
									/>
									<TextField
										className="formInput signup"
										variant="outlined"
										type="text"
										label="آدرس"
										id="address"
										value={values.address}
										onChange={handleChange}
										error={touched.address && Boolean(errors.address)}
										helperText={touched.address && errors.address}
									/>
								</div>
								<div className="formInputContainer signup">
									<TextField
										className="formInput signup"
										variant="outlined"
										type="email"
										label="ایمیل"
										id="email"
										value={values.email}
										onChange={handleChange}
										error={touched.email && Boolean(errors.email)}
										helperText={touched.email && errors.email}
									/>
									<TextField
										className="formInput signup"
										variant="outlined"
										type="tel"
										label="شماره تماس"
										id="contactNum"
										value={values.contactNum}
										onChange={handleChange}
										error={touched.contactNum && Boolean(errors.contactNum)}
										helperText={touched.contactNum && errors.contactNum}
									/>
								</div>
								<div className="formInputContainer signup">
									<FormControl fullWidth className="formInput signup">
										<FormLabel error={touched.gender && Boolean(errors.gender)}>
											جنسیت
										</FormLabel>
										<RadioGroup
											row
											id="gender"
											value={values.gender}
											onChange={(e) => {
												setFieldValue(
													"gender",
													e.target.value === "true" ? true : false
												);
											}}
											error={touched.gender && Boolean(errors.gender)}
										>
											<FormControlLabel
												value={true}
												control={<Radio />}
												label="مرد"
												sx={{ color: "#222222" }}
											/>
											<FormControlLabel
												value={false}
												control={<Radio />}
												label="زن"
												sx={{ color: "#222222" }}
											/>
										</RadioGroup>
										<FormHelperText
											error={touched.gender && Boolean(errors.gender)}
										>
											{touched.gender && errors.gender}
										</FormHelperText>
									</FormControl>
									<div className="formInput signup">
										<Autocomplete
											fullWidth
											id="currentOccupation"
											className="profileInput"
											options={jobAutoComplete}
											// getOptionLabel={(option) => option.name}
											onChange={(e, value) => {
												setFieldValue(
													"currentOccupation",
													value !== null
														? value
														: initialValues.currentOccupation
												);
											}}
											renderInput={(params) => (
												<TextField
													margin="normal"
													label="شغل فعلی"
													fullWidth
													name="currentOccupation"
													value={values.currentOccupation}
													error={
														touched.currentOccupation &&
														Boolean(errors.currentOccupation)
													}
													helperText={
														touched.currentOccupation &&
														errors.currentOccupation
													}
													{...params}
												/>
											)}
										/>
									</div>
								</div>
								<div className="loginButtonContainer">
									<Button
										onClick={(event) => handleSubmit()}
										variant="outlined"
									>
										ساخت حساب کاربری
									</Button>
								</div>
							</div>
						</Form>
					</div>
				)}
			</Formik>
		</>
	);
}
