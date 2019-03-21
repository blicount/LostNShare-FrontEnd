import React from 'react';
import "../../css/profile.css"

class ProfileNav extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            category:[],
            sub_category:[],
            date_to:'',
            date_until:'',
            location:''

        }
    }
    
	componentWillMount(){
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
    }
    

	render(){
		return(
				<div id="profile_nav">
                        <li><a href="/">General</a></li>
                        <li><a href="/">Inbox</a></li>
                        <li><a href="/">My Items</a></li>
                        <li><a href="/">Report List</a></li>
                        <li><a href="/">Options</a></li>                  
				</div>
			);
		}
	}
export default ProfileNav;

