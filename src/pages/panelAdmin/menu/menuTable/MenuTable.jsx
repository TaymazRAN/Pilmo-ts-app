import React, { useState } from "react";
// import { useNavigate, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { menuRows } from "../../../../Data/Menu";
import Editor from "../../../../component/editor/Editor";

// import {
// 	getAllcategory,
// getAllpackage,
// createCategory,
// deletePackage,
// } from "../../../../services/PackageService";
// import Loading from "../../../../component/loading/Loading";
// import LoadingData from "../../../../component/loadingData/LoadingData";

export default function MenuTable() {
	const [open, setOpen] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [openDelete, setOpenDelete] = useState(false);

	//UseEffect Call api
	// const [loading, setLoading] = useState(false);
	// const [contacts, setContacts] = useState([]);
	// const [filteredContacts, setFilteredContacts] = useState([]);
	// const [groups, setGroups] = useState([]);
	// const [contact, setContact] = useState({});
	// const [contactQuery, setContactQuery] = useState({ text: "" });
	// const navigate = useNavigate();

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		try {
	// 			setLoading(true);
	// 			const { data: contactsData } = await getAllcategory();
	// 			const { data: groupsData } = await getAllcategory();
	// 			setContacts(contactsData);
	// 			setFilteredContacts(contactsData);
	// 			setGroups(groupsData);
	// 			setLoading(false);
	// 		} catch (err) {
	// 			console.log(err.message);
	// 			setLoading(false);
	// 		}
	// 	};
	// 	fetchData();
	// }, []);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickDeleteOpen = () => {
		setOpenDelete(true);
	};

	const handleDeleteClose = () => {
		setOpenDelete(false);
	};

	const handleClickEditOpen = () => {
		setOpenEdit(true);
	};

	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const menuColumns = [
		{
			field: "id",
			headerName: "شناسه",
			maxWidth: 70,
			flex: 1,
		},
		{
			field: "name",
			headerName: "نام منو",
			flex: 1,
		},
		{
			field: "body",
			headerName: "بدنه",
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
							onClick={handleClickEditOpen}
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
					onClick={handleClickOpen}
				>
					اضافه کردن <AddIcon className="topButtonIcon" />
				</Button>
			</div>
			<div style={{ height: 500, width: "100%" }}>
				{/* {loading ? (
					<Loading />
				) : (
					<>
						{groups.length > 0 ? (
							<DataGrid
								rows={menuRows}
								columns={menuColumns}
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
				)} */}

				<DataGrid
					rows={menuRows}
					columns={menuColumns}
					pageSize={7}
					rowsPerPageOptions={[7]}
					checkboxSelection
					disableSelectionOnClick
					sx={{ color: "#2C3333", fontSize: "13px" }}
				/>

				<Dialog
					dir="rtl"
					open={open}
					onClose={handleClose}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>اضافه کردن منو</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="name"
							label="نام منو"
							type="text"
							fullWidth
							variant="outlined"
							sx={{ marginBottom: "12px" }}
						/>
						<Editor placeholder="some fun text" />
					</DialogContent>
					<DialogActions>
						<Button
							variant="outlined"
							color="error"
							onClick={handleClose}
							sx={{ marginRight: "15px" }}
						>
							انصراف
						</Button>
						<Button
							variant="outlined"
							color="success"
							onClick={handleClose}
							sx={{ marginRight: "15px" }}
						>
							اضافه کردن
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					dir="rtl"
					open={openEdit}
					onClose={handleCloseEdit}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>ویرایش منو</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							dir="rtl"
							margin="dense"
							id="name"
							label="نام منو"
							type="text"
							fullWidth
							variant="outlined"
							sx={{ marginBottom: "12px" }}
						/>
						<Editor />
					</DialogContent>
					<DialogActions>
						<Button
							variant="outlined"
							color="error"
							onClick={handleCloseEdit}
							sx={{ marginRight: "15px" }}
						>
							انصراف
						</Button>
						<Button
							variant="outlined"
							color="success"
							onClick={handleCloseEdit}
							sx={{ marginRight: "15px" }}
						>
							ویرایش
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					dir="rtl"
					open={openDelete}
					onClose={handleDeleteClose}
					fullWidth
					maxWidth="sm"
				>
					<DialogTitle>پاک کردن منو</DialogTitle>

					<DialogContentText sx={{ padding: "0 25px" }}>
						آیا از پاک کردن این منو مطمئن هستید؟
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
