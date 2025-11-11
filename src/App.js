import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Companies from './pages/companies';
import Menu from './pages/menu';
import Orders from './pages/orders';
import Restaurants from './pages/restaurants';
import LandingPage from './pages/restaurants/landing';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Dashboardcomp from './pages/dashboards/dashboardcomp';
import Dashboardres from './pages/dashboards/dashboardres';
import Finance from './pages/finance';
import Meals from './pages/meals';
import AddMeal from './pages/meals/new';
import Payments from './pages/payments';
import Departments from './pages/departments';

function App() {
  return (
    <Router>
      <Routes>
      {/* Dashboard routes will come here */}
        <Route element={<DashboardLayout />}>
          
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/dashboardcomp" element={<Dashboardcomp />} />
          <Route path="/department/:id" element={<Departments />} />
          <Route path="/meals" element={<Meals />} />
          <Route path="/meals/new" element={<AddMeal />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/dashboardres" element={<Dashboardres />} />
          <Route path="/companies" element={<Companies />} 
          />
        </Route>

        {/* These routes do not use the dashboard layout */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={5000} />
    </Router>

  );
}

export default App;
