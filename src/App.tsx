import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Loading from "./component/loading/Loading";
import NotFound from "./pages/error/NotFound";
import PanelPersonal from "./pages/panelPersonal/PanelPersonal";
import PanelAdmin from "./pages/panelAdmin/PanelAdmin";
import Login from "./pages/landing/login/Login";
import Contact from "./pages/landing/contact/Contact";
import { Provider } from "react-redux";
import store from "./pages/panelAdmin/store";
import { fetchPackageReport } from "./pages/panelAdmin/packageReport/packageReportSlice";
import { fetchFunctions } from "./pages/panelAdmin/package/functions/functionSlice";
import { fetchPackage } from "./pages/panelAdmin/package/package/packageSlice";
import { fetchStorePackage } from "./pages/panelAdmin/package/storePackage/storePackageSlice";
import { fetchOrganization } from "./pages/panelAdmin/organization/organizationTabel/organizationSlice";

  
function App() {
  store.dispatch(fetchPackageReport());
  store.dispatch(fetchFunctions());
  store.dispatch(fetchPackage());
  store.dispatch(fetchStorePackage());
  store.dispatch(fetchOrganization());

  return (
    <Provider store={store}>
         
          {/* <Router className="App"> */}
          <Router >
            <Routes>
              <Route  path="/" element={<Landing />} />
              <Route path="/admin/*" element={<PanelAdmin />} />
              <Route path="/user/*" element={<PanelPersonal />} />
              <Route path="/login/*" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/loading" element={<Loading />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
     
    </Provider>
  );
}

export default App;
