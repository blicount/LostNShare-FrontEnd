import React from 'react';
import Massage      from '../../../Objects/Massage';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import '../../../../css/profile.css'
import "../../../../css/bootstrap.min.css"

class Items extends React.Component{
	constructor(props){
		super(props)
		this.state = {
				owner_items:[]
		 }

	}

	componentWillMount(){
		

		var user = JSON.parse(sessionStorage.getItem('userData'));
		console.log(user.email)

		axios.post('https://lost-and-share.herokuapp.com/items/getItemByOwner', user )         
			.then((data)=>{
						console.log(data);
						this.setState({owner_items:data.data})}
			)
			.catch((error) =>{
					console.log(error);

					
			})
	}

 
	

	render(){
		if (sessionStorage.getItem('userData') == null) {
			return (<Massage/>)
		}
		return(
			<div className={this.props.isVisible} 	>
            { 	
                this.state.owner_items.reverse().map( (item, i) => {
							var isActive = item.itemstate;
                            return (
                                <span className="pofile_item" key={i}>
                                    <img alt="pic" className="pofile_item_img" src={'https://lost-and-share.herokuapp.com/' + item.picpath} />
									<p className="pofile_item_state">Item state: 
										<i style={item.itemstate === 'active'  ? {color:"green" }: {color:"red"}}>
											{' '+item.itemstate}
										</i>	
									</p>
									<p className="profile_item_category">Category:{' '+item.category}</p>
									<p className="profile_item_subcategory">SubCategory:{' '+item.subcategory}</p>
                                    <a className="pofile_item_title" href={'../item/' + item._id}   key={i}>{item.title}</a>
									<p className="pofile_item_description">{item.desc}</p>
									<p className="profile_item_type">Item case: 
										<i style={item.itemtype === 'Found' || item.itemtype === 'found' ? {color:"green" }: {color:"red"}}>
										{' '+item.itemtype}
										</i>	
									</p>
									<button className="btn btn-primary btn-block">Update</button>
									<button className="btn btn-primary btn-block">Remove</button>
                                </span>
                            )
                })
            }
            </div>
			
			);
		}
	}
export default withRouter(Items);

