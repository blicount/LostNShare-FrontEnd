import React from 'react';
import Massage      from '../../../Objects/Massage';
import axios from 'axios';


class UserMannage extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			userList:[]
		 }
		 this.deleteUser = this.deleteUser.bind(this)
	}

	componentDidMount(){
		axios.get('https://lost-and-share.herokuapp.com/Users/getAllUsers').then((respone) => {
			console.log(respone.data)
			this.setState({
				userList:respone.data
			})
		})
	}
	
	deleteUser(e) {
		var index = e.target.getAttribute('index');
		/*if (index !== null) {
			var id = this.state.owner_items[index]._id;
			var email = this.state.owner_items[index].owner;
			axios.delete('https://lost-and-share.herokuapp.com/items/DeleteUser', { data: { id, email } }).then(
				(respone) => {
					if (respone.data === "Item deleted") {
						this.setState({
							owner_items: this.state.owner_items.
								filter(function (item) {
									return item._id !== id
								})
						});
					}
				}
			)
		}*/
	}

	render(){
		if (sessionStorage.getItem('userData') == null) {
			return (<Massage/>)
		}
		return(
			<div className={this.props.isVisible}>
				<div className="row mt-5">
				<div className="col-md-11 m-auto">	
				{
					this.state.userList.map((rep,i)=>{
						return(
								<div key={i} className="card card-body userM">  
									<p>{i + ". "}{rep.email}</p>	
									<button onClick={this.deleteUser} index={i} className="btn btn-primary">Remove</button>
								</div>
						)
					})
				}
				</div>
				</div>
            </div>
			
			);
		}
	}
export default UserMannage;

