import "./formContact.css";
import React from "react";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { cityRows, provinceRows } from "../../Data/Contact";

let provinceRowsAutoComplete = [];

for (let i = 0; i < provinceRows.length; i++) {
	provinceRowsAutoComplete[i] = provinceRows[i].name;
}

let cityRowsAutoComplete = [];

for (let i = 0; i < cityRows.length; i++) {
	cityRowsAutoComplete[i] = cityRows[i].name;
}

export default function FormContact() {
	return (
		<div>
			<FormGroup
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginBottom: "40px",
					padding: "20px",
				}}
			>
				<div className="widthFix signup boxshodow1">
					<div className="loginForm" dir="rtl">
						<div className="loginTitle bold">تماس با سایپورت</div>
						<div className="formInputContainer signup">
							<TextField
								className="formInput signup"
								variant="outlined"
								label="نام"
							/>
							<TextField
								className="formInput signup"
								variant="outlined"
								label="نام خانوادگی"
							/>
						</div>
						<div className="formInputContainer signup">
							<TextField
								className="formInput signup"
								variant="outlined"
								type="email"
								label="ایمیل"
							/>
							<TextField
								className="formInput signup"
								variant="outlined"
								type="tel"
								label="شماره تماس"
							/>
						</div>
						<div className="formInputContainer signup">
							<Autocomplete
								disablePortal
								id="province"
								options={provinceRowsAutoComplete}
								className="formInput signup"
								renderInput={(params) => (
									<TextField {...params} label="استان" />
								)}
							/>
							<Autocomplete
								disablePortal
								id="city"
								options={cityRowsAutoComplete}
								className="formInput signup"
								renderInput={(params) => <TextField {...params} label="شهر" />}
							/>
						</div>
						<TextField
							id="outlined-multiline-flexible"
							label="پیام"
              multiline
              fullWidth
              minRows={4}
							maxRows={8}
						/>
						<div className="loginButtonContainer">
							<Button variant="outlined">ارسال پیام</Button>
						</div>
					</div>
				</div>
			</FormGroup>
		</div>
	);
}
