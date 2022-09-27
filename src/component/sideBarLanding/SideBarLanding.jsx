import "../sideBarAdmin/sideBarAdmin.css";
import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
// import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
// import QuizIcon from "@mui/icons-material/Quiz";
// import BiotechIcon from "@mui/icons-material/Biotech";
import { NavLink } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function SideBarLanding() {
	const [expanded, setExpanded] = React.useState(false);

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
						<div className="sideBarTitle bold"> داشبورد لندینگ</div>
					</AccordionSummary>
					<AccordionDetails>
						<ul className="sideBarList">
							<NavLink
								to="/manager"
								activeclassname="active"
								className="sideBarListItem"
							>
								<PersonOutlineIcon className="sideBarIcon" />
								مدیریت پروفایل
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
