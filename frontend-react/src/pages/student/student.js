import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../header/Header';
import Sidebar from '../sidebar/sidebar';
import { CSVLink } from 'react-csv';
import { Student_BASE_URL } from '../../App';

function Student() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = () => {
    if (localStorage.getItem('auth')) {
      if (localStorage.getItem('role') === '3') {
        loadStudent();
      } else {
        loadAllStudent();
      }
    } else {
      navigate('/admin');
    }
  };

  const loadAllStudent = () => {
    axios
      .get(Student_BASE_URL + '/GetStudent')
      .then((res) => {
        if (res.data.Status === '200') {
          const studentData = res.data.Data;
          const students = JSON.parse(studentData);
          setStudents(students);
          setLoading(false);
        } else {
          setStudents([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        handleApiError(error);
      });
  };

  const loadStudent = () => {
    const token = localStorage.getItem('auth');
    axios
      .get(Student_BASE_URL + `/GetOneStudent/${token}`)
      .then((res) => {
        if (res.data.Status === '200') {
          const studentData = res.data.Data;
          const student = JSON.parse(studentData);
          setStudents([student]);
          setLoading(false);
        } else {
          setStudents([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        handleApiError(error);
      });
  };

  const logout = () => {
    localStorage.clear();
    navigate('/admin');
  };

  const deleteStudent = (e, id) => {
    const clickBtn = e.currentTarget;
    clickBtn.innerText = 'Deleting';

    axios
      .delete(Student_BASE_URL + '/DeleteStudent/' + id)
      .then((res) => {
        clickBtn.closest('tr').remove();
        if (res.data.Status === '200') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'User Deleted Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (res.data.Status === '404') {
          Swal.fire({
            title: 'Warning !',
            icon: 'warning',
            text: 'No Student ID Found',
            button: 'Ok!',
          });
        }
      })
      .catch((error) => {
        handleApiError(error);
      });
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
    { label: 'Contact Number', key: 'PhoneNumber' },
    { label: 'Email', key: 'Email' },
    { label: 'Course', key: 'Course' },
    // Add more headers based on your student data
  ];

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
                  <h3>Student List</h3>
                </div>
                <div className='col-12 col-md-9 text-end'>
                  <CSVLink data={students} headers={csvHeaders} filename={'students.csv'} className='btn btn-primary'>
                    Download CSV
                  </CSVLink>
                  <Link to='/dashboard/add-student' className='btn btn-success' style={{ marginLeft:'1rem' }}>
                    <i className='fa fa-user' aria-hidden='true'></i> Add New Student
                  </Link>
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
                    <th scope='col'>Contact Number</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Course</th>
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
                  ) : students.length > 0 ? (
                    students.map((student, index) => (
                      <tr key={index}>
                        <td id='fName'>{student.FirstName}</td>
                        <td>{student.LastName}</td>
                        <td>{student.PhoneNumber}</td>
                        <td>{student.Email}</td>
                        <td>{student.Course}</td>
                        <td colSpan={3} className='' id='btn'>
                          <Link
                            to={'/dashboard/view-student/' + student.StudentID}
                            className='btn btn-primary btn-sm'
                            style={{ marginRight: '6px' }}
                          >
                            <i className='fa fa-search-plus' aria-hidden='true'></i> View
                          </Link>
                          <Link
                            to={'/dashboard/edit-student/' + student.StudentID}
                            className='btn btn-warning btn-sm'
                            style={{ marginRight: '6px' }}
                          >
                            <i className='fa fa-pencil-square-o' aria-hidden='true'></i> Edit
                          </Link>
                          <button onClick={(e) => deleteStudent(e, student.StudentID)} className='btn btn-danger btn-sm' >
                            <i className='fa fa-trash-o' aria-hidden='true'></i> Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className='text-center text-danger'>
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger' onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Student;
