import { 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL
 } from "../actions/types";

 const Swal = require('sweetalert2')

 const swalWithBootstrapButtons = Swal.mixin({
   customClass: {
     confirmButton: 'btn btn-success',
     cancelButton: 'btn btn-danger'
   },
   buttonsStyling: false
 })


const initialState = {
    isAuthenticated: null,
    username: ''
};

 export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case LOGIN_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                username: payload
            }
        case LOGOUT_SUCCESS:
            return{
                ...state,
                isAuthenticated: '',
                username: ''
            }
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
            swalWithBootstrapButtons.fire({
                title: 'Invalid Login',
                text: "Please check your login credentials",
                icon: 'warning',  
                confirmButtonText: ' OK ',
                reverseButtons: true
              }); 
            return state
        default:
            return state
    }
 };