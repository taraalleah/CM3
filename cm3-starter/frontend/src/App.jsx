import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/HomePage";
import AddVehicleRentalPage from "./pages/AddVehicleRentalPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import EditVehicleRentalPage from "./pages/EditVehicleRentalPage";
import VehicleRentalPage from "./pages/VehicleRentalPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-rental" element={<AddVehicleRentalPage />} />
            <Route path="/vehicles/:id" element={<VehicleRentalPage />} />
            <Route path="/edit/:id" element={<EditVehicleRentalPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

