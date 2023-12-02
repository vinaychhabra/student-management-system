import React, { useEffect, useState } from 'react'
import { Link, json, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';


import { User_BASE_URL } from '../App';
import Header from '../pages/header/Header';

const Register = () => {

    const navigate = useNavigate();

    useEffect(() => {
        var isAuth = localStorage.getItem('auth');

        if (isAuth !== null) {
            navigate("/dashboard");
        }
    }, []);

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
    })

    const [role, setRole] = useState();

    const handleChange = (event) => {
        event.persist();
        setInputs({ ...inputs, [event.target.name]: event.target.value })
    }

    const handleFormsubmit = (event) => {
        event.preventDefault();

        let data = {
            UserName: inputs.name,
            Email: inputs.email,
            Password: inputs.password,
            Address: inputs.address,
            PhoneNumber: inputs.phoneNumber,
            UserRole: role
        }

        axios.post(User_BASE_URL + '/Registration', data).then(res => {
            if (res.data.Status === "200") {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: "Record Inserted Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                localStorage.setItem('auth', res.data.Token)
                localStorage.setItem('userName', res.data.UserName)
                localStorage.setItem('role', res.data.Role)


                navigate('/dashboard');
            }
        }).catch((e) => {
            Swal.fire({
                title: "Warning !",
                icon: 'warning',
                text: e,
                button: "Ok!"
            });
        })


    }

    return (
        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 mt-lg-4 col-lg-8 mx-auto mt-3 mb-3">
                        <div className="card">
                            <div className="card-header text-center">
                                <h1 className="text-uppercase display-2 fw-bold">REGISTRATION</h1>

                                <span>Already have an account? <Link to='/admin' className='link-offset-2 link-underline link-underline-opacity-0'>Login Here</Link></span>
                            </div>

                            <div className="card-body">
                                <form className="row g-3" onSubmit={handleFormsubmit}>
                                    <div className="col-md-6">
                                        <label htmlFor="inputEmail4" className="form-label">Email <span className="text-danger d2">*</span></label>
                                        <input type="email" className="form-control" id="inputEmail4" name='email' value={inputs.email} onChange={handleChange} placeholder='Ex. am.asky97@gmail.com' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="userName" className="form-label">user Name <span className="text-danger d2">*</span></label>
                                        <input type="text" className="form-control" id="userName" name='name' value={inputs.name} onChange={handleChange} placeholder='Ex. A. M. Asky' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="inputPassword4" className="form-label">Password <span className="text-danger d2">*</span></label>
                                        <input type="password" className="form-control" id="inputPassword4" name='password' value={inputs.password} onChange={handleChange} placeholder='password' required />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="mobileNumber" className="form-label">Mobile number <span className="text-danger d2">*</span></label>
                                        <input type="text" className="form-control" id="mobileNumber" name='phoneNumber' value={inputs.phoneNumber} onChange={handleChange} placeholder='Ex. 0775311974' required />
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="Address" className="form-label">Address</label>
                                        <textarea className="form-control" id="Address" name="address" value={inputs.address} onChange={handleChange} placeholder="Ex: 294/5, Sammanthurai" rows="3" required></textarea>
                                    </div>

                                    <div className='col-12'>
                                        <label className="form-label">User Role</label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="role" id="administrator" value={1} onChange={e => setRole(e.target.value)} />
                                                <label className="form-check-label" htmlFor="administrator">Administrator</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="role" id="staff" value={2} onChange={e => setRole(e.target.value)} />
                                                <label className="form-check-label" htmlFor="staff">Staff</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="role" id="user" value={3} onChange={e => setRole(e.target.value)} />
                                                <label className="form-check-label" htmlFor="user">User</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-success "><i className="fa fa-external-link mr-1" aria-hidden="true"></i> Sign in</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register