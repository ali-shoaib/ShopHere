import React, { useEffect, useState } from 'react'
import { dashboard } from '../api/internal'

const useAuthAdmin = async() => {
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        (async function go(){
            try{
                let res = await dashboard();
                if(res && res.data.admin && res.data.user){
                    setAuth(true);
                }
                else{
                    setAuth(false);
                }
            }
            catch(err){
                setAuth(false);
            }    
        })();
    },[])
    
  return auth;
}

export default useAuthAdmin