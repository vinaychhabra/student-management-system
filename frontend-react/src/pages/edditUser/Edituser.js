import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/Header';
import axios from 'axios';
import { Student_BASE_URL, Course_BASE_URL } from '../../App';

function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    course: '', // New field for course selection
    userID: '3',
  });

  const [courses, setCourses] = useState([]);
  const [btnBack, setBtnBack] = useState(true);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    course: '',
  });

  useEffect(() => {
    axios.get(Student_BASE_URL + '/FindStudent/' + id).then((res) => {
      if (res.data.Status === '200') {
        const studentData = res.data.Data;
        const student = JSON.parse(studentData);
        setInputs({
          firstName: student[0].FirstName,
          lastName: student[0].LastName,
          email: student[0].Email,
          contact: student[0].PhoneNumber,
          course: student[0].Course, // Populate the course field
        });
      } else if (res.data.Status === '404') {
        Swal.fire({
          title: 'Warning !',
          icon: 'warning',
          text: 'No Student ID Found',
          button: 'Ok!',
        });

        navigate('/dashboard/student');
      }
    });

    // Fetch the list of courses
    axios
      .get(Course_BASE_URL + '/GetCourses')
      .then((res) => {
        if (res.data.Status === '200') {
          const courseData = res.data.Data;
          const courseList = JSON.parse(courseData);
          setCourses(courseList);
        }
      })
      .catch((error) => {
        handleApiError(error);
      });
  }, []);

  const handleChange = (event) => {
    event.persist();
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    // Clear the error message when the user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [event.target.name]: '',
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

    document.getElementById('update').innerHTML = 'Updating....';
    document.getElementById('update').disabled = true;

    let data = {
      FirstName: inputs.firstName,
      LastName: inputs.lastName,
      Email: inputs.email,
      PhoneNumber: inputs.contact,
      UserID: inputs.userID,
      Course: inputs.course, // Include the selected course
    };

    axios
      .put(Student_BASE_URL + '/UpdateStudent/' + id, data)
      .then((res) => {
        if (res.data.Status === '200') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Record Updated Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          setBtnBack(false);
        }
      })
      .catch((e) => {
        handleApiError(e);
      });
  };

  const handleApiError = (error) => {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: 'Oops...',
      text: error.message || 'Something went wrong!',
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
        <div style={{ flex: 1, padding: '20px' }}>
          <div className="container py-3">
            <div className="container pt-1">
              <div className="row">
                <div className="col pt-2">
                  <p className="h5 fw-bold">Edit User</p>
                </div>
                <div className="col text-end">
                  <Link to="/dashboard/student" className="btn btn-success">
                    <i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Back
                  </Link>
                </div>
              </div>
              <hr />
            </div>

            <form action="" onSubmit={handleFormSubmit} autoComplete="off">
              <div className="row">
                <div className="col-xs-12 col-sm-8 col-md-6 mt-3">
                  <div className="row mb-3">
                    <div className="col-xs-12 col-sm-12 col-md-6">
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={inputs.firstName}
                        onChange={handleChange}
                        className={`form-control ${errors.firstName && 'is-invalid'}`}
                        style={{ width: '100%' }} // Make the input wider
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
                        value={inputs.lastName}
                        className={`form-control ${errors.lastName && 'is-invalid'}`}
                        onChange={handleChange}
                        style={{ width: '100%' }} // Make the input wider
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
                        value={inputs.email}
                        className={`form-control ${errors.email && 'is-invalid'}`}
                        onChange={handleChange}
                        style={{ width: '100%' }} // Make the input wider
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
                        value={inputs.contact}
                        className={`form-control ${errors.contact && 'is-invalid'}`}
                        onChange={handleChange}
                        style={{ width: '100%' }} // Make the input wider
                      />
                      {errors.contact && <div className="invalid-feedback">{errors.contact}</div>}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-xs-12 col-sm-12 col-md-6">
                      <label htmlFor="course" className="form-label">
                        Course
                      </label>
                      <select
                        name="course"
                        id="course"
                        value={inputs.course}
                        onChange={handleChange}
                        className={`form-control ${errors.course && 'is-invalid'}`}
                        style={{ width: '100%' }} // Make the dropdown wider
                      >
                        <option value="" disabled>
                          Select a Program
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

                  {btnBack ? (
                    <button className="btn btn-success mt-5" id="update">
                      <i className="fa fa-check-circle" aria-hidden="true"></i> Update user
                    </button>
                  ) : (
                    <div id="back">
                      <Link to="/dashboard" className="btn btn-primary mt-5">
                        <i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Go Back
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
