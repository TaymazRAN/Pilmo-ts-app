import "./menuTopAdmin.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { logoutAdmin } from "../../pages/panelAdmin/loginForm/admin/adminSlice";

export default function MenuTopAdmin() {
  const user = JSON.parse(localStorage.getItem("adminname"));
  console.log(user);
  // console.log(getCurrentUser);
  return (
		<div className="topBar">
			<div className="topBarWrapper">
				<div className="topLeft">
					<span className="logoAdmin"></span>
				</div>
				<div className="topRight">
					<div className="topBarIconContainer">
						<NotificationsNoneIcon />
						<span className="iconBadge mediumText">2</span>
					</div>
					<div className="topBarIconContainer">
						<LanguageIcon />
						<span className="iconBadge mediumText">2</span>
					</div>
					<div className="topBarIconContainer">
						<SettingsIcon />
					</div>
					<div className="profileNameTag">
						<NavLink to="/login" onClick={logoutAdmin}>
							<IconButton sx={{ marginLeft: "10px" }} size="medium" color="error">
								<LogoutIcon sx={{ fontSize: "24px" }} />
							</IconButton>
						</NavLink>
						{user}
					</div>
					<div className="avatarPicture"></div>
				</div>
			</div>
		</div>
	);
}
