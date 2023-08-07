import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute () {
    const isAdmin = useSelector(state => state.admin.isAdmin);

    return isAdmin ? <Outlet/> : <Navigate to='/login'/>;
}

export default ProtectedRoute;