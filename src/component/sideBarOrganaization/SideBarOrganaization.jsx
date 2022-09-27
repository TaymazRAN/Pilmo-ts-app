import "../sideBarAdmin/sideBarAdmin.css";
import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { NavLink } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BusinessIcon from "@mui/icons-material/Business";
import HailIcon from "@mui/icons-material/Hail";
import InputIcon from "@mui/icons-material/Input";
import PanToolIcon from "@mui/icons-material/PanTool";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export default function SideBarOrganaization() {
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
            <div className="sideBarTitle bold"> داشبورد سازمانی</div>
          </AccordionSummary>
          <AccordionDetails>
            <ul className="sideBarList">
              <NavLink
                to="/organization/"
                activeclassname="active"
                className="sideBarListItem"
              >
                <HomeRoundedIcon className="sideBarIcon" />
                داشبورد
              </NavLink>
              <NavLink
                to="/structure"
                activeclassname="active"
                className="sideBarListItem"
                target="_blank"
              >
                <AccountTreeRoundedIcon className="sideBarIcon" />
                ساختار سازمانی
              </NavLink>
              <NavLink
                to="/organization/organizationEdit"
                activeclassname="active"
                className="sideBarListItem"
              >
                <PersonOutlineIcon className="sideBarIcon" />
                مدیریت پروفایل
              </NavLink>
              <NavLink
                to="/organization/manager"
                activeclassname="active"
                className="sideBarListItem"
              >
                <ManageAccountsIcon className="sideBarIcon" />
                مدیر ها
              </NavLink>

              <NavLink
                to="/organization/employee"
                activeclassname="active"
                className="sideBarListItem"
              >
                <HailIcon className="sideBarIcon" />
                کارمند ها
              </NavLink>
              <NavLink
                to="/organization/request"
                activeclassname="active"
                className="sideBarListItem"
              >
                <InputIcon className="sideBarIcon" />
                درخواست ها
              </NavLink>
              <NavLink
                to="/organization/access"
                activeclassname="active"
                className="sideBarListItem"
              >
                <PanToolIcon className="sideBarIcon" />
                دسترسی ها
              </NavLink>
            </ul>
          </AccordionDetails>
        </Accordion>
        {/* <Accordion
					className="accordionSide"
					expanded={expanded === "panel2"}
					onChange={handleChange("panel2")}
					sx={accordionStyle}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1bh-content"
						id="panel1bh-header"
					>
						<div className="sideBarTitle bold">گزارش ها</div>
					</AccordionSummary>
					<AccordionDetails>
						<ul className="sideBarList">
							<li className="sideBarListItem">
								<PanToolIcon className="sideBarIcon" />
								گزارش های افراد
							</li>
							<li className="sideBarListItem">
								<PanToolIcon className="sideBarIcon" />
								گزارش های دپارتمان
							</li>
							<li className="sideBarListItem">
								<PanToolIcon className="sideBarIcon" />
								گزارش های استخدام
							</li>
						</ul>
					</AccordionDetails>
				</Accordion> */}
      </div>
    </div>
  );
}

/*


            

            
            
            
*/
