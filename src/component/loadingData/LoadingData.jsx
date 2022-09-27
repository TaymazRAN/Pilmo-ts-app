import * as React from "react";
// import ResponsiveImgMaterialUi from "responsive-img-material-ui";
import "./loadingData.css";

const LoadingData = () => {
  return (
    <div className="loadBody">
      <div
        style={{
          justifyContent: "center",

          color: "red",
        }}
      >
        <p> هیچ اطلاعاتی برای نمایش وجود ندارد .......</p>
      </div>

      {/* <ResponsiveImgMaterialUi xs={Spinner} md={Spinner} lg={Spinner} /> */}
    </div>
  );
};

export default LoadingData;
