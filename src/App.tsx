import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Toaster } from "react-hot-toast";
// import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function Layout() {
  const location = useLocation();

  // ✅ Only Shop page should control cart values.
  // ✅ For all other pages, just send dummy values.
  const isShopPage = location.pathname === "/shop";

  return (
    <>
      {/* <Navbar
        cartCount={isShopPage ? undefined : 0}
        onCartClick={isShopPage ? undefined : () => {}}
      /> */}

      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
