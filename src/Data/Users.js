import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export const userColumns = [
	{
		field: "nationalId",
		headerName: "شناسه",
		maxWidth: 70,
		flex: 1,
	},
	{
		field: "username",
		headerName: "نام کاربری",
		flex: 1,
	},
	{
		field: "firstName",
		headerName: "نام",
		flex: 1,
	},
	{
		field: "lastName",
		headerName: "نام خانوادگی",
		flex: 1,
	},
	{
		field: "contactNum",
		headerName: "شماره تماس",
		flex: 1,
	},
	{
		field: "email",
		headerName: "ایمیل",
		flex: 1,
	},
	{
		field: "currentOccupation",
		headerName: "شغل",
		flex: 1,
	},
	{
		field: "gender",
		headerName: "جنسیت",
		flex: 1,
		renderCell: (parameters) => {
			return (
				<div className="dataGridCell">
					{parameters.row.gender ? "مرد" : "زن"}
				</div>
			);
		},
	},
	{
		field: "action",
		headerName: "امکانات",
		flex: 1,
		minWidth: 200,
		renderCell: () => {
			return (
				<div className="dataGridCell">
					<Button className="gridButton">
						<EditOutlinedIcon className="gridIcon" />
						ویرایش
					</Button>
					<Button className="gridButton">
						<DeleteOutlineIcon className="gridIcon" />
						حذف
					</Button>
				</div>
			);
		},
	},
];

export const userRows = [
  {
    id: 1,
    username: "Hraeisi",
    password: "string",
    firstName: "حسام",
    lastName: "رئیسی",
    nationalId: "1",
    contactNum: "+98-5016181031",
    email: "Hraeisi@example.com",
    currentOccupation: "مربی ورزشی",
    gender: true,
  },
  {
    id: 2,
    username: "Fradish",
    password: "string",
    firstName: "فرید",
    lastName: "رادیش",
    nationalId: "2",
    contactNum: "+98-1319782014",
    email: "Fradish@example.com",
    currentOccupation: "کارمند",
    gender: true,
  },
  {
    id: 3,
    username: "Earabnia",
    password: "string",
    firstName: "احسان",
    lastName: "عرب نیا",
    nationalId: "3",
    contactNum: "+98-1265284464",
    email: "Earabnia@example.com",
    currentOccupation: "منشی",
    gender: true,
  },
  {
    id: 4,
    username: "Msaharkhiz",
    password: "string",
    firstName: "مهدی",
    lastName: "سحرخیز",
    nationalId: "4",
    contactNum: "+98-1458903797",
    email: "Msaharkhiz@example.com",
    currentOccupation: "پرستار",
    gender: true,
  },
  {
    id: 5,
    username: "Marjmand",
    password: "string",
    firstName: "ملیحه",
    lastName: "ارجمند",
    nationalId: "5",
    contactNum: "+98-5850940862",
    email: "Marjmand@example.com",
    currentOccupation: "پزشک",
    gender: true,
  },
  {
    id: 6,
    username: "Klotfi",
    password: "string",
    firstName: "خاتون",
    lastName: "لطفی",
    nationalId: "6",
    contactNum: "+98-2975974619",
    email: "Klotfi@example.com",
    currentOccupation: "روانشناس",
    gender: true,
  },
  {
    id: 7,
    username: "Nbaghayi",
    password: "string",
    firstName: "نسیم",
    lastName: "بقایی",
    nationalId: "7",
    contactNum: "+98-6846757940",
    email: "Nbaghayi@example.com",
    currentOccupation: "مدیر",
    gender: true,
  },
  {
    id: 8,
    username: "Bgolzar",
    password: "string",
    firstName: "بهزاد",
    lastName: "گلزار",
    nationalId: "8",
    contactNum: "+98-6412827604",
    email: "Bgolzar@example.com",
    currentOccupation: "طراح",
    gender: true,
  },
  {
    id: 9,
    username: "Kmehrnia",
    password: "string",
    firstName: "کریم",
    lastName: "مهرنیا",
    nationalId: "9",
    contactNum: "+98-6888191462",
    email: "Kmehrnia@example.com",
    currentOccupation: "خیاط",
    gender: true,
  },
  {
    id: 10,
    username: "Jhashempoor",
    password: "string",
    firstName: "جعفر",
    lastName: "هاشم پور",
    nationalId: "10",
    contactNum: "+98-8846637671",
    email: "Jhashempoor@example.com",
    currentOccupation: "نویسنده",
    gender: true,
  },
];
