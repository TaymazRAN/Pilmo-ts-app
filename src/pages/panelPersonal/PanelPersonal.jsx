import "../panelAdmin/panel.css";
import "../panelAdmin/table.css";
import { Routes, Route } from "react-router-dom";
import MenuTopPersonal from "../../component/menuTopPersonal/MenuTopPersonal";
import SideBarPersonal from "../../component/sideBarPersonal/SideBarPersonal";
import Profile from "./profile/Profile";
import Report from "./report/Report";
import Message from "./message/Message";
import Quiz from "./quiz/Quiz";
import Exercise from "./exercise/Exercise";
import Dashboard from "./dashboard/Dashboard";
import NotFoundPanel from "../error/NotFoundPanel";
import AccessDeny from "../../component/accessDeny/AccessDeny";

export default function PanelPersonal() {
  const user = JSON.parse(localStorage.getItem("username"));
  return (
    <>
      {user ? (
        <>
          {" "}
          <MenuTopPersonal />
          <div className="panel">
            <div className="sidebar panelBox">
              <SideBarPersonal />
            </div>
            <div className="page panelBox">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/report" element={<Report />} />
                <Route path="/message" element={<Message />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/exercise" element={<Exercise />} />
                <Route path="*" element={<NotFoundPanel />} />
              </Routes>
            </div>
          </div>{" "}
        </>
      ) : (
        <AccessDeny />
      )}
    </>
  );
}
