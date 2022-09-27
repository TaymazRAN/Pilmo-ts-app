import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, deletePost } from "./categorySlice";
import { fetchCategory } from "./categorySlice";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
// import { selectAllPosts, deletePost } from "./categorySlice";
// import { fetchCategory } from "./categorySlice";
import Loading from "../../../../component/loading/Loading";
import LoadingData from "../../../../component/loadingData/LoadingData";
import AlertDelete from "../../../../component/alertDelete/AlertDelete";

export default function CategoryTable() {
  const data = useSelector((state) => selectAllPosts(state));

  const dispatch = useDispatch();
	const navigate = useNavigate();

	React.useEffect(() => {
		dispatch(fetchCategory());
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
  
  const categoryColumns = [
		{
			field: "name",
			headerName: "نام دسته بندی",
			flex: 1,
		},
		{
			field: "description",
			headerName: "توضیحات",
			flex: 1,
		},
		{
			field: "action",
			headerName: "امکانات",
			flex: 1,
			minWidth: 200,
			renderCell: (cellValues) => {
				return (
					<div className="dataGridCell">
						<Button
							className="gridButton"
							onClick={(event) =>
								navigate(`/admin/categoryEdit/${cellValues.id}`)
							}
						>
							<EditOutlinedIcon className="gridIcon" />
							ویرایش
						</Button>
						<AlertDelete
							title="دسته بندی"
							clickFunction={(event) => reduxDelete(cellValues.id)}
						/>
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
          onClick={(event) => navigate("/admin/categoryAdd")}
        >
          اضافه کردن <AddIcon className="topButtonIcon" />
        </Button>
      </div>
      <div style={{ height: 500, width: "100%" }}>
        {!data ? (
          <Loading />
        ) : (
          <>
            {data.length > 0 ? (
              <DataGrid
                rows={data}
                columns={categoryColumns}
                pageSize={7}
                rowsPerPageOptions={[7]}
                checkboxSelection
                disableSelectionOnClick
              />
            ) : (
              <LoadingData />
            )}
          </>
        )}
      </div>
    </div>
  );
}
