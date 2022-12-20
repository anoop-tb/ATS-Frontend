import FilterPage from "./component/pages/filterPage/FilterPage";
import LoginPage from "./component/pages/loginPage/LoginPage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./component/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <FilterPage />
            </ProtectedRoute>
          }
        />
        {/* <Route  path='/previoussearchlist' element={
            <ProtectedRoute>
                <PreviousSearchList/>
            </ProtectedRoute>
      }/>
        <Route path='/previoussearchlist/:id' element={
            <ProtectedRoute>
                <EmployeeList />
            </ProtectedRoute>
      }/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
