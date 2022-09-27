import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import { selectAllPosts, deletePost } from "./complementTypeSlice";
import { fetchComplementType } from "./complementTypeSlice";
import { selectAllPosts as selectAllTypes } from "../type/postsSlice";
import { fetchPosts as fetchTypes } from "../type/postsSlice";
import Loading from "../../../../component/loading/Loading";
import LoadingData from "../../../../component/loadingData/LoadingData";
import { useNavigate } from "react-router-dom";
import AlertDelete from "../../../../component/alertDelete/AlertDelete";

export default function ComplementTypeTable() {
  const navigate = useNavigate();

  const dataComplementType = useSelector((state) => selectAllPosts(state));
  const dataType = useSelector((state) => selectAllTypes(state));
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(fetchComplementType());
    dispatch(fetchTypes());
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //UseEffect Call api
  const [loading, setLoading] = useState(false);
  // const [listdata, setListdata] = useState([]);
  // const [listOrgType, setListOrgType] = useState([]);

  const reduxDelete = (id) => {
    try {
      dispatch(deletePost({ id: id })).unwrap();
    } catch (err) {
      console.error("Failed to delete the post: ", err);
    }
  };

  // "id": 0,
  // "name": "Test field 1",
  // "type": 1,
  // "isRequired": true,
  // "organizationTypeId": 1
  const complementTypeColumns = [
    {
      field: "name",
      headerName: "نام فیلد تکمیلی",
      flex: 1,
    },
    {
      field: "organizationTypeId",
      headerName: "نوع سازمان",
      flex: 1,
      renderCell: (parameters) => {
        return (
          <div className="dataGridCell">
            {
              dataType.find(
                (item) => item.id === parameters.row.organizationCategoryId
              )?.title
            }
          </div>
        );
      },
    },
    // {
    //   field: "organizationTypeId",
    //   headerName: "نوع  سازمان  ",
    //   flex: 1,
    //   renderCell: (parameters) => {
    //     console.log("parametersOrgan-----------------------------");
    //     console.log(parameters);
    //     return (
    //       <div className="dataGridCell">
    //         {listOrgType.find((item) => item.id === parameters.row.id).title}
    //       </div>
    //     );
    //   },
    // },
    {
      field: "isRequired",
      headerName: "فیلد اجباری",
      flex: 1,
      renderCell: (parameters) => {
        return (
          <div className="dataGridCell">
            {parameters.row.isRequired && "بله"}
            {!parameters.row.isRequired && "خیر"}
          </div>
        );
      },
    },
    {
      field: "type",
      headerName: "نوع فیلد",
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
                navigate(`/admin/complementTypeEdit/${cellValues.id}`)
              }
              color="info"
            >
              <EditOutlinedIcon className="gridIcon" />
              ویرایش
            </Button>
            <AlertDelete
              title="ویژگی سازمان"
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
          sx={{ padding: "14px 15px" }}
          onClick={(event) => navigate("/admin/complementTypeAdd")}
        >
          فیلدهای تکمیلی <AddIcon className="topButtonIcon" />
        </Button>

        {/* <Autocomplete
          disablePortal
          id="type"
          options={dataType.map((item) => {
            return { ...item, label: item.title };
          })}
          sx={{ width: 300, marginLeft: "15px", marginRight: "0" }}
          renderInput={(params) => <TextField {...params} label="نوع سازمان" />}
        /> */}
      </div>
      <div style={{ height: 250, width: "100%" }}>
        {loading || !dataComplementType ? (
          <Loading />
        ) : (
          <>
            {dataComplementType.length > 0 ? (
              <DataGrid
                rows={dataComplementType}
                columns={complementTypeColumns}
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
        )}
      </div>
    </div>
  );
}
