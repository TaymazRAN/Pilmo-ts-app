import "./profile.css";
import React from "react";
import { styled } from "@mui/material/styles";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
// import { LocalizationProvider } from "@mui/x-date-pickers";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FormControl } from "@mui/material";

const Input = styled("input")({
	display: "none",
});

export default function Profile() {
	const [gender, setGender] = React.useState("");

	const changeGender = (event) => {
		setGender(event.target.value);
	};

	return (
		<div className="profile">
			<div className="mainPanelTitle bold">پروفایل من</div>
			<div className="secondaryPanelTitle">اطلاعات فردی</div>
			<div className="profileFieldContainer">
				<div className="profilePicture">
					<label htmlFor="icon-button-file">
						<Input accept="image/*" id="icon-button-file" type="file" />
						<IconButton
							aria-label="upload picture"
							component="span"
							color="success"
							size="large"
							sx={{ backgroundColor: "#ffffff" }}
						>
							<PhotoCamera />
						</IconButton>
					</label>
				</div>
				<div className="profileInputContainer">
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="نام"
						type="text"
						fullWidth
						variant="outlined"
					/>
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="نام خانوادگی"
						type="text"
						fullWidth
						variant="outlined"
					/>
				</div>
				<div className="profileInputContainer">
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="نام کاربری"
						type="text"
						fullWidth
						variant="outlined"
					/>
					<FormControl
						fullWidth
						className="selectContainer"
						sx={{ margin: "5px 0" }}
					>
						<InputLabel id="type">جنسیت</InputLabel>
						<Select
							labelId="type"
							id="isExcersise"
							variant="outlined"
							value={gender}
							onChange={changeGender}
							fullWidth
							label="جنسیت"
						>
							<MenuItem value="" sx={{ justifyContent: "flex-end" }}>
								<em>انتخاب کنید</em>
							</MenuItem>
							<MenuItem value={true} sx={{ justifyContent: "flex-end" }}>
								مرد
							</MenuItem>
							<MenuItem value={false} sx={{ justifyContent: "flex-end" }}>
								زن
							</MenuItem>
						</Select>
					</FormControl>
				</div>
				<div className="profileInputContainer">
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="شماره موبایل"
						type="tel"
						fullWidth
						variant="outlined"
					/>
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="ایمیل"
						type="email"
						fullWidth
						variant="outlined"
					/>
				</div>
				<div className="profileInputContainer">
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="تاریخ تولد"
						type="date"
						fullWidth
						variant="outlined"
						InputLabelProps={{ shrink: true }}
					/>
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="کد پستی"
						type="number"
						fullWidth
						variant="outlined"
					/>
				</div>
				<div className="profileInputContainer">
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="آدرس"
						type="text"
						fullWidth
						variant="outlined"
					/>
				</div>
				{/* <DatePicker
					disableFuture
					label="Responsive"
					openTo="year"
					views={["year", "month", "day"]}
					value={value}
					onChange={(newValue) => {
						setValue(newValue);
					}}
					renderInput={(params) => <TextField {...params} />}
				/> */}
			</div>
			<div className="secondaryPanelTitle">اطلاعات تحصیلی</div>
			<div className="profileFieldContainer">
				<div className="profileInputContainer">
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="نام آخرین مدرک تحصیلی"
						type="text"
						fullWidth
						variant="outlined"
					/>
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="آخرین محل تحصیل"
						type="text"
						fullWidth
						variant="outlined"
					/>
				</div>
			</div>
			<div className="secondaryPanelTitle">اطلاعات شغلی</div>
			<div className="profileFieldContainer">
				<div className="profileInputContainer">
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="آخرین سمت شغلی"
						type="text"
						fullWidth
						variant="outlined"
					/>
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="آخرین محل کار"
						type="text"
						fullWidth
						variant="outlined"
					/>
				</div>
			</div>
			<div className="secondaryPanelTitle">تغییر گذرواژه</div>
			<div className="profileFieldContainer">
				<div className="profileInputContainer">
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="گذرواژه قدیمی"
						type="password"
						fullWidth
						variant="outlined"
					/>
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="گذرواژه جدید"
						type="password"
						fullWidth
						variant="outlined"
					/>
				</div>
				<div className="profileInputContainer">
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="تکرار گذرواژه جدید"
						type="password"
						fullWidth
						variant="outlined"
					/>
				</div>
			</div>
			<div className="secondaryPanelTitle">تنظیمات</div>
			<div className="profileFieldContainer">
				<div className="profileInputContainer">
					<TextField
						className="profileInput"
						autoFocus
						margin="dense"
						label="کد رنگی"
						type="color"
						fullWidth
						variant="outlined"
						InputLabelProps={{ shrink: true }}
					/>
				</div>
			</div>
		</div>
	);
}
