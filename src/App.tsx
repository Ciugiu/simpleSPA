import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import HomePage from "./pages/HomePage";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import NotFoundPage from "./pages/NotFoundPage";
import CreateProduct from "./pages/CreateProduct";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <NavBar />
        <main
          style={{ minHeight: "calc(100vh - 180px)" }}
          className="container d-flex flex-column justify-content-center align-items-center"
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
