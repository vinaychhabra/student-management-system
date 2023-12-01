import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import PrivateRoutes from './protected/PrivateRoutes';
import Dashboard from './pages/dashboard/Dashboard'
import Footer from './pages/footer/Footer';
import Adduser from './pages/addUser/Adduser';
import Edituser from './pages/edditUser/Edituser';
import Viewuser from './pages/viewUser/Viewuser';
import Student from './pages/student/student';
import CourseList from './pages/courses/courseList';
import AddCourse from './pages/courses/AddCourse';
import ViewCourse from './pages/courses/ViewCourse';
import EditCourse from './pages/courses/EditCourse';
import Enrollment from './pages/Enrollment/Enrollment';

export const Student_BASE_URL = "https://localhost:7140/api/Student";
export const User_BASE_URL = "https://localhost:7140/api/User";
export const Course_BASE_URL = "https://localhost:7140/api/Course";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' Component={Login} />
        <Route path='/login' Component={Login} />
        <Route path='/register' Component={Register} />

        {/*Private Route */}
        <Route element={<PrivateRoutes />}>
        
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/dashboard/add-student' Component={Adduser} />
          <Route path='/dashboard/add-course' Component={AddCourse} />
          <Route path='/dashboard/courses' Component={CourseList} />
          <Route path='/dashboard/view-course/:id' Component={ViewCourse}/>
          <Route path='/dashboard/edit-course/:id' Component={EditCourse} />
          <Route path='/dashboard/student/' Component={Student} />
          <Route path='/dashboard/edit-student/:id' Component={Edituser} />
          <Route path='/dashboard/view-student/:id' Component={Viewuser}/>
          <Route path='/dashboard/student-enrolled/' Component={Enrollment} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
