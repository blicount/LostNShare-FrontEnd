import React from 'react';
import Massage      from '../../../Objects/Massage';


class General extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			user:[],

		 }
		
	}

	componentWillMount(){
		var user  = JSON.parse( sessionStorage.getItem('userData'))
		console.log(user)
		this.setState({user:user})
	}

	onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
	
	onSubmit(e){
        e.preventDefault();
       
        this.props.userRegisterRequest(this.state).then(            
            ({ data }) =>{
                console.log(data);
                 this.setState({err:data.err,isLoading: false,status:data.status})
                 if(this.state.password !== this.state.password2){
                    document.getElementById("password").style.borderColor  = "red";
                    document.getElementById("password2").style.borderColor  = "red";
                    document.getElementById("label_password").innerHTML = "Passwords - dosen't match";
                    document.getElementById("label_password").style.color  = "red";  
                 }
                 else if(this.state.status === 'fail'){
                    document.getElementById("email").style.borderColor  = "red";
                    document.getElementById("label_email").innerHTML = "Email - this Email is already in use";
                    document.getElementById("label_email").style.color  = "red";  
                    this.setState({err:{},isLoading: false,status:{}})      
                }else{
                    this.setState({login:true})
                    sessionStorage.setItem("userData", JSON.stringify(this.state));  
                    window.location.assign('/')

                }
            }
        ).catch((error) =>{
            console.log(error);
            
        });   
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
								<label id="label_password" htmlFor="password_confirm_1">Password</label>
								<input
									value={this.state.password_confirm_1}
									onChange={this.onChange}
									type="password_confirm_1"
									id="password_confirm_1"
									name="password"
									className="form-control"
									placeholder="Old Password"
									pattern=".{6,10}" required title="6 to 10 characters"               
								/>
								</div>
								<div className="form-group">
								<label id="label_password" htmlFor="password_confirm_2">Confirm Password</label>
								<input
									value={this.state.password_confirm_2}
									onChange={this.onChange}
									type="password"
									id="password_confirm_2"
									name="password_confirm_2"
									className="form-control"
									placeholder="Confirm Password"
									pattern=".{6,10}" required title="6 to 10 characters"               
								/>
								</div>
								<div className="form-group">
								<label htmlFor="password2">New Password</label>
								<input
									value={this.state.new_password}
									onChange={this.onChange}
									type="password"
									id="new_password"
									name="new_password"
									className="form-control"
									placeholder="New Password"  
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

