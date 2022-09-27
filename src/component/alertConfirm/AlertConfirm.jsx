import React from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../alertDelete/alert.css";
import TaskAltRoundedIcon from "@mui/icons-material/TaskAltRounded";
import Button from "@mui/material/Button";

export default function AlertConfirm(props) {
	const submit = () => {
		confirmAlert({
			title: `تایید کردن درخواست`,
			message: `آیا از تایید کردن این درخواست مطمئن هستید؟`,
			overlayClassName: "confirmTestClass",
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
			<Button className="gridButton" color="success" onClick={submit}>
				<TaskAltRoundedIcon className="gridIcon" />
				تایید
			</Button>
		</>
	);
}
