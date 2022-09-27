import "./quiz.css";
import IconButton from "@mui/material/IconButton";
import PlayArrowTwoToneIcon from "@mui/icons-material/PlayArrowTwoTone";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
    borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === "light" ? "#ffffff" : 800],
	},
    [`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
	},
}));

function LinearProgressWithLabel(props) {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ minWidth: 35 }}>
				<Typography variant="body2" color="text.secondary">{`${Math.round(
					props.value
				)}%`}</Typography>
			</Box>
			<Box sx={{ width: "100%", ml: 1 }}>
				<BorderLinearProgress variant="determinate" {...props} />
			</Box>
		</Box>
	);
}

LinearProgressWithLabel.propTypes = {
	/**
	 * The value of the progress indicator for the determinate and buffer variants.
	 * Value between 0 and 100.
	 */
	value: PropTypes.number.isRequired,
};

export default function Quiz() {
	return (
		<div className="downloadQuiz">
			<div className="downloadConatiner">
				<div className="downloadName">بسته آزمون عمومی</div>
				<div className="downloadProgress">
					<LinearProgressWithLabel value={100} />
				</div>
				<div className="downloadButton">
					<IconButton
						variant="contained"
						color="success"
						size="large"
						sx={{ backgroundColor: "#dddddd" }}
					>
						<PlayArrowTwoToneIcon fontSize="Inherit" />
					</IconButton>
				</div>
			</div>
			<div className="downloadConatiner">
				<div className="downloadName">بسته آزمون اضطراب</div>
				<div className="downloadProgress">
					<LinearProgressWithLabel value={60} />
				</div>
				<div className="downloadButton">
					<IconButton
						variant="contained"
						color="success"
						size="large"
						sx={{ backgroundColor: "#dddddd" }}
					>
						<PlayArrowTwoToneIcon fontSize="Inherit" />
					</IconButton>
				</div>
			</div>
		</div>
	);
}
