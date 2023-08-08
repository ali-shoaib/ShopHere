import React from 'react';
import {Navigate} from 'react-router-dom';

function ProtectedRoute ({isAdmin,isAuth,children}) {
    // const [isAdmin, setIsAdmin] = useState(false);

    // console.log("isAdmin => ",isAdmin);

    // useEffect(() => {
    //     const fetchData = async() => {
    //         const res = await dashboard();

    //         if(res.data.admin){
    //             console.log(res);
    //             setIsAdmin(true);
    //         }
    //         else{
    //             setIsAdmin(false);
    //         }
    //     }

    //     fetchData()
    //     .catch(console.error);
    // },[])

    if(isAdmin && isAuth) {
        return children;
    }
    else{
        return <Navigate to="/login" />
    }
}

export default ProtectedRoute;