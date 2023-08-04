import React from 'react';
import {Navigate} from 'react-router-dom';

function Protected ({isAdmin, children}) {
    if(isAdmin){
        return children;
    }
    else{
        return <Navigate to="/login"/>
    }
}

export default Protected;