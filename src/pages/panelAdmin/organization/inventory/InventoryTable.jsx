import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, deletePost } from "./InventorySlice";
// import PostsExcerpt from "./PostsExcerpt";
import { DataGrid, GridAddIcon } from "@mui/x-data-grid";
import LoadingData from "../../../../component/loadingData/LoadingData";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AlertDelete from "../../../../component/alertDelete/AlertDelete";
import { fetchUserInventory } from "./InventorySlice";
import react from "react";

const InventoryTable = () => {
  const data = useSelector((state) => selectAllPosts(state));
  console.log("data");
  console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  react.useEffect(() => {
    dispatch(fetchUserInventory());
    // }, [data]);
  }, []);

  const typeDelete = (id) => {
    try {
      dispatch(deletePost({ id: id })).unwrap();
    } catch (err) {
      console.error("Failed to delete the post: ", err);
    }
  };

  const organizationColumns = [
    {
      field: "id",
      headerName: "id  ",
      flex: 1,
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
              title=" ....  "
              clickFunction={(event) => typeDelete(cellValues.id)}
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
          onClick={(event) => navigate(`/admin/typeAdd`)}
        >
          اضافه کردن <GridAddIcon className="topButtonIcon" />
        </Button>
      </div>

      <div style={{ height: 500, width: "100%" }}>
        <>
          {data.length > 0 ? (
            <DataGrid
              rows={data}
              columns={organizationColumns}
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

export default InventoryTable;

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { DataGrid } from "@mui/x-data-grid";
// // import { inventoryRows } from "../../../../Data/Inventory";
// import { organizationRows } from "../../../../Data/Organization";
// import { packageRows } from "../../../../Data/Package";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import AddIcon from "@mui/icons-material/Add";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import Autocomplete from "@mui/material/Autocomplete";
// import { useNavigate } from "react-router-dom";
// import { selectAllPosts, deletePost } from "./InventorySlice";
// import { fetchUserInventory } from "./InventorySlice";
// import Loading from "./../../../../component/loading/Loading";
// import LoadingData from "./../../../../component/loadingData/LoadingData";
// import AlertDelete from "../../../../component/alertDelete/AlertDelete";

// let packageRowsAutoComplete = [];

// for (let i = 0; i < packageRows.length; i++) {
// 	packageRowsAutoComplete[i] = packageRows[i].name;
// }

// let organizationRowsAutoComplete = [];

// for (let i = 0; i < organizationRows.length; i++) {
// 	organizationRowsAutoComplete[i] = organizationRows[i].name;
// }

// export default function InventoryTable() {
// 	const navigate = useNavigate();
// 	//UseEffect Call api
// 	const [loading, setLoading] = useState(false);
// 	const dataInventory = useSelector((state) => selectAllPosts(state));
// 	console.log(dataInventory);

// 	const dispatch = useDispatch();
// 	useEffect(() => {
// 		setLoading(true);
// 		dispatch(fetchUserInventory());
// 		setLoading(false);
// 		// eslint-disable-next-line react-hooks/exhaustive-deps
// 	}, []);

// 	const reduxDelete = (id) => {
// 		try {
// 			dispatch(deletePost({ id: id })).unwrap();
// 		} catch (err) {
// 			console.error("Failed to delete the post: ", err);
// 		}
// 	};

// 	//   "id": 1,    جزییات  =======================
// 	//   "amount": 100,
// 	//   "originalAmount": 0,
// 	//   "package": {
// 	//     "id": 1,
// 	//     "name": "Test Package",
// 	//     "description": "Test Description",
// 	//     "fileName": "TestFile.zip",
// 	//     "isExcersise": false,
// 	//     "displayPiority": 0,
// 	//     "category": {
// 	//       "id": 1,
// 	//       "name": "Test category",
// 	//       "description": "Test Description",
// 	//       "imageId": "testId",
// 	//       "backgroundImageId": "backgroundTestId"
// 	//     },
// 	//     "packageDiscountValue": 0,
// 	//     "price": 10000,
// 	//     "imageId": "none"
// 	//   },
// 	//   "date": "0001-01-01T00:00:00"
// 	// },

// 	const inventoryColumns = [
// 		{
// 			field: "id",
// 			headerName: "شناسه",
// 			maxWidth: 70,
// 			flex: 1,
// 		},
// 		{
// 			field: "category",
// 			headerName: "دسته بندی",
// 			flex: 1,
// 			renderCell: (parameters) => {
// 				console.log("category");
// 				console.log(parameters);
// 				return (
// 					<div className="dataGridCell">
// 						{
// 							dataInventory.find((item) => item.id === parameters.row.id)
// 								.package.category.name
// 						}
// 					</div>
// 				);
// 			},
// 		},
// 		{
// 			field: "package",
// 			headerName: "بسته",
// 			flex: 1,
// 			renderCell: (parameters) => {
// 				console.log("package");
// 				console.log(parameters);
// 				return (
// 					<div className="dataGridCell">
// 						{
// 							dataInventory.find((item) => item.id === parameters.row.id)
// 								.package.name
// 						}
// 					</div>
// 				);
// 			},
// 		},
// 		{
// 			field: "amount",
// 			headerName: "مقدار",
// 			flex: 1,
// 		},
// 		{
// 			field: "action",
// 			headerName: "امکانات",
// 			flex: 1,
// 			minWidth: 200,
// 			renderCell: (cellValues) => {
// 				return (
// 					<div className="dataGridCell">
// 						<Button
// 							className="gridButton"
// 							onClick={(event) => navigate("/admin/inventoryEdit")}
// 							color="info"
// 						>
// 							<EditOutlinedIcon className="gridIcon" />
// 							ویرایش
// 						</Button>
// 						<AlertDelete
// 							title="اعتبار"
// 							clickFunction={(event) => reduxDelete(cellValues.id)}
// 						/>
// 					</div>
// 				);
// 			},
// 		},
// 	];

// 	return (
// 		<div dir="rtl" className="dataGrid">
// 			<div className="topButtonContainer">
// 				<Button
// 					className="topButton"
// 					variant="outlined"
// 					color="success"
// 					sx={{ padding: "14px 15px" }}
// 					onClick={(event) => navigate("/admin/inventoryAdd")}
// 				>
// 					اضافه کردن <AddIcon className="topButtonIcon" />
// 				</Button>
// 				<Autocomplete
// 					disablePortal
// 					id="organization"
// 					options={organizationRowsAutoComplete}
// 					sx={{ width: 300, marginLeft: "15px", marginRight: "0" }}
// 					renderInput={(params) => (
// 						<TextField {...params} label="جستجو بر اساس سازمان" />
// 					)}
// 				/>
// 			</div>
// 			<div style={{ height: 500, width: "100%" }}>
// 				{loading ? (
// 					<Loading />
// 				) : (
// 					<>
// 						{dataInventory.length > 0 ? (
// 							<DataGrid
// 								rows={dataInventory}
// 								columns={inventoryColumns}
// 								pageSize={7}
// 								rowsPerPageOptions={[7]}
// 								checkboxSelection
// 								disableSelectionOnClick
// 								sx={{ color: "#2C3333", fontSize: "13px" }}
// 							/>
// 						) : (
// 							<LoadingData />
// 						)}
// 					</>
// 				)}
// 			</div>
// 		</div>
// 	);
// }
