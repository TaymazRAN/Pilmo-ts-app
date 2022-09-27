import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AlertDelete from "../../../../component/alertDelete/AlertDelete";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddIcon from "@mui/icons-material/Add";
import { selectAllPosts, deletePost } from "./organizationSlice";
import { fetchOrganization } from "./organizationSlice";
import { fetchPosts as fetchTypes } from "../type/postsSlice";
import LoadingData from "./../../../../component/loadingData/LoadingData";
import { Link, useNavigate } from "react-router-dom";
import purifyDate from "../../../../services/purifyDate";

export default function OrganizationTable() {
  const navigate = useNavigate();

  //UseEffect Call api
  const [loading, setLoading] = useState(false);
  const dataOrganization = useSelector((state) => selectAllPosts(state));
  console.log(dataOrganization);
  // const dataType = useSelector((state) => selectAllTypes(state));
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(fetchOrganization());
    dispatch(fetchTypes());
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reduxDelete = (id) => {
    try {
      dispatch(deletePost({ id: id })).unwrap();
    } catch (err) {
      console.error("Failed to delete the post: ", err);
    }
  };

  const organizationColumns = [
    {
      field: "name",
      headerName: "نام سازمان",
      flex: 1,
    },
    {
      field: "emailAddress",
      headerName: "ایمیل",
      flex: 1,
    },
    {
      field: "refCode",
      headerName: "کد ارجاع",
      flex: 1,
    },
    {
      field: "planExpDate",
      headerName: "تاریخ انقضا طرح",
      flex: 1,
      renderCell: (parameters) => {
        return (
          <div className="dataGridCell">
            {purifyDate(parameters.row.planExpDate)}
          </div>
        );
      },
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
              onClick={(event) =>
                navigate(`/admin/organizationEdit/${cellValues.id}`)
              }
              color="info"
            >
              <EditOutlinedIcon className="gridIcon" />
              ویرایش
            </Button>
            <Button
              className="gridButton"
              onClick={(event) =>
                navigate(`/admin/organizationShow/${cellValues.id}`)
              }
              color="success"
            >
              <VisibilityOutlinedIcon className="gridIcon" />
              جزئیات ..
            </Button>
            <AlertDelete
              title="سازمان"
              clickFunction={(event) => reduxDelete(cellValues.id)}
            />

            <Button
              className="gridButton"
              style={{
                backgroundColor: "Green",
                padding: "10px 35px",
                color: "white",
                borderRadius: "25px",
              }}
            >
              <Link
                style={{
                  color: "white",
                  borderRadius: "25px",
                }}
                target="_blank"
                to="/organization"
              >
                {/* Login system onClick   */}
                {JSON.parse(localStorage.getItem(cellValues.id))}
                پنل سازمان
              </Link>
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
          onClick={(event) => navigate("/admin/organizationAdd")}
        >
          تعریف سازمان جدید <AddIcon className="topButtonIcon" />
        </Button>
        {/* <Autocomplete
          disablePortal
          id="type"
          options={dataType.map((item) => {
            return { ...item, label: item.title };
          })}
          sx={{ width: 300, marginLeft: "15px", marginRight: "0" }}
          renderInput={(params) => <TextField {...params} label="نوع سازمان" />}
        />
        <Autocomplete
          disablePortal
          id="name"
          options={dataOrganization.map((item) => {
            return { ...item, label: item.name };
          })}
          sx={{ width: 300, marginLeft: "15px", marginRight: "0" }}
          renderInput={(params) => <TextField {...params} label="نام سازمان" />}
        /> */}
      </div>
      <div style={{ height: 500, width: "100%" }}>
        {loading ? (
          <loading />
        ) : (
          <>
            {dataOrganization.length > 0 ? (
              <DataGrid
                rows={dataOrganization}
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
        )}
      </div>
    </div>
  );
}
