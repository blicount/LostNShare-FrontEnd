import React from 'react';
import "../../css/inventory_page.css"

class SideBar extends React.Component{
	constructor(props){
		super(props);
		
        this.getOptionsByTag =  this.getOptionsByTag.bind(this);
    }
    
	componentWillMount(){
		
    }
    
    getOptionsByTag(tag){

    }

	render(){
		return(
				<div id="side_bar">
                    <span className="form-group">
                        <label className="select " htmlFor="catagory">Catagory</label>
                        <select className="form-control">
                              {this.getOptionsByTag("Catagory")}
                        </select>
                        <label className="select" htmlFor="subcatagory">Sub Catagory</label>
                        <select className=" form-control">
                            {this.getOptionsByTag("SubCatagory")}
                        </select>
                        <label className="select" htmlFor="location">Location</label>
                        <select className="form-control">
                            {this.getOptionsByTag("Location")}
                        </select>
                    </span>
                    <span className="line"/>
                    <span className="form-group">
                        <label className="select " htmlFor="dateFrom">From Date:</label>
                        <input 
                            type="date"
                            name="dateTo"
                            className="form-control"
                        />
                        <label className="select" htmlFor="dateTo">To Date:</label>
                        <input 
                            type="date"
                            name="dateTo"
                            className="form-control"
                        />
                    </span>
                    <span className="line"/>
				</div>
			);
		}
	}
export default SideBar;

