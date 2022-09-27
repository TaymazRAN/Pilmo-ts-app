import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { organizationRows } from "../../../../Data/Organization";
import { packageRows } from "../../../../Data/Package";
import { useNavigate } from "react-router-dom";
import "../../../panelPersonal/profile/profile.css";

let packageRowsAutoComplete = [];

for (let i = 0; i < packageRows.length; i++) {
	packageRowsAutoComplete[i] = packageRows[i].name;
}

let organizationRowsAutoComplete = [];

for (let i = 0; i < organizationRows.length; i++) {
	organizationRowsAutoComplete[i] = organizationRows[i].name;
}

const initialValues = {
	organization: "",
	package: "",
	amount: 100,
};

const validationSchema = yup.object().shape({
	organization: yup
		.string()
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("سازمان را انتخاب کنید"),
	package: yup
		.string("بسته را انتخاب کنید")
		// .matches(
		// 	/ /,
		// 	""
		// )
		.required("بسته را انتخاب کنید"),
	amount: yup
		.number()
		.typeError(" مقدار اعتبار باید عدد باشد")
		.min(100, " مقدار اعتبار باید بیشتر از 100 باشد")
		.max(10000, " مقدار اعتبار باید کمتر از 10000 باشد")
		.required("مقدار اعتبار را انتخاب کنید"),
});

const submit = (values) => {
	alert(JSON.stringify(values, null, 2));
};

export default function InventoryEdit(props) {
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
					<div className="mainPanelTitle bold">ویرایش اعتبار</div>
					<div className="profileInputContainer">
						<Autocomplete
							fullWidth
							id="organization"
							name="organization"
							className="profileInput"
							options={organizationRowsAutoComplete}
							// getOptionLabel={(option) => option.name}
							onChange={(e, value) => {
								setFieldValue(
									"organization",
									value !== null ? value : initialValues.organization
								);
							}}
							renderInput={(params) => (
								<TextField
									margin="normal"
									label="سازمان"
									fullWidth
									name="organization"
									value={values.organization}
									error={touched.organization && Boolean(errors.organization)}
									helperText={touched.organization && errors.organization}
									{...params}
								/>
							)}
						/>
						<Autocomplete
							fullWidth
							id="package"
							name="package"
							className="profileInput"
							options={packageRowsAutoComplete}
							// getOptionLabel={(option) => option.name}
							onChange={(e, value) => {
								setFieldValue(
									"package",
									value !== null ? value : initialValues.package
								);
							}}
							renderInput={(params) => (
								<TextField
									margin="normal"
									label="بسته"
									fullWidth
									name="package"
									value={values.package}
									error={touched.package && Boolean(errors.package)}
									helperText={touched.package && errors.package}
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
							id="amount"
							label="مقدار اعتبار"
							type="number"
							fullWidth
							variant="outlined"
							name="amount"
							value={values.amount}
							onChange={handleChange}
							error={touched.amount && Boolean(errors.amount)}
							helperText={touched.amount && errors.amount}
						/>
					</div>
					<div className="profileInputContainer">
						<Button
							variant="outlined"
							className="profileInput"
							component="label"
							margin="dense"
							color="error"
							onClick={(event) => navigate("/admin/inventory")}
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
							ویرایش
						</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
}
