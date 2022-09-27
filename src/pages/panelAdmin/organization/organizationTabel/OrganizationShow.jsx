import React from "react";
import Button from "@mui/material/Button";
import "../../../panelPersonal/profile/profile.css";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./organizationSlice";
import { selectPostById as selectType } from "../type/postsSlice";
import purifyDate from "../../../../services/purifyDate";
import Loading from "../../../../component/loading/Loading";

export default function OrganizationShow(props) {
	const { id } = useParams();
	const navigate = useNavigate();
	const post = useSelector((state) => selectPostById(state, id));
	const type = useSelector((state) =>
		selectType(state, post ? post.organizationCategoryId : "")
	);
	return (
		<>
			{post ? (
				<>
					<div className="mainPanelTitle bold">جزئیات سازمان</div>
					<div className="secondaryPanelTitle">اطلاعات کلی</div>
					<div className="textBox">
						<div className="textBoxItem">نام سازمان: {post.name}</div>
						<div className="textBoxItem">آدرس: {post.address}</div>
						<div className="textBoxItem">کد پستی: {post.postCode}</div>
						<div className="textBoxItem">شماره تماس: {post.contactNumber}</div>
						<div className="textBoxItem">ایمیل: {post.emailAddress}</div>
						<div className="textBoxItem">توضیحات: {post.description}</div>
						<div className="textBoxItem">اطلاعات: {post.customData}</div>
					</div>
					<div className="secondaryPanelTitle">اطلاعات طرح</div>
					<div className="textBox">
						<div className="textBoxItem">نام طرح: {post.plan}</div>
						<div className="textBoxItem">
							تاریخ انقضا طرح: {purifyDate(post.planExpDate)}
						</div>
					</div>
					<div className="secondaryPanelTitle">اطلاعات دیگر</div>
					<div className="textBox">
						<div className="textBoxItem">
							نوع سازمان:
							{type && type.title}
							{!type && " وارد نشده"}
						</div>
						<div className="textBoxItem">کد ارجاع: {post.refCode}</div>
						<div className="textBoxItem">لوگو: {post.logoFileName}</div>
					</div>
					<div className="profileInputContainer">
						<Button
							variant="outlined"
							component="label"
							margin="dense"
							color="error"
							onClick={(event) => navigate("/admin/organization")}
							id="logoFileName"
							sx={{ padding: "15px 0", marginTop: "4px" }}
							fullWidth
						>
							بازگشت
						</Button>
					</div>
				</>
			) : <Loading />}
		</>
	);
}
