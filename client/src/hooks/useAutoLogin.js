import { useState, useEffect } from "react";
import { setUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FRONTEND_INTERNAL_API_PATH } from "../config/keys";
import { setAdmin } from "../store/adminSlice";

function useAutoLogin() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function autoLoginApiCall(){
      try {
        const response = await axios.get(
          `${FRONTEND_INTERNAL_API_PATH}refresh`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          // 1. setUser
          const user = {
            email: response.data.user.email,
            address: response.data.user.address,
            auth: response.data.auth,
            name: response.data.user.name,
            createdAt: response.data.user.createdAt,
            gender : response.data.user.gender
          };

          if(response.data.user.role === 1){
            let isAdmin = {
              isAdmin: true
            }
            dispatch(setAdmin(isAdmin));
          }

          dispatch(setUser(user));
          }
        } catch (error) {
        setLoading(false);
        } finally {
        setLoading(false);
        }
    })();
  }, []);

  return loading;
}

export default useAutoLogin;