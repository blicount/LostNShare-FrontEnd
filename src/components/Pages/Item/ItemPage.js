import React from 'react';
import axios from 'axios';

 
class ItemPage extends React.Component {
   /* constructor(props) {
        super(props);
 
    }
   */
    componentWillMount(){
        var url_string = window.location.href;		
        var url = new URL(url_string);
        var ids = url_string.lastIndexOf('/');
        ids = url_string.substr(ids+1);

        axios.get('https://lost-and-share.herokuapp.com/items/getItemById',{ headers: { id: ids }})         
        .then((data)=>{
            console.log(data);


           
        })
        .catch(function (error) {
            if (error.response) {
              console.log(error.response.headers);
            } 
            else if (error.request) {
              console.log(error.request);
            } 
            else {
              console.log(error.message);
            }
        console.log(error.config);
        });
    }

    render(){
    
        return (
            <div>
                  ss
            </div>
        );
 
    }
}




export default ItemPage;
