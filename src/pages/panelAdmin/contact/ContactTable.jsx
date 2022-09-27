import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { contactRows } from "../../../Data/Contact";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import { useNavigate } from "react-router-dom";

export default function ContactTable() {
	const navigate = useNavigate();
	const [openDelete, setOpenDelete] = React.useState(false);

	const handleClickDeleteOpen = () => {
		setOpenDelete(true);
	};

	const handleDeleteClose = () => {
		setOpenDelete(false);
	};

	const contactColumns = [
		{
			field: "id",
			headerName: "شناسه",
			maxWidth: 70,
			flex: 1,
		},
		{
			field: "firstName",
			headerName: "نام",
			flex: 1,
		},
		{
			field: "lastName",
			headerName: "نام خانوادگی",
			flex: 1,
		},
		{
			field: "number",
			headerName: "شماره تماس",
			flex: 1,
		},
		{
			field: "email",
			headerName: "ایمیل",
			flex: 1,
		},
		{
			field: "province",
			headerName: "استان",
			flex: 1,
		},
		{
			field: "city",
			headerName: "شهر",
			flex: 1,
		},
		{
			field: "message",
			headerName: "پیام",
			flex: 1,
		},
		{
			field: "action",
			headerName: "امکانات",
			minWidth: 200,
			flex: 1,
			renderCell: () => {
				return (
					<div className="dataGridCell">
						<Button
							className="gridButton"
							onClick={(event) => navigate("/admin/contactShow")}
							color="success"
						>
							<VisibilityOutlinedIcon className="gridIcon" />
							جزئیات
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
			<div style={{ height: 500, width: "100%" }}>
				<DataGrid
					rows={contactRows}
					columns={contactColumns}
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
					<DialogTitle>پاک کردن تماس</DialogTitle>

					<DialogContentText sx={{ padding: "0 25px" }}>
						آیا از پاک کردن این تماس مطمئن هستید؟
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
