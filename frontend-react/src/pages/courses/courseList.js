import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../header/Header';
import Sidebar from '../sidebar/sidebar';
import { Course_BASE_URL } from '../../App';
import { CSVLink } from 'react-csv';

function CourseList() {
  const navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    if (localStorage.getItem('auth')) {
      axios
        .get(Course_BASE_URL + '/GetCourses')
        .then((res) => {
          if (res.data.Status === '200') {
            const coursesData = res.data.Data;
            const courses = JSON.parse(coursesData);
            setCourseList(courses);
            setLoading(false);
          } else {
            setCourseList([]);
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          handleApiError(error);
        });
    } else {
      navigate('/admin');
    }
  };

  const handleApiError = (error) => {
    Swal.fire({
      title: 'Error!',
      text: error.message || 'Something went wrong!',
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  };
  const csvHeaders = [
    { label: 'Course Name', key: 'CourseName' },
    { label: 'Instructor', key: 'Instructor' },
    // Add more headers based on your course data
  ];
  const deleteCourse = (e, courseId) => {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(Course_BASE_URL + `/DeleteCourse/${courseId}`)
          .then((res) => {
            if (res.data.Status === '200') {
              Swal.fire({
                title: 'Deleted!',
                text: 'The course has been deleted.',
                icon: 'success',
              });
              loadCourses(); // Reload the course list after deletion
            } else {
              handleApiError(new Error('Error deleting course'));
            }
          })
          .catch((error) => {
            handleApiError(error);
          });
      }
    });
  };

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
                  <h3>Course List</h3>
                </div>
                <div className='col-12 col-md-9 text-end'>
                  <Link to='/dashboard/add-course' className='btn btn-success'>
                    <i className='fa fa-user' aria-hidden='true'></i> Add Program
                  </Link>
                  <CSVLink
                    data={courseList}
                    headers={csvHeaders}
                    filename={'course_list.csv'}
                    className='btn btn-primary ms-2'
                  >
                    Export to CSV
                  </CSVLink>

                </div>
              </div>
              <hr />
            </div>

            <div className='table-responsive'>
              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>Program Name</th>
                    <th scope='col'>Coordinator Name</th>
                    {/* Add more columns based on your course data */}
                    <th scope='col'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr className='text-center'>
                      <td colSpan={7}>
                        <div className='spinner-border text-primary' role='status'>
                          <span className='visually-hidden'>Loading...</span>
                        </div>
                      </td>
                    </tr>
                  ) : courseList.length > 0 ? (
                    courseList.map((course, index) => (
                      <tr key={index}>
                        <td>{course.CourseName}</td>
                        <td>{course.Instructor}</td>
                        {/* Add more columns based on your course data */}
                        <td colSpan={3} className='' id='btn'>
                          {/* Add links or buttons for course actions */}
                          <Link
                            to={'/dashboard/view-course/' + course.CourseID}
                            className='btn btn-primary btn-sm'
                            style={{ marginRight: '6px' }}
                          >
                            <i className='fa fa-search-plus' aria-hidden='true'></i> View
                          </Link>
                          <Link
                            to={'/dashboard/edit-course/' + course.CourseID}
                            className='btn btn-warning btn-sm'
                            style={{ marginRight: '6px' }}
                          >
                            <i className='fa fa-pencil-square-o' aria-hidden='true'></i> Edit
                          </Link>
                          <button onClick={(e) => deleteCourse(e, course.CourseID)} className='btn btn-danger btn-sm'>
                            <i className='fa fa-trash-o' aria-hidden='true'></i> Delete
                          </button>
                          {/* Add more links or buttons for other actions */}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className='text-center text-danger'>
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* You can add additional buttons or actions here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseList;
