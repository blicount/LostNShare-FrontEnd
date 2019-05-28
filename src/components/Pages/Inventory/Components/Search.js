import React from 'react';
import "../../../../css/inventory_page.css"

class Serach extends React.Component{
	constructor(props){
        super(props);
        this.state={
            view:'List',
            search_string:''
        }
        this.onChange = this.onChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this)
	}
	componentWillMount(){
		
    }
    
    onChange(e) {
        //update q.str state to current serach
        this.setState({ [e.target.name]: e.target.value });
        //clear search an update with porps
        if(e.target.value === ""){
            this.props.handleSearch('');
        }
    }

    handleSearch(){
        //update search went clicked
        this.props.handleSearch(this.state.search_string);
    }

	render(){
		return(
				<span id='search'>
                    <div >
                        <input 
                            onChange={this.onChange}
                            value={this.state.search_string} 
                            type="sreach"
                            name="search_string"
                            className="form-control src"
                            placeholder="Search"
                        />    
                        <button type="submit"  onClick={this.handleSearch}>
                            <i id="btn-search"  ></i>
                        </button>
                    </div>
                    <span className="form-group view-span">
                        <select className="form-control view">
                              <option>List</option>
                              <option>Gallary</option>
                        </select>
                    </span>
                    <span className="form-group order-span">
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

