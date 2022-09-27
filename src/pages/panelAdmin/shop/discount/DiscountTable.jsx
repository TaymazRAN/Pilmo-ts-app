import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { discountRows } from "../../../../Data/Discount";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function DiscountTable() {
	const navigate = useNavigate();
	const [openDelete, setOpenDelete] = React.useState(false);

	const handleClickDeleteOpen = () => {
		setOpenDelete(true);
	};

	const handleDeleteClose = () => {
		setOpenDelete(false);
	};
	
	const discountColumns = [
		{
			field: "id",
			headerName: "شناسه",
			maxWidth: 70,
			flex: 1,
		},
		{
			field: "code",
			headerName: "کد تخفیف",
			flex: 1,
		},
		{
			field: "value",
			headerName: "مقدار",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{parameters.row.isPercentage ? (
							<>
								<div className="percentageContainer">
									<div
										style={{ width: parameters.row.value + "%" }}
										className="percentageProgress"
									></div>
									<div className="percentageText">
										{parameters.row.value + " %"}
									</div>
								</div>
							</>
						) : (
							parameters.row.value + " تومان "
						)}
					</div>
				);
			},
		},
		{
			field: "isActive",
			headerName: "فعال",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{parameters.row.isActive ? "بله" : "خیر"}
					</div>
				);
			},
		},
		{
			field: "startDate",
			headerName: "تاریخ شروع",
			flex: 1,
		},
		{
			field: "dueDate",
			headerName: "تاریخ انقضا",
			flex: 1,
		},
		{
			field: "isReusable",
			headerName: "نوع استفاده",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{parameters.row.isReusable ? "کلی" : "شخصی"}
					</div>
				);
			},
		},
		{
			field: "action",
			headerName: "امکانات",
			flex: 1,
			minWidth: 200,
			renderCell: () => {
				return (
					<div className="dataGridCell">
						<Button
							className="gridButton"
							onClick={(event) => navigate("/admin/discountEdit")}
							color="info"
						>
							<EditOutlinedIcon className="gridIcon" />
							ویرایش
						</Button>
						<Button
							className="gridButton"
							onClick={handleClickDeleteOpen}
							color="error"
						>
							<DeleteOutlineIcon className="gridIcon" />
							حذف
						</Button>
					</div>
				);
			},
		},
	];

	return (
		<div dir="rtl" className="dataGrid">
			<div className="topButtonContainer">
				<Button
					className="topButton"
					variant="outlined"
					color="success"
					sx={{ padding: "14px 15px" }}
					onClick={(event) => navigate("/admin/discountAdd")}
				>
					اضافه کردن <AddIcon className="topButtonIcon" />
				</Button>
			</div>
			<div style={{ height: 500, width: "100%" }}>
				<DataGrid
					rows={discountRows}
					columns={discountColumns}
					pageSize={7}
					rowsPerPageOptions={[7]}
					checkboxSelection
					disableSelectionOnClick
					sx={{ color: "#2C3333", fontSize: "13px" }}
				/>
				<Dialog
					dir="rtl"
					open={openDelete}
					onClose={handleDeleteClose}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>پاک کردن تخفیف</DialogTitle>

					<DialogContentText sx={{ padding: "0 25px" }}>
						آیا از پاک کردن این تخفیف مطمئن هستید؟
					</DialogContentText>

					<DialogActions>
						<Button
							variant="outlined"
							color="error"
							onClick={handleDeleteClose}
							sx={{ marginRight: "15px" }}
						>
							انصراف
						</Button>
						<Button
							variant="outlined"
							color="success"
							onClick={handleDeleteClose}
							sx={{ marginRight: "15px" }}
						>
							پاک کن
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		</div>
	);
}
