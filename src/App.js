import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Companies from './pages/companies';

import Restaurants from './pages/restaurants';
import LandingPage from './pages/restaurants/landing';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Dashboardcomp from './pages/dashboards/dashboardcomp';
import Meals from './pages/meals';
import AddMeal from './pages/meals/new';
import Departments from './pages/departments';
import Register from './pages/Register';
import AddDepartment from './pages/departments/add';
import AddEmployee from './pages/companies/newEmp';

function App() {
  return (
    <Router>
      <Routes>
      {/* Dashboard routes will come here */}
        <Route element={<DashboardLayout />}>
          
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/dashboardcomp" element={<Dashboardcomp />} /> 
          <Route path="/department/:id" element={<Departments />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/meals/new" element={<AddMeal />} />
          <Route path="/companies" element={<Companies />} />
          <Route path='/newDept' element= {<AddDepartment/>}

          />
          <Route path="/newEmp" element={<AddEmployee />} />
        </Route>

        {/* These routes do not use the dashboard layout */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} />
    </Router>

  );
}

export default App;
