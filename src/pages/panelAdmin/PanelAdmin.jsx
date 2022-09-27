import "./panel.css";
import "./table.css";
import { Routes, Route } from "react-router-dom";
import UserTable from "./loginForm/user/UserTable";
import CategoryTable from "./package/category/CategoryTable";
import PackageTable from "./package/package/PackageTable";
import DiscountTable from "./shop/discount/DiscountTable";
import MenuTopAdmin from "../../component/menuTopAdmin/MenuTopAdmin";
import SideBarAdmin from "../../component/sideBarAdmin/SideBarAdmin";
import OrganizationTable from "./organization/organizationTabel/OrganizationTable";
import Dashboard from "./dashboard/Dashboard";
import NotFoundPanel from "../error/NotFoundPanel";
import ContactTable from "./contact/ContactTable";
import MenuTable from "./menu/menuTable/MenuTable";
import ComplementValueTable from "./organization/complementValue/ComplementValueTable";
import InventoryTable from "./organization/inventory/InventoryTable";
import TypeAdd from "./organization/type/TypeAdd";
import TypeTable from "./organization/type/TypeTable";
import TypeEdit from "./organization/type/TypeEdit";
import store from "./store";
import { Provider } from "react-redux";
import OrganizationAdd from "./organization/organizationTabel/OrganizationAdd";
import OrganizationEdit from "./organization/organizationTabel/OrganizationEdit";
import ComplementTypeTable from "./organization/complementType/ComplementTypeTable";
import ComplementTypeAdd from "./organization/complementType/ComplementTypeAdd";
import ComplementTypeEdit from "./organization/complementType/ComplementTypeEdit";
import ComplementValueAdd from "./organization/complementValue/ComplementValueAdd";
import ComplementValueEdit from "./organization/complementValue/ComplementValueEdit";
import InventoryAdd from "./organization/inventory/InventoryAdd";
import InventoryEdit from "./organization/inventory/InventoryEdit";
import ContactShow from "./contact/ContactShow";
import DiscountAdd from "./shop/discount/DiscountAdd";
import DiscountEdit from "./shop/discount/DiscountEdit";
import { fetchPosts } from "./organization/type/postsSlice";
import { fetchOrganization } from "./organization/organizationTabel/organizationSlice";
import CategoryAdd from "./package/category/CategoryAdd";
import CategoryEdit from "./package/category/CategoryEdit";
import { fetchComplementType } from "./organization/complementType/complementTypeSlice";
import { fetchComplementValue } from "./organization/complementValue/complementValueSlice";
import { fetchUserInventory } from "./organization/inventory/InventorySlice";
import { fetchPackage } from "./package/package/packageSlice";
import { fetchUser } from "./loginForm/user/userSlice";
import OrganizationShow from "./organization/organizationTabel/OrganizationShow";
import FunctionTable from "./package/functions/FunctionsTable";
import { fetchCategory } from "./package/category/categorySlice";
import { fetchFunctions } from "./package/functions/functionSlice";
import FunctionAdd from "./package/functions/FunctionsAdd";
import FunctionEdit from "./package/functions/FunctionEdit";
import { fetchStorePackage } from "./package/storePackage/storePackageSlice";
import StorePackageTable from "./package/storePackage/StorePackageTable";
import StorePackageAdd from "./package/storePackage/StorePackageAdd";
import StorePackageEdit from "./package/storePackage/StorePackageEdit";
import { fetchAdmin } from "./loginForm/admin/adminSlice";
import PackageReportTable from "./packageReport/PackgeReportTable";
import { fetchPackageReport } from "./packageReport/packageReportSlice";
import AccessDeny from "../../component/accessDeny/AccessDeny";
import BaseOrganization from "./organization/baseOrganization/BaseOrganization";

export default function PanelAdmin() {
  store.dispatch(fetchPosts());
  store.dispatch(fetchOrganization());
  store.dispatch(fetchComplementType());
  store.dispatch(fetchComplementValue());
  store.dispatch(fetchUserInventory());
  store.dispatch(fetchPackage());
  store.dispatch(fetchUser());
  store.dispatch(fetchCategory());
  store.dispatch(fetchFunctions()); // functions
  store.dispatch(fetchStorePackage()); //  StorePackge
  store.dispatch(fetchAdmin()); //  Admin
  store.dispatch(fetchPackageReport()); //  PackageReport
  const user = JSON.parse(localStorage.getItem("adminname"));

  return (
    <>
      {user ? (
        <>
          {""}
          <Provider store={store}>
            <MenuTopAdmin />
            <div className="panel">
              <div className="sidebar panelBox">
                <SideBarAdmin />
              </div>
              <div className="page panelBox">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/user" element={<UserTable />} />
                  <Route path="/menu" element={<MenuTable />} />
                  <Route path="/discount" element={<DiscountTable />} />
                  <Route path="/discountAdd" element={<DiscountAdd />} />
                  <Route path="/discountEdit" element={<DiscountEdit />} />
                  <Route path="/function" element={<FunctionTable />} />
                  <Route path="/functionAdd" element={<FunctionAdd />} />
                  <Route path="/functionEdit/:id" element={<FunctionEdit />} />
                  <Route path="/category" element={<CategoryTable />} />
                  <Route path="/categoryAdd" element={<CategoryAdd />} />
                  <Route path="/categoryEdit/:id" element={<CategoryEdit />} />
                  <Route path="/storePackage" element={<StorePackageTable />} />
                  <Route
                    path="/storePackageAdd"
                    element={<StorePackageAdd />}
                  />
                  <Route
                    path="/storePackageEdit/:id"
                    element={<StorePackageEdit />}
                  />
                  <Route
                    path="/baseOrganization"
                    element={<BaseOrganization />}
                  />

                  <Route
                    path="/storePackageAdd"
                    element={<StorePackageAdd />}
                  />
                  <Route
                    path="/storePackageEdit/:id"
                    element={<StorePackageEdit />}
                  />
                  <Route path="/task" element={<PackageTable />} />
                  <Route path="/report" element={<PackageReportTable />} />
                  <Route path="/type" element={<TypeTable />} />
                  <Route
                    path="/complementType"
                    element={<ComplementTypeTable />}
                  />
                  <Route
                    path="/complementTypeAdd"
                    element={<ComplementTypeAdd />}
                  />
                  <Route
                    path="/complementTypeEdit/:id"
                    element={<ComplementTypeEdit />}
                  />
                  <Route path="/organization" element={<OrganizationTable />} />
                  <Route
                    path="/organizationAdd"
                    element={<OrganizationAdd />}
                  />
                  <Route
                    path="/organizationEdit/:id"
                    element={<OrganizationEdit />}
                  />
                  <Route
                    path="/organizationShow/:id"
                    element={<OrganizationShow />}
                  />
                  <Route
                    path="/complementValue"
                    element={<ComplementValueTable />}
                  />
                  <Route
                    path="/complementValueAdd"
                    element={<ComplementValueAdd />}
                  />
                  <Route
                    path="/complementValueEdit/:id"
                    element={<ComplementValueEdit />}
                  />
                  <Route path="/inventory" element={<InventoryTable />} />
                  <Route path="/inventoryAdd" element={<InventoryAdd />} />
                  <Route path="/inventoryEdit" element={<InventoryEdit />} />
                  <Route path="/contact" element={<ContactTable />} />
                  <Route path="/contactShow" element={<ContactShow />} />
                  <Route path="*" element={<NotFoundPanel />} />
                  <Route path="/typeAdd" element={<TypeAdd />} />
                  <Route path="/typeEdit/:id" element={<TypeEdit />} />
                </Routes>
              </div>
            </div>
          </Provider>
        </>
      ) : (
        <AccessDeny />
      )}
    </>
  );
}
