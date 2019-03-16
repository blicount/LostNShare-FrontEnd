import React from 'react';
import axios from 'axios';
import Item from './Item'
import "../../css/inventory_page.css"

class Container extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            items:[],
            cuerrent_state:'Found'
        }
	}
	 componentWillMount(){

        fetch('https://lost-and-share.herokuapp.com/items/getAll' +this.state.cuerrent_state+ 'Items/')         
        .then((Response)=>Response.json())
        .then((data)=>{
                    //console.log(data);
                    this.setState({items:data})}
            );
             
    }


	render(){

		return(
				<article id="container">
                      { this.state.items.map( (item, i) => {
                          console.log(item._id);
                          return (<li key={i}><p className="p_id">{item._id}</p></li>)
                        }) }
       			</article>
			);
		}
	}
export default  Container;

