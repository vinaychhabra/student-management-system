import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Header from '../header/Header';
import Sidebar from '../sidebar/sidebar';
import { Course_BASE_URL } from '../../App'; // Adjust the import based on your application

function AddCourse() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    courseName: '',
    instructor: '',
    // Add more properties as needed
  });

  const [errors, setErrors] = useState({
    courseName: '',
    instructor: '',
    // Add more properties as needed
  });

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

    const data = {
      CourseName: inputs.courseName,
      Instructor: inputs.instructor,
      // Add more properties as needed
    };

    axios.post(Course_BASE_URL + '/InsertCourse', data).then((res) => {
      if (res.data.Status === '200') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Record Inserted Successfully',
          showConfirmButton: false,
          timer: 1500,
        });

        navigate('/dashboard/courses');
      }
    }).catch((e) => {
      Swal.fire({
        title: 'Warning!',
        icon: 'warning',
        text: e,
        button: 'Ok!',
      });
    });
  };

  // Function to validate the form fields
  const validateForm = (data) => {
    const errors = {
      courseName: '',
      instructor: '',
      // Add more properties as needed
    };

    if (!data.courseName.trim()) {
      errors.courseName = 'Course Name is required';
    }

    if (!data.instructor.trim()) {
      errors.instructor = 'Instructor is required';
    }

    // Add more validation as needed for other properties

    return errors;
  };

  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div className='container py-3'>
          <div className='container pt-1'>
            <div className='row'>
              <div className='col pt-2'>
                <p className='h5 fw-bold'>Add Course</p>
              </div>
              <div className='col text-end'>
                <Link to='/dashboard/courses' className='btn btn-success'>
                  <i className='fa fa-chevron-circle-left' aria-hidden='true'></i> Back
                </Link>
              </div>
            </div>
            <hr />
          </div>

          <div className='row'>
            <div className='col-xs-12 col-sm-8 col-md-6 mt-3'>
              <form action='' onSubmit={handleFormSubmit} autoComplete='off'>
                <div className='row mb-3'>
                  <div className='col-12'>
                    <label htmlFor='courseName' className='form-label'>
                      Program Name
                    </label>
                    <input
                      type='text'
                      name='courseName'
                      id='courseName'
                      value={inputs.courseName}
                      onChange={handleChange}
                      className={`form-control ${errors.courseName && 'is-invalid'}`}
                    />
                    {errors.courseName && (
                      <div className='invalid-feedback'>{errors.courseName}</div>
                    )}
                  </div>
                </div>

                <div className='row mb-3'>
                  <div className='col-12'>
                    <label htmlFor='instructor' className='form-label'>
                      Instructor
                    </label>
                    <input
                      type='text'
                      name='instructor'
                      id='instructor'
                      value={inputs.instructor}
                      onChange={handleChange}
                      className={`form-control ${errors.instructor && 'is-invalid'}`}
                    />
                    {errors.instructor && (
                      <div className='invalid-feedback'>{errors.instructor}</div>
                    )}
                  </div>
                </div>

                {/* Add more input fields as needed for other properties of the course */}

                <button className='btn btn-success'>
                  <i className='fa fa-check-circle' aria-hidden='true'></i> Submit
                </button>
              </form>
            </div>

            <div className='col-sm-12 col-md-6 text-center p-3 d-none d-md-block'>
              {/* You can add an image or any additional content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
