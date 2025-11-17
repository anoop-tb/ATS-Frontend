import FilterPage from "./component/pages/filterPage/FilterPage";
import LoginPage from "./component/pages/loginPage/LoginPage";
import { Route, Routes, HashRouter } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<FilterPage />} />
      </Routes>
    </HashRouter>
      );
}

export default App;
