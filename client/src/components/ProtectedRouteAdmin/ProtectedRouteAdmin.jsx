import React from 'react';
import {Navigate} from 'react-router-dom';

function ProtectedRouteAdmin ({isAdmin,isAuth,children}) {
    if(isAdmin && isAuth) {
        return children;
    }
    else{
        if(isAuth){
            return <Navigate to="/" />
        }
        else{
            return <Navigate to="/login" />
        }
    }
}

export default ProtectedRouteAdmin;