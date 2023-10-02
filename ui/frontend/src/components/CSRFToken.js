import React, { useState, useEffect} from "react";
import axios from "axios";

const CSRFToken = () => {
    const [csrfToken, setcsrfToken] = useState('');

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    const BASE_URL = 'http://localhost:8000'; 

    useEffect(() => {
        let cokies = '';
        const fetchData = async () => {
            try {
            const res =  await axios.get(`${BASE_URL}/csrf_cookie`)
            cokies = res.data
            }catch(err){

            }
        };

        fetchData();
        // setcsrfToken(getCookie('csrftoken'))
        setcsrfToken(cokies)
    }, []);
        
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrfToken} />
    );
   
};

export default CSRFToken;