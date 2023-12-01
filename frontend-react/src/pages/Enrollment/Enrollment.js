import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../header/Header';
import Sidebar from '../sidebar/sidebar';
import { Student_BASE_URL, Course_BASE_URL } from '../../App';


function Enrollment() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

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
  }, []);

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <div className='container py-3'>
            coming
          </div>
        </div>
      </div>
    </div>
  );
}

export default Enrollment;
