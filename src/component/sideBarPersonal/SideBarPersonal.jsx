import "../sideBarAdmin/sideBarAdmin.css";
import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import QuizIcon from "@mui/icons-material/Quiz";
import BiotechIcon from "@mui/icons-material/Biotech";
import { NavLink } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export default function SideBarPersonal() {
	const [expanded, setExpanded] = React.useState("panel1");

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const accordionStyle = {
		boxShadow: "0 2px 5px #dddddd",
		"&.MuiAccordion-root:before": {
			backgroundColor: "transparent",
		},
	};

	return (
		<div className="sideBar">
			<div className="sideBarWrapper">
				<Accordion
					className="accordionSide"
					expanded={expanded === "panel1"}
					onChange={handleChange("panel1")}
					sx={accordionStyle}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1bh-content"
						id="panel1bh-header"
					>
						<div className="sideBarTitle bold"> داشبورد فردی</div>
					</AccordionSummary>
					<AccordionDetails>
						<ul className="sideBarList">
							<NavLink
								to="/user/"
								activeclassname="active"
								className="sideBarListItem"
							>
								<HomeRoundedIcon className="sideBarIcon" />
								داشبورد
							</NavLink>
							<NavLink
								to="/user/profile"
								activeclassname="active"
								className="sideBarListItem"
							>
								<PersonOutlineIcon className="sideBarIcon" />
								مدیریت پروفایل
							</NavLink>
							<NavLink
								to="/user/report"
								activeclassname="active"
								className="sideBarListItem"
							>
								<AssessmentOutlinedIcon className="sideBarIcon" />
								کارنامه ها
							</NavLink>
							<NavLink
								to="/user/message"
								activeclassname="active"
								className="sideBarListItem"
							>
								<ForumOutlinedIcon className="sideBarIcon" />
								پیام ها
							</NavLink>
							<NavLink
								to="/user/quiz"
								activeclassname="active"
								className="sideBarListItem"
							>
								<BiotechIcon className="sideBarIcon" />
								آزمون ها
							</NavLink>
							<NavLink
								to="/user/exercise"
								activeclassname="active"
								className="sideBarListItem"
							>
								<QuizIcon className="sideBarIcon" />
								تمرین ها
							</NavLink>
						</ul>
					</AccordionDetails>
				</Accordion>
			</div>
		</div>
	);
}

/*


            

            
            
            
*/
