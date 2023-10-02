import Cookies from "js-cookie";
import axios from "axios";  
import { useNavigate } from "react-router-dom";
import { 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
 } from "./types";

 const Swal = require('sweetalert2')

 const swalWithBootstrapButtons = Swal.mixin({
   customClass: {
     confirmButton: 'btn btn-success',
     cancelButton: 'btn btn-danger'
   },
   buttonsStyling: false
 })




export const login = (username, password) => async dispatch => {
    const config = {
        // data: {username,password},
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken':   localStorage.csrfToken
        },
        // withCredentials: true
    };

    const body = JSON.stringify({ username, password});

    const BASE_URL = 'http://localhost:8000'; 

    try{
        const res = await axios.post(`http://localhost:8000/api/login`,body, config);

        if (res.data.username){
            localStorage.username = res.data.username
            // alert('success')
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.username
            });
        } else {

            dispatch({
                type: LOGIN_FAIL,

            });
        }
    }catch(err){

        dispatch({
            type: LOGIN_FAIL,
            
        });
    }
}


// export const logout = () => async dispatch => {
//     try {
//         const instance = axios.create({
//             xsrfHeaderName: 'X-CSRFToken',     
//             xsrfCookieName: 'csrftoken',    
//         });
//             const headers = {
//                 'X-CSRFToken':  localStorage.csrfToken
//             };

//             instance.post('http://localhost:8000/api/logout', {}, {
//             withCredentials: true,  // Send cookies along with the request
//             headers: headers  // Include the CSRF token in the headers
                                                 
//         })
    
//         .then(() => {
//             dispatch({
//                 type: LOGOUT_SUCCESS
//             });
            
//         })

//     } catch (error) {
//         dispatch({ type: LOGOUT_FAIL,});
//         console.error('Error during logout:', error);
//     }

// };


export const logout = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': localStorage.csrfToken
        }
    };

    try{
        const res = await axios.post(`http://localhost:8000/api/logout`, config);

        if (res.data){
            dispatch({
                type: LOGOUT_SUCCESS
            });
        } else {
            dispatch({
                type: LOGOUT_FAIL,
            });
        }
    }catch(err){
        dispatch({
            type: LOGOUT_FAIL,
            
        });
    }
}