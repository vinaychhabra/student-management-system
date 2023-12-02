import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/Header';
import { Student_BASE_URL, Course_BASE_URL } from '../../App';

function AddUser() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    course: '',
  });

  const [courses, setCourses] = useState([]);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    course: '',
  });
  const userID = localStorage.getItem('auth');

  useEffect(() => {
    // Fetch the list of courses
    axios
      .get(Course_BASE_URL + '/GetCourses')
      .then((res) => {
        if (res.data.Status === '200') {
          const courseList = JSON.parse(res.data.Data);
          setCourses(courseList);
        }
      })
      .catch((error) => {
        handleApiError(error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    // Clear the error message when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validate the form fields
    const validationErrors = validateForm(inputs);
    if (Object.values(validationErrors).some((error) => error !== '')) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      FirstName: inputs.firstName,
      LastName: inputs.lastName,
      Email: inputs.email,
      PhoneNumber: inputs.contact,
      UserID: userID,
      Course: inputs.course,
    };

    axios
      .post(Student_BASE_URL + '/InsertStudent', data)
      .then((res) => {
        if (res.data.Status === '200') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Record Inserted Successfully',
            showConfirmButton: false,
            timer: 1500,
          });

          navigate('/dashboard/student');
        }
      })
      .catch((e) => {
        handleApiError(e);
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

  // Function to validate the form fields
  const validateForm = (data) => {
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      contact: '',
      course: '',
    };

    if (!data.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }

    if (!data.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email format';
    }

    if (!data.contact.trim()) {
      errors.contact = 'Phone Number is required';
    } else if (!isValidPhoneNumber(data.contact)) {
      errors.contact = 'Invalid phone number format';
    }

    if (!data.course) {
      errors.course = 'Course is required';
    }

    return errors;
  };

  // Function to check if the email format is valid
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to check if the phone number format is valid
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className="container py-3">
          <div className="container pt-1">
            <div className="row">
              <div className="col pt-2">
                <p className="h5 fw-bold">Add User</p>
              </div>
              <div className="col text-end">
                <Link to="/dashboard/student" className="btn btn-success">
                  <i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Back
                </Link>
              </div>
            </div>
            <hr />
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-8 col-md-6 mt-3">
              <form onSubmit={handleFormSubmit} autoComplete="off">
                <div className="row mb-3">
                  <div className="col-xs-12 col-sm-12 col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={inputs.firstName}
                      onChange={handleChange}
                      className={`form-control ${errors.firstName && 'is-invalid'}`}
                      
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={inputs.lastName}
                      onChange={handleChange}
                      className={`form-control ${errors.lastName && 'is-invalid'}`}
                      
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-xs-12 col-sm-12 col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      value={inputs.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email && 'is-invalid'}`}
                      
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="col-xs-12 col-sm-12 col-md-6">
                    <label htmlFor="contact" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="contact"
                      id="contact"
                      value={inputs.contact}
                      onChange={handleChange}
                      className={`form-control ${errors.contact && 'is-invalid'}`}
                      
                    />
                    {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-xs-12 col-sm-12 col-md-6">
                    <label htmlFor="course" className="form-label">
                      Program
                    </label>
                    <select
                      name="course"
                      id="course"
                      value={inputs.course}
                      onChange={handleChange}
                      className={`form-control ${errors.course && 'is-invalid'}`}
                      
                    >
                      <option value="" disabled>
                        Select a course
                      </option>
                      {courses.map((course) => (
                        <option key={course.CourseID} value={course.CourseID}>
                          {course.CourseName}
                        </option>
                      ))}
                    </select>
                    {errors.course && <div className="invalid-feedback">{errors.course}</div>}
                  </div>
                </div>

                <button type="submit" className="btn btn-success">
                  <i className="fa fa-check-circle" aria-hidden="true"></i> Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
