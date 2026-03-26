import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";
import AddEmploye from "./Pages/AddEmploye.jsx";
import Home from "./Pages/Home.jsx";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/addEmploye" element={<AddEmploye />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
