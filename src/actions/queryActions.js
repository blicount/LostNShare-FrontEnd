import axios from 'axios';


 export function getListItem(cuerrent_state) {
  return dispatch =>{
     axios.get('https://lost-and-share.herokuapp.com/items/getAll' +cuerrent_state+ 'Items/')
  }
}

