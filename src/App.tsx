import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Toaster } from "react-hot-toast";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors">
        <BrowserRouter>
          <Toaster position="top-right" />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>

          <Footer />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
