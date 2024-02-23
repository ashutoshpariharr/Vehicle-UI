import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./components/Dashbord";
import Login from "./components/Login";
import VendorDetails from "./components/VendorDetails";
import Final from "./components/Final";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Simulate successful login, set isLoggedIn to true
    setIsLoggedIn(true);
  };

  const navigateTo = (path) => {
    // Implement your navigation logic here
    console.log("Navigating to:", path);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} navigateTo={navigateTo} />}
        />
        {/* If logged in, navigate to Dashboard, otherwise redirect to Login */}
        <Route
          path="/"
          element={
            isLoggedIn ? <Dashboard /> : <Login onLogin={handleLogin} navigateTo={navigateTo} />
          }
        />
        
      <Route path="/vendor" element={<VendorDetails />} />
      <Route path="/final" element={<Final />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
