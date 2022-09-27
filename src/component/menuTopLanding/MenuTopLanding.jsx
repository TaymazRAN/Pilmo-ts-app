import "../menuTopAdmin/menuTopAdmin.css";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import LanguageIcon from "@mui/icons-material/Language";
import SettingsIcon from "@mui/icons-material/Settings";
import { NavLink } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

export default function MenuTopLanding() {
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
					<NavLink to="/login">
						<IconButton sx={{ margin: "0 10px" }} size="large" color="error">
							<LogoutIcon sx={{ fontSize: "30px" }} />
						</IconButton>
					</NavLink>
					<div className="avatarPicture"></div>
				</div>
			</div>
		</div>
	);
}
