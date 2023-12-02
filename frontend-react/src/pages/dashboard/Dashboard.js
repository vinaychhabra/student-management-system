import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import Sidebar from '../sidebar/sidebar';
import { Student_BASE_URL, Course_BASE_URL, Enroll_BASE_URL } from '../../App';
import './Dashboard.css'; // Import the CSS file

function Dashboard() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalEnrolledStudents, setTotalEnrolledStudents] = useState(0);

  useEffect(() => {
    // Fetch total students
    axios
      .get(Student_BASE_URL + '/GetStudent')
      .then((res) => {
        if (res.data.Status === '200') {
          const studentsData = res.data.Data;
          const students = JSON.parse(studentsData);
          setTotalStudents(students.length);
        }
      })
      .catch((error) => {
        console.error('Error fetching total students:', error);
      });

    // Fetch total courses
    axios
      .get(Course_BASE_URL + '/GetCourses')
      .then((res) => {
        if (res.data.Status === '200') {
          const coursesData = res.data.Data;
          const courses = JSON.parse(coursesData);
          setTotalCourses(courses.length);
        }
      })
      .catch((error) => {
        console.error('Error fetching total courses:', error);
      });

    // Fetch total enrolled students
    axios
      .get(Student_BASE_URL + '/GetEnrollStudents')
      .then((res) => {
        if (res.data.length > 0) {
          setTotalEnrolledStudents(res.data.length);
        }
      })
      .catch((error) => {
        console.error('Error fetching total enrolled students:', error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <div className='container py-3'>
            <div className='container pt-1'>
              <div className='row'>
                <div className='col-12 col-md-3 pb-3'>
                  <h3>Dashboard</h3>
                </div>
              </div>
              <hr />
            </div>

            <div className='row'>
              <div className='col-md-4'>
                <div className='card dashboard-card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Total Students</h5>
                    <p className='card-text'>{totalStudents}</p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card dashboard-card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Total Programs</h5>
                    <p className='card-text'>{totalCourses}</p>
                  </div>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card dashboard-card'>
                  <div className='card-body'>
                    <h5 className='card-title'>Enrolled Students</h5>
                    <p className='card-text'>{totalEnrolledStudents}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
