import React from 'react'
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    let auth = { 'token': localStorage.getItem('auth')}
    return (
        auth.token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes