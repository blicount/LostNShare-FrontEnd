import React from 'react';
import Massage      from '../../../Objects/Massage';
import axios from 'axios'

class General extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			user:[],
			profile_name:'',
			profile_email:'',
			profile_phone:'',
			old_password:'',
			password_confirm_1:'',
			password_confirm_2:''

		 }
		this.onChange = this.onChange.bind(this)
	}

	componentWillMount(){
		var user  = JSON.parse( sessionStorage.getItem('userData'))
		//console.log(user)
		this.setState({user:user})
	}

	onChange(e){
		console.log(e.target.value)
        this.setState({[e.target.name]: e.target.value});
    }
	
	onSubmit(e){
		e.preventDefault();
		console.log(e)
		axios.post('https://lost-and-share.herokuapp.com/Users/UpdateUser',{
				email : this.state.profile_email,
				phone: this.state.phone,
				password: this.state.password,
				name:this.state.name
			}).then((respone) => {
				console.log(respone.data)
				this.setState({
					userList:respone.data
				})
			}).catch((error) => {
				console.log(error);
			})
	}

	render(){
		if (sessionStorage.getItem('userData') == null) {
			return (<Massage/>)
		}
		
		return(
			<div className={this.props.isVisible}>
                <div className="card card-body">
					<form  onSubmit={this.onSubmit}>	                  
						<div className="form-group">
								<label htmlFor="profile_name">Name</label>
								<input
									value={this.state.user.name}
									onChange={this.onChange}
									type="name"
									id="profile_name"
									name="profile_name"
									className="form-control"
									placeholder="Enter Name"
									pattern=".{3,10}" required title="3 to 10 characters"
								/>                    
								</div>
								<div className="form-group">
								<label htmlFor="email" id="profile_email">Email</label>
								<input
									value={this.state.user.email}
									onChange={this.onChange}
									type="email"
									id="profile_email"
									name="profile_email"
									className="form-control"
									placeholder="Enter Email"
									required                   
								/>
								</div>
								<div className="form-group">
								<label htmlFor="profile_phone">Phone</label>
								<input
									value={this.state.user.phone}
									onChange={this.onChange}
									type="phone"
									id="profile_phone"
									name="profile_phone"
									className="form-control"
									placeholder="Enter phone"
									pattern=".{10}" required title="05..."
								/>                    
								</div>
								<div className="form-group">
								<label id="label_password" htmlFor="password_confirm_1">Password</label>
								<input
									
									onChange={this.onChange}
									type="password"
									id="old_password"
									name="old_password"
									className="form-control"
									placeholder="Old Password"
									pattern=".{6,10}" required title="6 to 10 characters"               
								/>
								</div>
								<div className="form-group">
								<label id="label_password" htmlFor="password_confirm_2">Confirm Password</label>
								<input
									
									onChange={this.onChange}
									type="password"
									id="password_confirm_1"
									name="password_confirm_1"
									className="form-control"
									placeholder="New Password"
									pattern=".{6,10}" required title="6 to 10 characters"               
								/>
								</div>
								<div className="form-group">
								<label htmlFor="password2">New Password</label>
								<input
									
									onChange={this.onChange}
									type="password"
									id="password_confirm_2"
									name="password_confirm_2"
									className="form-control"
									placeholder="Confirm"  
									pattern=".{6,10}" required title="6 to 10 characters"     
								/>
						</div>
						<button type="submit" className="btn btn-primary btn-block submit">
                            Update Details
                        </button>
					</form>
                </div>
            </div>
			
			);
		}
	}
export default General;

