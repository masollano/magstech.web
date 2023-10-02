import React, {useRef, useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import logo from '../img/lead-logo.png';
import { getUnitLocation } from './TaskPane/JS/globalFunctions'
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import  CSRFToken  from '../components/CSRFToken'
import './index.css';
import Swal from 'sweetalert2'
import App from '../App';
import Cookies from 'js-cookie';

// const Login = ({ login, isAuthenticated, setisLoggedIn}) => {
const Login = ({ login, isAuthenticated}) => {
    const [ulData,setULData] = useState([]);
    const [ulCodeValue, setULCodeValue] = useState('');
    const [ulDescValue, setULDescValue] = useState('');
    const [submitClicked, setSubmitClicked] = useState(false);
  
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const ulCodeRef = useRef(null);
    const loginBtnRef = useRef(null);
  
    const [formData, setFormdata] = useState({
        username: '',
        password: ''
    });


    useEffect(() => {
          // Fetch CSRF token from Django backend
      fetch('http://192.168.68.106:8000/api/get-csrf-token/', {
          method: 'GET',
          credentials: 'include'  // Include cookies with the request
      }).then(response => response.json())
        .then(data => {
            const csrfToken = data.csrf_token;
            localStorage.csrfToken = csrfToken
              // localStorage.csrfToken = Cookies.set('csrftoken', csrfToken, { domain: 'http://localhost:8000' });
        })
          .catch(error => {
              console.error('Error fetching CSRF token:', error);
        });
      }, []);


  const navigate = useNavigate();
  const { username, password } = formData;

  const onChange = e => setFormdata({ ...formData, [e.target.name]: e.target.value});

  const handleLogin = () => {
    const ul = ulDescValue.split('-')
    localStorage.setLogin = true
    localStorage.uldesc = ul[1]
    localStorage.ulCode = ul[0]
    navigate('/dashboard');
    window.location.reload();
  };


  const onSubmit = e => {
      e.preventDefault();
      <CSRFToken />
      login(username, password);
    };


if (isAuthenticated)
    handleLogin();
    
    


  //LOAD UNIT LOCATION
  const loadUL = async () => {
      try {
        const response = await getUnitLocation()
        setULData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  

  const handleKeys = (event, inputIdentifier) => {
    if (event.key === 'Enter') {
      if (inputIdentifier === 'username') {
        if (event.target.value !== '') {
          passwordRef.current.focus();
        }
      } else if (inputIdentifier === 'password') {
        if (event.target.value !== '') {
          ulCodeRef.current.focus();
        }
      } else if (inputIdentifier === 'ulcode') {
        if (event.target.value !== '') {
          loadUL();
          loginBtnRef.current.focus();
        }
      }  else if (inputIdentifier === 'login') {
        if (event.target.value !== '') {
          // verifyLoginDetails();
        }
      }
    } else if (event.key === ' ') {
      if (inputIdentifier === 'ulcode') {
        loadUL();
      }
    }
  }


  
  return (
    <form onSubmit={e => onSubmit(e)}>
      
      <div className="container">
        <div className="login-form">
          <div className="row">
              <div className="login-header">
                  <div className="header-img">
                      <img className="header-logo" src={logo} />
                  </div>
              </div>
                    
              <div className="login-body">
                  <div className="header-name">
                      <h3>General Ledger System</h3>
                  </div>
                         
                  <div className='form-group'>
                      <input className='login-input' type='text' name='username' ref={usernameRef}  onChange={e => onChange(e)} value={username} placeholder="Username" autoComplete="off" required></input>
                  </div>
                  <div className='form-group'>
                      <input className='login-input' type='password' name='password' ref={passwordRef}  onChange={e => onChange(e)} value={password} placeholder="Password" autoComplete="off" required></input>
                  </div>
                  <div className='form-group'>
                      <select id='doc-type' className='login-select' placeholder="Unit Location" ref={ulCodeRef} onKeyDown={(event) => handleKeys(event, 'ulcode')} onClick={() => loadUL()}   onChangeCapture={(e) => setULDescValue(e.target.value)} required>
                        <option value=''  selected hidden>Select Unit Location</option>
                            {ulData.map((item) => (
                                <option value={item.ul_code + '-' + item.unit_description} >
                                  {item.unit_description}
                                </option>
                            ))}
                      </select>
                  </div>
                  <div className='form-group'>
                      <button className="btn-login" type='submit' ref={loginBtnRef}>Login</button>
                  </div>
              </div>
              <div className="login-footer">
                      
              </div>
          </div>
        </div>
      </div>
    </form>
        
  );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});


export default connect(mapStateToProps, { login }) (Login);
