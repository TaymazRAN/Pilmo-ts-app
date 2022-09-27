import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./organization/type/postsSlice";
import organizationSlice from "./organization/organizationTabel/organizationSlice";
import complementTypeSlice from "./organization/complementType/complementTypeSlice";
import complementValueSlice from "./organization/complementValue/complementValueSlice";
import InventorySlice from "./organization/inventory/InventorySlice";
import userSlice from "./loginForm/user/userSlice";
import packageSlice from "./package/package/packageSlice";
import categorySlice from "./package/category/categorySlice";
import functionSlice from "./package/functions/functionSlice";
import storePackageSlice from "./package/storePackage/storePackageSlice";
import adminSlice from "./loginForm/admin/adminSlice";
import packageReportSlice from "./packageReport/packageReportSlice";
const store = configureStore({
  reducer: {
    // counter: counterSlice,
    posts: postSlice,
    postsOrganization: organizationSlice,
    postsComplementType: complementTypeSlice,
    postsComplementValue: complementValueSlice, //complement-value
    postsUserInventory: InventorySlice, // InvenTory
    postsPackage: packageSlice, // Package
    postsUser: userSlice, // User
    postsCategory: categorySlice, // Category
    postsFunctions: functionSlice, // ّFunctions
    postsStorePackage: storePackageSlice, // ّStorePackage
    postsAdmin: adminSlice, // Admin
    postsPackageReport: packageReportSlice, // Admin
  },
});

export default store;
