import React from 'react';
import {Navigate} from 'react-router-dom';

function ProtectedRouteAdmin ({isAuth,children}) {
    if(isAuth) {
        return children;
    }
    else{
        return <Navigate to="/login" />
    }
}

export default ProtectedRouteAdmin;