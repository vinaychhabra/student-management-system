import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../header/Header';
import Sidebar from '../sidebar/sidebar';
import { Enroll_BASE_URL } from '../../App';
import { CSVLink } from 'react-csv';

function EnrollmentList() {
  const navigate = useNavigate();
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEnrolledStudents();
  }, []);

  const loadEnrolledStudents = () => {
    if (localStorage.getItem('auth')) {
      axios
        .get(Enroll_BASE_URL + '/GetEnrollStudents')
        .then((res) => {
          if (res.data.length > 0) {
            const studentsData = res.data;
            setEnrolledStudents(studentsData);
            setLoading(false);
          } else {
            console.log(res.data);
            setEnrolledStudents([]);
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
    { label: 'First Name', key: 'FirstName' },
    { label: 'Last Name', key: 'LastName' },
    { label: 'Email', key: 'Email' },
    { label: 'Phone Number', key: 'PhoneNumber' },
    { label: 'User ID', key: 'UserId' },
    { label: 'Course', key: 'Course' },
    // Add more headers based on your student data
  ];

  const deleteStudent = (e, studentId) => {
    e.preventDefault();

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this student!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(Enroll_BASE_URL + `/DeleteEnrollStudent/${studentId}`)
          .then((res) => {
            if (res.data.Status === '200') {
              Swal.fire({
                title: 'Deleted!',
                text: 'The student has been deleted.',
                icon: 'success',
              });
              loadEnrolledStudents(); // Reload the student list after deletion
            } else {
              handleApiError(new Error('Error deleting student'));
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
                  <h3>Enrolled Students List</h3>
                </div>
                <div className='col-12 col-md-9 text-end'>
                  <CSVLink
                    data={enrolledStudents}
                    headers={csvHeaders}
                    filename={'enrolled_students_list.csv'}
                    className='btn btn-primary'
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
                    <th scope='col'>First Name</th>
                    <th scope='col'>Last Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Phone Number</th>
                    {/* <th scope='col'>User ID</th> */}
                    <th scope='col'>Program</th>
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
) : enrolledStudents.length > 0 ? (
  enrolledStudents.map((student, index) => (

    <tr key={index}>
      <td>{student.firstName}</td>
      <td>{student.lastName}</td>
      <td>{student.email}</td>
      <td>{student.phoneNumber}</td>
      {/* <td>{student.userID}</td> */}
      <td>{student.course}</td>
      <td>
        <button onClick={(e) => deleteStudent(e, student.studentID)} className='btn btn-danger btn-sm'>
          <i className='fa fa-trash-o' aria-hidden='true'></i> Delete
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={7} className='text-center text-danger'>
      No Data Found
    </td>
  </tr>
)}

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentList;
