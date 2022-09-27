import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, deletePost } from "./packageSlice";
// import PostsExcerpt from "./PostsExcerpt";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { fetchPackage } from "./packageSlice";
import {
	selectAllPosts as selectAllStorePackages,
	fetchStorePackage,
} from "../storePackage/storePackageSlice";
import react from "react";
import LoadingData from "../../../../component/loadingData/LoadingData";
import AlertDelete from "../../../../component/alertDelete/AlertDelete";

const PackageTable = () => {
  const data = useSelector((state) => selectAllPosts(state));
  const dataStorePackage = useSelector((state) =>
		selectAllStorePackages(state)
	);
  console.log("data");
  console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  react.useEffect(() => {
    dispatch(fetchPackage());
    dispatch(fetchStorePackage());
    // }, [data]);
  }, []);

  const typeDelete = (id) => {
    try {
      dispatch(deletePost({ id: id })).unwrap();
    } catch (err) {
      console.error("Failed to delete the post: ", err);
    }
  };

  const packageColumns = [
		{
			field: "storePackageId",
			headerName: "بسته",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{
							dataStorePackage.find(
								(item) => item.id === parameters.row.storePackageId
							)?.name
						}
					</div>
				);
			},
		},
		{
			field: "organizationPackageId",
			headerName: "سازمان",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{parameters.row.organizationPackageId === "00000000-0000-0000-0000-000000000000" ? "خرید شخصی" : parameters.row.organizationPackageId}
					</div>
				);
			},
		},
		{
			field: "username",
			headerName: "کاربر",
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
							title="اجرا"
							clickFunction={(event) => typeDelete(cellValues.id)}
						/>
					</div>
				);
			},
		},
	];

  return (
    <div dir="tl" className="dataGrid">
      <div style={{ height: 500, width: "100%" }}>
        <>
          {data.length > 0 ? (
            <DataGrid
              rows={data}
              columns={packageColumns}
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

export default PackageTable;
