import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Product from "./features/product/Product";
import Admin from "./features/admin/Admin";
import PopupAdmin from "./shared/components/PopupAdmin";
import "./App.css"; 
import { useContext } from "react";
import { VillageContext } from "./shared/dataContext/VillageContext";
import Loading from "./shared/common/Loading";
import POI from "./features/pointOfInterest/POI";
import Tour from "./features/tour/Tour";
import Login from "./features/login/Login";
import MyAccount from "./features/myAccount/MyAccount";
import BookTours from "./features/bookTours/BookTours";
import { AuthContext } from "./shared/dataContext/AuthContext";
import PopupChangePassword from "./shared/components/PopupChangePassword";

function App() {
  const {popupAdmin, isLoading} = useContext(VillageContext)
  const {isPopupChangePassword} = useContext(AuthContext)

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

          <Route exact path="/admin/place-tour" element={<Admin />} />
          <Route exact path="/admin/place-tour/detail/:slug" element={<Admin />} />
          <Route exact path="/admin/place-tour/create" element={<Admin />} />

          <Route exact path="/admin/tour" element={<Admin />} />
          <Route exact path="/admin/tour/detail/:slug" element={<Admin />} />
          <Route exact path="/admin/tour/create" element={<Admin />} />

          <Route exact path="/admin/user" element={<Admin />} />
          <Route exact path="/admin/user/:slug" element={<Admin />} />
          <Route exact path="/admin/user/create" element={<Admin />} />

          <Route exact path="/admin/nei" element={<Admin />} />

          <Route exact path="/village/:slug">
            <Route index element={<Layout />} />
            <Route  path="product" element={<Product />} />
            <Route  path="product/:path" element={<Product />} />

            <Route path="poi" element={<POI />} />
            <Route path="poi/:path" element={<POI />} />
          </Route>

          <Route path="user-tour" element={<Layout />} />

          <Route exact path="/tour">
            <Route index element={<Tour />} />
            <Route path=":slug" element={<Layout />} />
          </Route>

          <Route  path="/login" element={<Login />} />
          <Route  path="/register" element={<Login />} />

          <Route path="/myaccount/:slug" element={<MyAccount />} />

          <Route path="/book-tour" element={<BookTours />} />


        </Routes>
        {popupAdmin.isPopup && <PopupAdmin /> }
        {isLoading && <Loading />}
        {isPopupChangePassword && <PopupChangePassword />}
      </div>
    </BrowserRouter>

  );
}

export default App;
