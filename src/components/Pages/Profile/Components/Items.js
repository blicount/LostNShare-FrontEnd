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
		 
		 this.updateItem = this.updateItem.bind(this);
		 this.deleteItem = this.deleteItem.bind(this);
	}

	componentWillMount(){
		var user = JSON.parse(sessionStorage.getItem('userData'));
		console.log(user.email)

		axios.post('https://lost-and-share.herokuapp.com/items/getItemByOwner', user )         
			.then((data)=>{
				console.log(data.data)
						if(data.data !== 'no Item found'){
							this.setState({owner_items:data.data})
						}			
					}
			)
			.catch((error) =>{
					console.log(error);			
			})
	}

 
	updateItem(e){
		var index = e.target.getAttribute('index');
		if(index !== null){
			var item = this.state.owner_items[index];
			var owner = this.state.owner_items[index].owner;
			
		}
	}

	deleteItem(e){
		var index = e.target.getAttribute('index');
		if(index !== null){
			var id 	= this.state.owner_items[index]._id;
			var email	 = this.state.owner_items[index].owner;
			axios.delete('https://lost-and-share.herokuapp.com/items/DeleteItem',{data:{id,email}}).then(
				(respone) => {
					if(respone.data === "Item deleted")
					{
						this.setState({owner_items: this.state.owner_items.
							filter(function(item) { 
							return item._id !== id
						})});
					}
				}
			)
		}	
	}

	render(){
		if (sessionStorage.getItem('userData') == null) {
			return (<Massage/>)
		}
		if(this.state.owner_items.length > 0){
			return(
				<div className={this.props.isVisible} 	>
				{ 
					this.state.owner_items.map( (item, i) => {
								var isActive = item.itemstate;
								return (
									<div>
										<span className="pofile_item" key={i} >
											<img alt="pic" className="pofile_item_img" src={item.picpath ? 'https://lost-and-share.herokuapp.com/' + item.picpath : ''} />
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
											<button onClick={this.updateItem} index={i}  className="btn btn-primary btn-block">Update</button>
											<button onClick={this.deleteItem} index={i}  className="btn btn-primary btn-block">Remove</button>
										</span>
										<span  className="pofile_item_update">d</span>
									</div>
								)
					})
					
				}
				</div>
				);
			}
			else{
				return(
					<p>No items are listed</p>
				)
			}
		}
	}
export default withRouter(Items);

