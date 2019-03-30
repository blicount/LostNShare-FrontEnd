import React from 'react';
import {withRouter} from 'react-router-dom';

import "../../../../css/profile.css"

class ProfileNav extends React.Component{
	constructor(props){
		super(props);
        this.state = {


        }
    }
    
    componentWillMount(){

    }

	
/*
        fetch('https://lost-and-share.herokuapp.com/Categories/getAllCategories')         
        .then((Response)=>Response.json())
        .then((data)=>{
                    //console.log(data);
                    this.setState({category:data})
                    console.log(data[0].name);
                    fetch('https://lost-and-share.herokuapp.com/subcategories/getAllSubCategoryByCategory/'+ data[0].name )         
                    .then((Response)=>Response.json())
                    .then((data)=>{
                                //console.log(data);
                                this.setState({sub_category:data.subcategorylist})}
                        );  
                
                
                }
            ); 
	*/	
    
    

	render(){
        let linksMarkup = this.props.links.map((link, index) => {
            let linkMarkup = link.active ? (
                <p  className="selected">{link.label}</p>
              ) : (
                  <p  className="">{link.label}</p>
              );    
              return (
                <span onClick={this.props.handleClickSelection} key={index} className="menu__list-item">
                    {linkMarkup }
                </span>
            );
          });
		return(
				<div id="profile_nav">
                     {linksMarkup}                  
				</div>
                
			);
		}
	}
export default withRouter( ProfileNav);

