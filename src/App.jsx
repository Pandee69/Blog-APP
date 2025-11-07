import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import AddProperty from "./pages/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";
import Dashboard from "./pages/Dashboard";
import LoginSignup from "./pages/LoginSignup";

function App() {
  return (
    <ThemeProvider>
      <Router>           {/* Move Router outside */}
        <AuthProvider>   {/* AuthProvider is now inside Router */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginSignup />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
