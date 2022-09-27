import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, deletePost } from "./functionSlice";
// import PostsExcerpt from "./PostsExcerpt";
import { DataGrid, GridAddIcon } from "@mui/x-data-grid";
import LoadingData from "../../../../component/loadingData/LoadingData";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AlertDelete from "../../../../component/alertDelete/AlertDelete";
import { fetchFunctions } from "./functionSlice";
import React from "react";
import purifyPrice from "../../../../services/purifyPrice";

const FunctionTable = () => {
	const data = useSelector((state) => selectAllPosts(state));
	console.log("data");
	console.log(data);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	React.useEffect(() => {
		dispatch(fetchFunctions());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// }, []);

	const reduxDelete = (id) => {
		try {
			dispatch(deletePost({ id: id })).unwrap();
		} catch (err) {
			console.error("Failed to delete the post: ", err);
		}
	};

	const columns = [
		{
			field: "name",
			headerName: "نام",
			flex: 1,
		},
		{
			field: "description",
			headerName: "توضیحات",
			flex: 1,
		},
		{
			field: "price",
			headerName: "قیمت",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{purifyPrice(parameters.row.price) + " تومان"}
					</div>
				);
			},
		},
		{
			field: "duration",
			headerName: "مدت زمان",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{parameters.row.duration + " دقیقه"}
					</div>
				);
			},
		},
		{
			field: "difficulty",
			headerName: "درجه سختی",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{parameters.row.difficulty === "Easy" && "آسان"}
						{parameters.row.difficulty === "Normal" && "معمولی"}
						{parameters.row.difficulty === "Hard" && "سخت"}
					</div>
				);
			},
		},
		{
			field: "action",
			headerName: "امکانات",
			flex: 1,
			minWidth: 330,
			renderCell: (cellValues) => {
				return (
					<div className="dataGridCell">
						<Button
							className="gridButton"
							color="info"
							onClick={(event) => navigate(`/admin/typeEdit/${cellValues.id}`)}
						>
							<EditOutlinedIcon className="gridIcon" />
							ویرایش
						</Button>
						<AlertDelete
							title="عملکرد"
							clickFunction={(event) => reduxDelete(cellValues.id)}
						/>
					</div>
				);
			},
		},
	];
	return (
		<div dir="tl" className="dataGrid">
			<div className="topButtonContainer">
				<Button
					className="topButton"
					variant="outlined"
					color="success"
					sx={{ padding: "14px 15px" }}
					onClick={(event) => navigate(`/admin/functionAdd`)}
				>
					اضافه کردن <GridAddIcon className="topButtonIcon" />
				</Button>
			</div>

			<div style={{ height: 500, width: "100%" }}>
				<>
					{data.length > 0 ? (
						<DataGrid
							rows={data}
							columns={columns}
							pageSize={7}
							rowsPerPageOptions={[7]}
							checkboxSelection
							disableSelectionOnClick
							sx={{ color: "#2C3333", fontSize: "13px" }}
						/>
					) : (
						<LoadingData />
					)}
				</>
			</div>
		</div>
	);
};

export default FunctionTable;
