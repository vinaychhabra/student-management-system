import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import Logo from './Forms-pana.svg'
import { Student_BASE_URL } from '../../App';
import Sidebar from '../sidebar/sidebar';
import Header from '../header/Header';

function Viewuser() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        course: "",
        userID: "3"
    })
    const [btnBack, setBtnBack] = useState(true);

    const handleChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        axios.get(Student_BASE_URL + '/FindStudent/' + id).then(res => {
            if (res.data.Status === "200") {
                const studentData = res.data.Data;
                const student = JSON.parse(studentData);
                console.log(student);
                setInputs({
                    firstName: student[0].FirstName,
                    lastName: student[0].LastName,
                    email: student[0].Email,
                    contact: student[0].PhoneNumber,
                    course: student[0].Course
                })
            } else if (res.data.Status === "404") {
                Swal.fire({
                    title: "Warning !",
                    icon: 'warning',
                    text: "No Student ID Found",
                    button: "Ok!"
                });
                navigate('/dashboard/student');
            }
        });
    }, []);

    return (
        <div>
            <Header />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1, padding: '20px' }}>
                    <div className='container py-3'>
                        <div className="container pt-1">
                            <div className="row">
                                <div className="col pt-2">
                                    <p className="h5 fw-bold">View User</p>
                                </div>
                                <div className="col text-end">
                                    <Link to="/dashboard/student" className="btn btn-success">
                                        <i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Back
                                    </Link>
                                </div>
                            </div>
                            <hr />
                        </div>

                        <form action='' autoComplete="off">
                            <div className='row'>
                                <div className="col-xs-12 col-sm-8 col-md-6 mt-3">
                                    <div className="row mb-3">
                                        <div className="col-xs-12 col-sm-12 col-md-6">
                                            <label htmlFor="" className="form-label">First Name</label>
                                            <input type="text" name="firstName" value={inputs.firstName} id="" className="form-control" onChange={handleChange} required disabled />
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-6">
                                            <label htmlFor="" className="form-label">Last Name</label>
                                            <input type="text" name="lastName" id="" value={inputs.lastName} className="form-control" onChange={handleChange} require disabled />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-xs-12 col-sm-12 col-md-6">
                                            <label htmlFor="" className="form-label">Email</label>
                                            <input type="text" name="email" id="" value={inputs.email} className="form-control" onChange={handleChange} disabled />
                                        </div>
                                        <div className="col-xs-12 col-sm-12 col-md-6">
                                            <label htmlFor="" className="form-label">Phone Number</label>
                                            <input type="text" name="contact" id="" value={inputs.contact} className="form-control" onChange={handleChange} required disabled />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-xs-12 col-sm-12 col-md-6">
                                            <label htmlFor="" className="form-label">Course</label>
                                            <input type="text" name="course" id="" value={inputs.course} className="form-control" onChange={handleChange} required disabled />
                                        </div>
                                    </div>

                                    <div id='back'>
                                        <Link to="/dashboard/student" className="btn btn-primary mt-5">
                                            <i className="fa fa-chevron-circle-left" aria-hidden="true"></i> Go Back
                                        </Link>
                                    </div>
                                </div>

                                <div className="col-sm-12 col-md-6 text-center p-3 d-none d-md-block">
                                    <img src={Logo} alt="" className="img-fluid rounded" width="400px" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Viewuser;
