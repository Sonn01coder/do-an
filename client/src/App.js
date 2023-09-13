import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Product from "./features/product/Product";
import Admin from "./features/admin/Admin";
import PopupAdmin from "./shared/components/PopupAdmin";
import "./App.scss"; 
import { useContext } from "react";
import { VillageContext } from "./shared/dataContext/VillageContext";
import Loading from "./shared/common/Loading";

function App() {
  const {popupAdmin, isLoading} = useContext(VillageContext)

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/home" element={<Layout />} />
          
          <Route exact path="/admin/village" element={<Admin />} />
          <Route exact path="/admin/village/detail/:slug" element={<Admin />} />
          <Route exact path="/admin/village/create" element={<Admin />} />

          <Route exact path="/admin/product" element={<Admin />} />
          <Route exact path="/admin/product/detail/:slug" element={<Admin />} />
          <Route exact path="/admin/product/create" element={<Admin />} />
          
          <Route exact path="/admin/pos" element={<Admin />} />
          <Route exact path="/admin/pos/detail/:slug" element={<Admin />} />
          <Route exact path="/admin/pos/create" element={<Admin />} />

          <Route exact path="/admin/poi" element={<Admin />} />
          <Route exact path="/admin/poi/detail/:slug" element={<Admin />} />
          <Route exact path="/admin/poi/create" element={<Admin />} />

          <Route path="/lang-nghe-bat-trang" element={<Layout />} />
          <Route  path="/lang-nghe-bat-trang/san-pham" element={<Product />} />
        </Routes>
        {popupAdmin.isPopup && <PopupAdmin /> }
        {isLoading && <Loading />}
      </div>
    </BrowserRouter>

  );
}

export default App;
