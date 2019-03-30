import axios from 'axios';


 export function getListItem(cuerrent_state) {
  return dispatch =>{
     axios.get('https://lost-and-share.herokuapp.com/items/getAll' +cuerrent_state+ 'Items/')
  }
}

export function getUserData(user_email) {
   return dispatch =>{
      axios.get('https://lost-and-share.herokuapp.com/userdetails/' +user_email)
   }
 }
 
