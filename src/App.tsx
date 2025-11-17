import FilterPage from "./component/pages/filterPage/FilterPage";
import LoginPage from "./component/pages/loginPage/LoginPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FilterPage />} />
      </Routes>
    </BrowserRouter>
      );
}

export default App;
