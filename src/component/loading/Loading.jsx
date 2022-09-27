import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import "./loading.css";

const Loading = () => {
  return (
		<div className="loadBody">
			<CircularProgress />
		</div>
	);
};

export default Loading;
