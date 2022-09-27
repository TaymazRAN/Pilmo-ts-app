import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../alertDelete/alert.css";
import Button from "@mui/material/Button";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";

export default function AlertDeny(props) {
	const submit = () => {
		confirmAlert({
			title: `رد کردن درخواست`,
			message: `آیا از رد کردن این درخواست مطمئن هستید؟`,
			overlayClassName: "denyTestClass",
			buttons: [
				{
					label: "تایید",
					onClick: props.clickFunction,
				},
				{
					label: "انصراف",
				},
			],
		});
	};

	return (
		<>
			<Button className="gridButton" color="error" onClick={submit}>
				<HighlightOffRoundedIcon className="gridIcon" />
				رد
			</Button>
		</>
	);
}
