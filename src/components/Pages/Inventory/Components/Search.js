import React from 'react';
import "../../../../css/inventory_page.css"

class Serach extends React.Component{
	constructor(props){
        super(props);
        this.state={
            view:'List'
        }
		
	}
	componentWillMount(){
		
	}

	render(){
		return(
				<span id='search'>
                    <input 
                        type="sreach"
                        name="dateTo"
                        className="form-control src"
                        placeholder="Search"
                     />    
                    <button type="submit"><i id="btn-search"></i></button>
                    <span className="form-group">
                        <select className="form-control view">
                              <option>List</option>
                              <option>Gallary</option>
                        </select>
                    </span>
                    <span className="form-group">
                        <select className="form-control order">
                              <option>Date added</option>
                              <option>Top match</option>
                        </select>
                    </span>
                    <hr></hr>
				</span>    
			);
		}
	}
export default Serach;

