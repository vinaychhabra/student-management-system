import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../header/Header';
import { Enroll_BASE_URL, Course_BASE_URL } from '../../App';
import EnrollmentSuccessPage from './EnrollmentSuccessPage';

function EnrollmentForm() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userId: '',
    course: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    userId: '',
    course: '',
  });

  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    axios.get(`${Course_BASE_URL}/GetCourses/`)
      .then((res) => {
        if (res.data.Status === '200') {
          const courses = JSON.parse(res.data.Data);
          setCourseOptions(courses);
        }
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
      });
  }, []);

  const handleChange = (event) => {
    event.persist();
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [event.target.name]: '',
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateForm(inputs);
    if (Object.values(validationErrors).some((error) => error !== '')) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      FirstName: inputs.firstName,
      LastName: inputs.lastName,
      Email: inputs.email,
      PhoneNumber: inputs.phoneNumber,
      UserId: inputs.userId,
      Course: inputs.course,
    };

    axios.post(`${Enroll_BASE_URL}/InsertEnrollStudent`, data)
      .then((res) => {
        if (res.data.Status === '200') {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Record Inserted Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          setFormSubmitted(true);
          sessionStorage.setItem('formSubmitted', 'true');
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Warning!',
          icon: 'warning',
          text: error.response ? error.response.data : error.message,
          button: 'Ok!',
        });
      });
  };

  const validateForm = (data) => {
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      userId: '',
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
      errors.email = 'Invalid email address';
    }

    if (!data.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!isValidPhoneNumber(data.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number';
    }

    // if (!data.userId.trim()) {
    //   errors.userId = 'User ID is required';
    // }

    if (!data.course.trim()) {
      errors.course = 'Course is required';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  if (formSubmitted) {
    return <EnrollmentSuccessPage />;
  }

  return (
    <div>
      <Header />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '67vh' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Enrollment Form</p>
          <form style={{ width: '100%', maxWidth: '400px' }} onSubmit={handleFormSubmit} autoComplete='off'>
            <div className='row mb-3'>
              <div className='col-6'>
                <label htmlFor='firstName' className='form-label'>
                  First Name
                </label>
                <input
                  type='text'
                  name='firstName'
                  id='firstName'
                  value={inputs.firstName}
                  onChange={handleChange}
                  className={`form-control ${errors.firstName && 'is-invalid'}`}
                />
                {errors.firstName && (
                  <div className='invalid-feedback'>{errors.firstName}</div>
                )}
              </div>
              <div className='col-6'>
                <label htmlFor='lastName' className='form-label'>
                  Last Name
                </label>
                <input
                  type='text'
                  name='lastName'
                  id='lastName'
                  value={inputs.lastName}
                  onChange={handleChange}
                  className={`form-control ${errors.lastName && 'is-invalid'}`}
                />
                {errors.lastName && (
                  <div className='invalid-feedback'>{errors.lastName}</div>
                )}
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-12'>
                <label htmlFor='email' className='form-label'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={inputs.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email && 'is-invalid'}`}
                />
                {errors.email && (
                  <div className='invalid-feedback'>{errors.email}</div>
                )}
              </div>
            </div>

            <div className='row mb-3'>
              <div className='col-12'>
                <label htmlFor='phoneNumber' className='form-label'>
                  Phone Number
                </label>
                <input
                  type='text'
                  name='phoneNumber'
                  id='phoneNumber'
                  value={inputs.phoneNumber}
                  onChange={handleChange}
                  className={`form-control ${errors.phoneNumber && 'is-invalid'}`}
                />
                {errors.phoneNumber && (
                  <div className='invalid-feedback'>{errors.phoneNumber}</div>
                )}
              </div>
              {/* <div className='col-6'>
                <label htmlFor='userId' className='form-label'>
                  User ID
                </label>
                <input
                  type='text'
                  name='userId'
                  id='userId'
                  value={inputs.userId}
                  onChange={handleChange}
                  className={`form-control ${errors.userId && 'is-invalid'}`}
                />
                {errors.userId && (
                  <div className='invalid-feedback'>{errors.userId}</div>
                )}
              </div> */}
            </div>

            <div className='row mb-3'>
              <div className='col-12'>
                <label htmlFor='course' className='form-label'>
                  Course
                </label>
                <select
                  name='course'
                  id='course'
                  value={inputs.course}
                  onChange={handleChange}
                  className={`form-control ${errors.course && 'is-invalid'}`}
                >
                  <option value='' disabled>Select a Program</option>
                  {courseOptions.map((course) => (
                    <option key={course.CourseID} value={course.CourseID}>
                      {course.CourseName}
                    </option>
                  ))}
                </select>
                {errors.course && (
                  <div className='invalid-feedback'>{errors.course}</div>
                )}
              </div>
            </div>

            <div className="form-group">
                                        <button type="submit" className="btn btn-success form-control">Submit</button>
                                    </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EnrollmentForm;
