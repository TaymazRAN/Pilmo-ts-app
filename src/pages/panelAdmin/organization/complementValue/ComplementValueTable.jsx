import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, deletePost } from "./complementValueSlice";
// import PostsExcerpt from "./PostsExcerpt";
import { DataGrid, GridAddIcon } from "@mui/x-data-grid";
import LoadingData from "../../../../component/loadingData/LoadingData";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AlertDelete from "../../../../component/alertDelete/AlertDelete";
import { fetchComplementValue } from "./complementValueSlice";
import { selectAllPosts as selectAllComplementTypes } from "../complementType/complementTypeSlice";
import { fetchComplementType } from "../complementType/complementTypeSlice";
import { selectAllPosts as selectAllOrganizations } from "../organizationTabel/organizationSlice";
import { fetchOrganization } from "../organizationTabel/organizationSlice";
import react from "react";

const ComplementValueTable = () => {
  const dataComplementValue = useSelector((state) => selectAllPosts(state));
  const dataComplementType = useSelector((state) =>
    selectAllComplementTypes(state)
  );
  const dataOrganization = useSelector((state) =>
    selectAllOrganizations(state)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  react.useEffect(() => {
    dispatch(fetchComplementValue());
    dispatch(fetchComplementType());
    dispatch(fetchOrganization());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const typeDelete = (id) => {
    try {
      dispatch(deletePost({ id: id })).unwrap();
    } catch (err) {
      console.error("Failed to delete the post: ", err);
    }
  };

  const organizationColumns = [
    // {
    //   field: "organizationId",
    //   headerName: "نام سازمان",
    //   flex: 1,
    // },

    {
      field: "organizationId",
      headerName: "نام سازمان",
      flex: 1,
      renderCell: (parameters) => {
        return (
          <div className="dataGridCell">
            {
              dataOrganization.find(
                (item) => item.id === parameters.row.organizationId
              ).name
            }
          </div>
        );
      },
    },
    {
      field: "organizationComplementryInfoFieldId",
      headerName: "نام فیلد تکمیلی",
      flex: 1,
      renderCell: (parameters) => {
        return (
          <div className="dataGridCell">
            {
              dataComplementType.find(
                (item) =>
                  item.id === parameters.row.organizationComplementryInfoFieldId
              ).name
            }
          </div>
        );
      },
    },
    {
      field: "content",
      headerName: "ورودی تکمیلی",
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
              onClick={(event) =>
                navigate(`/admin/complementValueEdit/${cellValues.id}`)
              }
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
          onClick={(event) => navigate(`/admin/complementValueAdd`)}
        >
          ورودی های تکمیلی <GridAddIcon className="topButtonIcon" />
        </Button>
      </div>

      <div style={{ height: 250, width: "100%" }}>
        <>
          {dataComplementValue.length > 0 ? (
            <DataGrid
              rows={dataComplementValue}
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

export default ComplementValueTable;
