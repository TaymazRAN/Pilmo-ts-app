import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, deletePost } from "./postsSlice";
// import PostsExcerpt from "./PostsExcerpt";
import { DataGrid, GridAddIcon } from "@mui/x-data-grid";
import LoadingData from "../../../../component/loadingData/LoadingData";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AlertDelete from "../../../../component/alertDelete/AlertDelete";
import { fetchPosts } from "./postsSlice";
import react from "react";

const TypeTable = () => {
  const data = useSelector((state) => selectAllPosts(state));
  console.log("data");
  console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  react.useEffect(() => {
    dispatch(fetchPosts());
  }, [data]);
  // }, []);

  const typeDelete = (id) => {
    try {
      dispatch(deletePost({ id: id })).unwrap();
    } catch (err) {
      console.error("Failed to delete the post: ", err);
    }
  };

  const columns = [
    {
      field: "title",
      headerName: "نام  ",
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
              title="نوع سازمان"
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
          نوع سازمان ها <GridAddIcon className="topButtonIcon" />
        </Button>
      </div>

      <div style={{ height: 250, width: "100%" }}>
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

export default TypeTable;
