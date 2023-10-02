import axios from 'axios';
import { useState, useEffect } from 'react';

// require('dotenv').config()

const BASE_URL = 'http://localhost:8000/'; 
// const BASE_URL = process.env.REACT_APP_API_BASE_URL; 



//VERIFY LOGIN
export const verifyLogin = async (username,password) => {
  try {
    const endpoint = 'app/login/'; 
    const params = {username: username, password: password};
    const response = await axios.post(`${BASE_URL}/${endpoint}`, { params });
    return response.data.token;
  } catch (error) {
    console.error('Error fetching data from PHP API(globalFunctions.js):', error);
    return null;
  }
};


//GET DATA FROM DATABASE
export const fetchDataFromPHPAPI = async (endpoint, params = {}) => {
  try {

    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from PHP API(globalFunctions.js):', error);
    return null;
  }
};


//GET DOC TYPE
export const getDocType = async (module) => {
  try {
    const endpoint = 'api/taskpane/docType'; 
    const params = {module : module, ul_restriction : localStorage.ulCode};
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from DJANGO API(globalFunctions.js/getDocType):', error);
    return null;
  }
};


//GET DOC NO
export const getDocNo = async (docType, module) => {
  try {
    const endpoint = 'api/taskpane/docNo'; 
    const params = {doc_type: docType, module: module, ul_id: localStorage.ulCode};
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from DJANGO API(globalFunctions.js/getDocNo):', error);
    return null;
  }
};


//GET UNIT LOCATION
export const getUnitLocation = async () => {
  try {
    const endpoint = 'api/location'; 
    const params = {};
    const response = await axios.get(`${BASE_URL}/api/location`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from PHP API(globalFunctions.js):', error);
    return null;
  }
};



//GET SPECIFIC DATA FROM ARRAY
export const getSpecificDataFromArray = (dataArray, specificKey) => {
  return dataArray.find(item => item.next_no === item.next_no);
};



//SEARCH DATA
export const searchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from DJANGO API(globalFunctions.js/searchData):', error);
    return null;
  }
};



//GET TRANS TYPE
export const getTransType = async (params = {}) => {
  try {
    const endpoint = 'api/taskpane/transType'; 
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from PHP API(globalFunctions.js):', error);
    return null;
  }
};


//GET ACTIVITY TYPE
export const getActivityType = async (params = {}) => {
  try {
      const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': localStorage.csrfToken
        }
      };
      const endpoint = 'api/taskpane/activityType'; 
      const response = await axios.get(`${BASE_URL}/${endpoint}`, { params }, config);
      return response.data;
  } catch (error) {
      console.error('Error fetching data from DJANGO API(globalFunctions.js/getActivityType):', error);
    return null;
  }
};


//GET ACCOUNT TITLE BY DRAWEE BANK
export const getAcctTitleBasedOnDraweeBank = async (draweeID) => {
  try {
    const endpoint = 'app/AccTitleDraweeView'; 
    const params = {drawee:draweeID};
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from PHP API(globalFunctions.js):', error);
    return null;
  }
};




//GET ACCOUNT CODE  
export const getAccCode = async (acctTitle) => {
  try {
    const endpoint = 'app/AccCodeView'; 
    const params = {acctTitle:acctTitle};
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from PHP API(globalFunctions.js):', error);
    return null;
  }
};


//GET SL ACCOUNT
export const getSLAccount = async (primCodeValue,secCodeValue,accCodeValue,subCodeValue) => {
  try {
    const endpoint = 'app/SLNameView'; 
    const params = {
      code1: primCodeValue, code2:secCodeValue, code3:accCodeValue, code4:subCodeValue
    };
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from PHP API(globalFunctions.js):', error);
    return null;
  }
};



//CONVERT DATE
export const convertToStrDates = (d1, d2) => {
  try {
        const formattedFirstDate = numFormat(d1);
        const formattedLastDate = numFormat(d2);
        return { date1: formattedFirstDate, date2: formattedLastDate };
  } catch (error) {
    console.error('Error converting date(globalFunctions.js):', error);
    return null;
  }
};

const numFormat = (date) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return date.toLocaleDateString(undefined,options)
};

const strFormat = (date) => {
  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  return date.toLocaleDateString(undefined,options)
};


// GET CURRENT DATE
export const getCurrentMonthDates = () => {
  const currentDate = new Date();
  const formattedCurrentDate = numFormat(currentDate);
  localStorage.currentDate = strFormat(currentDate);
    return { curDate: formattedCurrentDate };
  };


  export const fetchToken = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/token`,{
        headers: {
          'X-CSRFToken':  localStorage.token},
          withCredential: true
          ,});
      return response.data;
    } catch (error) {
      console.error('Error fetching data from PHP API(globalFunctions.js):', error);
      return null;
    }
  };
    


