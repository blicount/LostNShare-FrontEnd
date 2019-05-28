import axios from 'axios';

export function userRegisterRequest(userData) {
  return dispatch => {
    return axios.post('https://lost-and-share.herokuapp.com/users/register', userData);
   }
}

export function userReportRequest(form_data) {
  return dispatch => {
    return axios.post('https://lost-and-share.herokuapp.com/items/createItem', form_data);
  }
}

export function userUpdateRequest(form_data) {
  return dispatch => {
    return axios.put('https://lost-and-share.herokuapp.com/items/updateItem', form_data);
  }
}

export function userLoginRequest(userData) {
  return dispatch => {
    return axios.post('https://lost-and-share.herokuapp.com/users/login', userData);
  }
}

export function isUserExists(identifier) {
  return dispatch => {
    return axios.get(`/api/users/${identifier}`);
  }
}




export function googleUserData(type, userData) {
  
    //let BaseURL = 'http://localhost:3000/Register';
    //let BaseURL = 'http://localhost/socialapi/';
    
      return{} /*new Promise((resolve, reject) =>{
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
    */
  }