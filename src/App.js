import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Product from "./features/product/Product";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/home" element={<Layout />} />
          <Route path="/lang-nghe-bat-trang" element={<Layout />} />
          <Route  path="/lang-nghe-bat-trang/san-pham" element={<Product />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
