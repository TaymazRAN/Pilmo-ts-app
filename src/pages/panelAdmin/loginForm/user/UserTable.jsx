import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, deletePost } from "./userSlice";
// import PostsExcerpt from "./PostsExcerpt";
import { DataGrid, GridAddIcon } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import AlertDelete from "../../../../component/alertDelete/AlertDelete";
import { fetchUser } from "./userSlice";
import react from "react";
import AlertDelete from "../../../../component/alertDelete/AlertDelete";
import LoadingData from "../../../../component/loadingData/LoadingData";

const UserTable = () => {
  const data = useSelector((state) => selectAllPosts(state));
  console.log("data");
  console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  react.useEffect(() => {
    dispatch(fetchUser());
    // }, [data]);
  }, []);

  const onDelete = (id) => {
    try {
      dispatch(deletePost({ id: id })).unwrap();
    } catch (err) {
      console.error("Failed to delete the post: ", err);
    }
  };

  // {
  //   "username": "TestAccount1",
  //   "firstName": "Test Name",
  //   "lastName": "Tet Last name",
  //   "nationalId": "0123456789",
  //   "email": "Test@email.com",
  //   "contactNum": "0982231241",
  //   "education": "Test Education",
  //   "educationPlace": "Test Education place",
  //   "postCode": "12342343",
  //   "lastOccupation": "Test Occupation",
  //   "lastPlaceOfOccupation": "Test Place of occupation",
  //   "currentOccupation": "Test Occupation",
  //   "imageId": "Test_Id",
  //   "gender": false,
  //   "manuscript": "Test Manuscript"
  // },

  const columns = [
		{
			field: "name",
			headerName: "نام",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{parameters.row.firstName + " " + parameters.row.lastName}
					</div>
				);
			},
		},
		{
			field: "username",
			headerName: "نام کاربری",
			flex: 1,
		},
		{
			field: "email",
			headerName: "ایمیل",
			flex: 1,
		},
		{
			field: "contactNum",
			headerName: "شماره تماس",
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
							onClick={(event) => navigate(`/admin/addUser/${cellValues.id}`)}
						>
							<EditOutlinedIcon className="gridIcon" />
							ویرایش
						</Button>
						<AlertDelete
							title=" USer  "
							clickFunction={(event) => onDelete(cellValues.id)}
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

export default UserTable;
