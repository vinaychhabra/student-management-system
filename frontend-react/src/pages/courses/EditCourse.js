import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Course_BASE_URL } from '../../App';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/Header';

function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [courseDetails, setCourseDetails] = useState({
    courseName: '',
    instructor: '',
    credits: 0,
    // Add more properties as needed
  });

  const handleChange = (event) => {
    event.persist();
    setCourseDetails({ ...courseDetails, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    axios.get(Course_BASE_URL + `/FindCourse/${id}`).then((res) => {
      if (res.data.Status === '200') {
        const courseData = res.data.Data;
        const course = JSON.parse(courseData);

        setCourseDetails({
          courseName: course[0].course_name,
          instructor: course[0].instructor,
          credits: course[0].credits,
          // Add more properties as needed
        });
      } else if (res.data.Status === '404') {
        Swal.fire({
          title: 'Warning!',
          icon: 'warning',
          text: 'No Course ID Found',
          button: 'Ok!',
        });
        navigate('/dashboard/courses');
      }
    });
  }, [id, navigate]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios.put(Course_BASE_URL + `/UpdateCourse/${id}`, courseDetails).then((res) => {
      if (res.data.Status === '200') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Record Updated Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/dashboard/courses');
      } else {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Oops...',
          text: 'Error updating course',
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
                <div className='col pt-2'>
                  <p className='h5 fw-bold'>Edit Program</p>
                </div>
                <div className='col text-end'>
                  <Link to='/dashboard/courses' className='btn btn-success'>
                    <i className='fa fa-chevron-circle-left' aria-hidden='true'></i> Back
                  </Link>
                </div>
              </div>
              <hr />
            </div>

            <form action='' autoComplete='off' onSubmit={handleFormSubmit}>
              <div className='row'>
                <div className='col-12 col-md-6 mt-3'>
                  <div className='row mb-3'>
                    <div className='col-12'>
                      <label htmlFor='courseName' className='form-label'>
                        Program Name
                      </label>
                      <input
                        type='text'
                        name='courseName'
                        value={courseDetails.courseName}
                        className='form-control'
                        onChange={handleChange}
                        required
                      />
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
                        value={courseDetails.instructor}
                        className='form-control'
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Uncomment the following block if you have a 'credits' field */}
                  {/* <div className='row mb-3'>
                    <div className='col-12'>
                      <label htmlFor='credits' className='form-label'>
                        Credits
                      </label>
                      <input
                        type='number'
                        name='credits'
                        value={courseDetails.credits}
                        className='form-control'
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div> */}

                  <button className='btn btn-success mt-5' type='submit'>
                    <i className='fa fa-check-circle' aria-hidden='true'></i> Update Program
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCourse;
