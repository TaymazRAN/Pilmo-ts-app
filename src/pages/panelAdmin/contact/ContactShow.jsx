import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { contactRows } from "../../../Data/Contact";
import "../../panelPersonal/profile/profile.css";

export default function ContactShow(props) {
	const navigate = useNavigate();

	return (
		<>
			<div className="mainPanelTitle bold">جزئیات تماس</div>
			<div className="secondaryPanelTitle">اطلاعات فرستنده</div>
			<div className="textBox">
				<div className="textBoxItem">نام: {contactRows[0].firstName}</div>
				<div className="textBoxItem">
					نام خانوادگی: {contactRows[0].lastName}
				</div>
				<div className="textBoxItem">شماره تماس: {contactRows[0].number}</div>
				<div className="textBoxItem">ایمیل: {contactRows[0].email}</div>
				<div className="textBoxItem">استان: {contactRows[0].province}</div>
				<div className="textBoxItem">شهر: {contactRows[0].city}</div>
			</div>
			<div className="secondaryPanelTitle">پیام</div>
			<div className="textBox">
				<div className="textBoxItem">{contactRows[0].message}</div>
			</div>
			<div className="profileInputContainer">
				<Button
					variant="outlined"
					component="label"
					margin="dense"
					color="error"
					onClick={(event) => navigate("/admin/contact")}
					id="logoFileName"
					sx={{ padding: "15px 0", marginTop: "4px" }}
					fullWidth
				>
					بازگشت
				</Button>
			</div>
		</>
	);
}
