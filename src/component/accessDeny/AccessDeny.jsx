import React from "react";
import img from "../../assets/image/png/access_den.png";

const AccessDeny = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {" "}
      <img src={img} alt="access DEny" />
    </div>
  );
};

export default AccessDeny;
