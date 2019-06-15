import React from 'react';
import Massage from '../../../Objects/Massage';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import UpdateItem from './UpdateItem';
import { userUpdateRequest } from '../../../../actions/formActions'
import '../../../../css/profile.css'
import "../../../../css/bootstrap.min.css"

class Items extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			owner_items: [],
			updateItemSelected: null,
			selectedIndex: null
		}

		this.updateItem = this.updateItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.hideUpdateForm = this.hideUpdateForm.bind(this);
		this.matchItem = this.matchItem.bind(this);
	}



	componentWillMount() {
		var user = JSON.parse(sessionStorage.getItem('userData'));
		var mannager = false;
		if(user !== null){
			axios.post('https://lost-and-share.herokuapp.com/users/CheckIfManger', { email: user.email } ).then(            
				({ data }) =>{
			
					mannager = data;
					if(this.props.ItemMannage === undefined ||  this.props.ItemMannage !== true) {
						mannager = false;
					}
					if (mannager) {
						axios.get('https://lost-and-share.herokuapp.com/items/getAllItems')
						.then((data) => {
							console.log(data.data)
							if (data.data !== 'no Item found') {
								this.setState({ owner_items: data.data })
							}
						}
						)
						.catch((error) => {
							console.log(error);
						})

					} else {
						axios.post('https://lost-and-share.herokuapp.com/items/getItemByOwner', user)
						.then((data) => {
							console.log(data.data)
							if (data.data !== 'no Item found') {
								this.setState({ owner_items: data.data })
							}
						}
						)
						.catch((error) => {
							console.log(error);
						})
					}

				}                                                                                  
				
			).catch((error) =>{
				console.log(error);      
			}) 
		
		

		}
	}


	updateItem(e) {
		var index = e.target.getAttribute('index');
		if (index !== null) {
			document.getElementsByClassName('update_item')[0].style.visibility = "visible";
			this.setState({ updateItemSelected: this.state.owner_items[index], selectedIndex: index })
		}
	}

	deleteItem(e) {
		var index = e.target.getAttribute('index');
		if (index !== null) {
			var id = this.state.owner_items[index]._id;
			var email = this.state.owner_items[index].owner;
			axios.delete('https://lost-and-share.herokuapp.com/items/DeleteItem', { data: { id, email } }).then(
				(respone) => {
					if (respone.data === "Item deleted" || respone.data === "Item deleted without delete events attached" || respone.data === "Item and events attached deleted") {
						this.setState({
							owner_items: this.state.owner_items.
								filter(function (item) {
									return item._id !== id
								})
						});
					}
				}
			)
		}
	}

	hideUpdateForm(e) {
		document.getElementsByClassName('update_item')[0].style.visibility = "hidden";
		this.setState({ updateItemSelected: '', selectedIndex: '' })
		var user = JSON.parse(sessionStorage.getItem('userData'));

		if(user !== null){
			axios.post('https://lost-and-share.herokuapp.com/items/getItemByOwner', user)
				.then((data) => {
					//console.log(data.data)
					if (data.data !== 'no Item found') {
						this.setState({ owner_items: data.data })
					}
				}
				)
				.catch((error) => {
					console.log(error);
				})
		}
	}


	matchItem(e){
		var index = e.target.getAttribute('index');
		if (index !== null) {
			axios.get('https://lost-and-share.herokuapp.com/items/matchingServiceForItem/' + this.state.owner_items[ index]._id)
				.then((data) => {
					this.props.history.push('../../item/' + this.state.owner_items[index]._id)
				})
				.catch((error) => {
					console.log(error);
				})
		}
	}

	render() {
		const { userUpdateRequest } = this.props;
		if (sessionStorage.getItem('userData') == null) {
			return (<Massage />)
		}
		if (this.state.owner_items.length > 0) {
			return (
				<div className={this.props.isVisible} 	>
					{
						this.state.owner_items.map((item, i) => {
							var isActive = item.itemstate;
							return (

								<span className="pofile_item" key={i} >
									<img alt="pic" className="pofile_item_img" src={item.picpath } />
									<p className="pofile_item_state">Item state:
												<i style={item.itemstate === 'active' ? { color: "green" } : { color: "red" }}>
											{' ' + item.itemstate}
										</i>
									</p>
									<p className="profile_item_category">Category:{' ' + item.category}</p>
									<p className="profile_item_subcategory">SubCategory:{' ' + item.subcategory}</p>
									<a className="pofile_item_title" href={'../../item/' + item._id} key={i}>{item.title}</a>
									<p className="pofile_item_description" >{item.desc}</p>
									<p className="profile_item_type">Item case:
												<i style={item.itemtype === 'Found' || item.itemtype === 'found' ? { color: "green" } : { color: "red" }}>
											{' ' + item.itemtype}
										</i>
									</p>
									<button onClick={this.updateItem} index={i} className="btn btn-primary btn-block">Update</button>
									<button onClick={this.deleteItem} index={i} className="btn btn-primary btn-block">Remove</button>
									<button onClick={this.matchItem}  index={i} className="btn btn-primary btn-block">Match</button>

								</span>


							)
						})

					}
					<UpdateItem item={this.state.updateItemSelected} hideUpdateForm={this.hideUpdateForm} userUpdateRequest={userUpdateRequest} />
				</div>
			);
		}
		else {
			return (	
				<div className={this.props.isVisible === 'hidden' ? 'hidden' :"visible row mt-5"}>
					<div className="col-md-6 m-auto">
						<div className="card card-body">  
							<p className= "massage" >No items are listed</p>
						</div>
					</div>
				</div>
			)
		}
	}
}
export default withRouter(connect(null, { userUpdateRequest })(Items));

