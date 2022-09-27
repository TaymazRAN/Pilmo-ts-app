import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, deletePost } from "./storePackageSlice";
// import PostsExcerpt from "./PostsExcerpt";
import { DataGrid, GridAddIcon } from "@mui/x-data-grid";
import LoadingData from "../../../../component/loadingData/LoadingData";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AlertDelete from "../../../../component/alertDelete/AlertDelete";
import { fetchStorePackage } from "./storePackageSlice";
import { selectAllPosts as selectAllCategories } from "../category/categorySlice";
import { fetchCategory } from "../category/categorySlice";
import react from "react";
import Loading from "../../../../component/loading/Loading";
import purifyPrice from "../../../../services/purifyPrice";
import purifyDate from "../../../../services/purifyDate";

const StorePackageTable = () => {
  const data = useSelector((state) => selectAllPosts(state));
  const dataCategory = useSelector((state) => selectAllCategories(state));
  console.log(data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  react.useEffect(() => {
    dispatch(fetchStorePackage());
    dispatch(fetchCategory());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
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
			field: "name",
			headerName: "نام بسته",
			flex: 1,
		},
		{
			field: "categoryId",
			headerName: "دسته بندی",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{
							dataCategory.find((item) => item.id === parameters.row.categoryId)
								?.name
						}
					</div>
				);
			},
		},
		{
			field: "price",
			headerName: "قیمت",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{purifyPrice(parameters.row.price) + " تومان"}
					</div>
				);
			},
		},
		{
			field: "packageDiscountValue",
			headerName: "تخفیف",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{purifyPrice(parameters.row.packageDiscountValue) + " تومان"}
					</div>
				);
			},
		},
		{
			field: "type",
			headerName: "نوع بسته",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{parameters.row.type === "Measurment" && "ارزیابی"}
						{parameters.row.type === "Disorder" && "ناهنجاری"}
					</div>
				);
			},
		},
		{
			field: "dateCreated",
			headerName: "تاریخ ساخت",
			flex: 1,
			renderCell: (parameters) => {
				return (
					<div className="dataGridCell">
						{purifyDate(parameters.row.dateCreated)}
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
							color="info"
							onClick={(event) =>
								navigate(`/admin/storePackageEdit/${cellValues.id}`)
							}
						>
							<EditOutlinedIcon className="gridIcon" />
							ویرایش
						</Button>
						<AlertDelete
							title="بسته"
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
					onClick={(event) => navigate(`/admin/storePackageAdd`)}
				>
					اضافه کردن <GridAddIcon className="topButtonIcon" />
				</Button>
			</div>

			<div style={{ height: 500, width: "100%" }}>
				<>
					{!data ? (
						<Loading />
					) : (
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
					)}
				</>
			</div>
		</div>
	);
};

export default StorePackageTable;
