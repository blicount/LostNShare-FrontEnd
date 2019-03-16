import axios from 'axios';

export function userRegisterRequest(userData) {
  return dispatch => {
    return axios.post('https://lost-and-share.herokuapp.com/users/register', userData);
   }
}

export function userReportRequest(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}

export function userLoginRequest(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}




export function googleUserData(type, userData) {
  
  let BaseURL = 'http://localhost:3000/Register';
  //let BaseURL = 'http://localhost/socialapi/';
  
  return new Promise((resolve, reject) =>{
  fetch(BaseURL+type, {
      method: 'POST',
      body: JSON.stringify(userData)
  })
  .then((response) => response.json())
  .then((res) => {
      resolve(res);
  })
  .catch((error) => {
     reject(error);
  });
  
  });
  
  }