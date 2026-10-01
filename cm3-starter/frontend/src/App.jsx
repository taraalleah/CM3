import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

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
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.token ? true : false;
  });
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar 
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-rental" element={ isAuthenticated ? <AddVehicleRentalPage /> : <Navigate to="/signup"/>} />
            <Route path="/vehicles/:id" element={<VehicleRentalPage isAuthenticated={isAuthenticated}/>} />
            <Route path="/edit/:id" element={<EditVehicleRentalPage />} />
            <Route path="/login" element={ isAuthenticated ? ( <Navigate to="/" /> ) : ( <Login setIsAuthenticated={setIsAuthenticated} />)}/>
            <Route path="/signup"element={ isAuthenticated ? ( <Navigate to="/" /> ) : ( <Signup setIsAuthenticated={setIsAuthenticated} />)}/>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;

