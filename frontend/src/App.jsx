import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import AdminDashBoard from "./pages/AdminDashBoard";
import EmployeeDashBoard from "./pages/EmployeeDashBoard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBasedRoutes from "./utils/RoleBasedRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import List from "./components/employee/list";
import Add from "./components/employee/Add";
import View from "./components/employee/view";
import Edit from "./components/employee/Edit";
import SalaryList from"./components/salary/SalaryList";
import AddSalary from "./components/salary/AddSalary";
import ViewSalary from "./components/salary/ViewSalary";
import Payment from "./components/salary/Payment";
import Profile from "./components/EmployeeDashboard/Profile";
import LeaveList from "./components/leave/LeaveList";
import AddLeave from "./components/leave/AddLeave";
import Salary from "./components/MySalary/Salary";
import Setting from "./components/EmployeeDashboard/Setting";
import Welcome from "./components/EmployeeDashboard/Welcome";
import LeaveTable from "./components/leave/LeaveTable";
import EmpLeaveTable from "./components/leave/EmpLeaveTable";
import EmpLeaveList from "./components/leave/EmpLeaveList";
import ForgotPassword from "./pages/ForgotPassword";
import Attendance from "./components/attendance/Attendance";
import EmpAttendance from "./components/attendance/EmpAttendance";

function App() {

  return (
  <BrowserRouter>
  <Routes>
     <Route path="/" element={<Navigate to="/admin-dashboard"/>}></Route>
     <Route path="/login" element={<Login/>}></Route>
     <Route path="/forgot-password" element={<ForgotPassword/>}></Route>

     <Route path="/admin-dashboard" element={
      <PrivateRoutes>
        <RoleBasedRoutes requiredRole={["admin"]}>
        <AdminDashBoard/>
        </RoleBasedRoutes>
        </PrivateRoutes>
      }>
        <Route index element={<AdminSummary/>}></Route> 
        <Route path="/admin-dashboard/departments" element={<DepartmentList/>}></Route> 
        <Route path="/admin-dashboard/add-department" element={<AddDepartment/>}></Route>
        <Route path="/admin-dashboard/employees" element={<List/>}></Route>
        <Route path="/admin-dashboard/salary" element={<SalaryList/>}></Route>
        <Route path="/admin-dashboard/payment" element={<Payment/>}></Route>

        <Route path="/admin-dashboard/add-employee" element={<Add/>}></Route>
        <Route path="/admin-dashboard/employees/:id" element={<View/>}></Route>
        

        <Route path="/admin-dashboard/employees/edit/:id" element={<Edit/>}></Route>
        <Route path="/admin-dashboard/salary/add/:id" element={<AddSalary/>}></Route>
        <Route path="/admin-dashboard/salary/view/:id" element={<ViewSalary/>}></Route>

        <Route path="/admin-dashboard/leaves" element={<LeaveTable/>}></Route>
        <Route path="/admin-dashboard/leaves/:id" element={<EmpLeaveTable/>}></Route>
        <Route path="/admin-dashboard/employees/leaves/:id" element={<EmpLeaveList/>}></Route>
        <Route path="/admin-dashboard/settings" element={<Setting/>}></Route>
        <Route path="/admin-dashboard/attendance" element={<Attendance/>}></Route>
        <Route path="/admin-dashboard/employees/attendance/:id" element={<EmpAttendance/>}></Route>


        
      </Route>
     <Route path="/employee-dashboard" element={
      <PrivateRoutes>
        <RoleBasedRoutes requiredRole={["employees"]}>
        <EmployeeDashBoard/>
        </RoleBasedRoutes>
      </PrivateRoutes>
      
      }>
      <Route index element={<Welcome/>}></Route> 
      <Route path="/employee-dashboard/profile/:id" element={<Profile/>}></Route>
      <Route path="/employee-dashboard/leaves" element={<LeaveList/>}></Route>
      <Route path="/employee-dashboard/add-leave" element={<AddLeave/>}></Route>
      <Route path="/employee-dashboard/salary/:id" element={<Salary/>}></Route>
      <Route path="/employee-dashboard/settings" element={<Setting/>}></Route>


      </Route>

      
  </Routes>
  
  </BrowserRouter>
  );
}

export default App;
