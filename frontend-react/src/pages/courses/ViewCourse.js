import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from './Forms-pana.svg';
import { Course_BASE_URL } from '../../App';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/Header';

function ViewCourse() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [courseDetails, setCourseDetails] = useState({
    courseName: '',
    instructor: '',
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
                  <p className='h5 fw-bold'>View Program</p>
                </div>
                <div className='col text-end'>
                  <Link to='/dashboard/courses' className='btn btn-success'>
                    <i className='fa fa-chevron-circle-left' aria-hidden='true'></i> Back
                  </Link>
                </div>
              </div>
              <hr />
            </div>

            <form action='' autoComplete='off'>
              <div className='row'>
                <div className='col-xs-12 col-sm-8 col-md-6 mt-3'>
                  <div className='row mb-3'>
                    <div className='col-xs-12 col-sm-12 col-md-6'>
                      <label htmlFor='' className='form-label'>
                        Program Name
                      </label>
                      <input
                        type='text'
                        name='courseName'
                        value={courseDetails.courseName}
                        className='form-control'
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>

                    <div className='col-xs-12 col-sm-12 col-md-6'>
                      <label htmlFor='' className='form-label'>
                        Instructor
                      </label>
                      <input
                        type='text'
                        name='instructor'
                        value={courseDetails.instructor}
                        className='form-control'
                        onChange={handleChange}
                        required
                        disabled
                      />
                    </div>
                  </div>

                  {/* Add more input fields as needed for other properties of the course */}

                  <div id='back'>
                    <Link to='/dashboard/courses' className='btn btn-primary mt-5'>
                      <i className='fa fa-chevron-circle-left' aria-hidden='true'></i> Go Back
                    </Link>
                  </div>
                </div>

                <div className='col-sm-12 col-md-6 text-center p-3 d-none d-md-block'>
                  <img src={Logo} alt='' className='img-fluid rounded' width='400px' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCourse;
