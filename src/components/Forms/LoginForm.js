import React from 'react';
import {withRouter} from 'react-router-dom';
import GoogleLogin from 'react-google-login';
//import GoogleLogout  from 'react-google-login';
//import {Redirect} from 'react-router-dom';
import "../../css/login.css";

import "../../css/bootstrap.min.css"

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            name:'',
            email:'',
            password:'',
            password2:'',
            err:'',
            status:'',
            token:'',
            provider_pic:'',
            provider:'lns',
            provider_id:'123809',
            login:false
    };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.googleLogin = this.googleLogin.bind(this);
    }
    
    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

        
    onSubmit(e){
        e.preventDefault();
       
        this.setState({status:'fail'})
        this.props.userLoginRequest(this.state)
        .then(            
            ({ data }) =>{
                console.log(data);         
                 this.setState({err:data.err,isLoading: false,status:data.status})
                 if(this.state.status === 'succsess'){
                    this.setState({id: data.user._id,name:data.user.name,email:data.user.email,token:'token',login:true})
                    sessionStorage.setItem("userData", JSON.stringify(this.state));                       
                    window.location.assign('/')            
                 }        
            }
        ).catch((error) =>{
            console.log(error);
            document.getElementById("label_email").style.color  = "red";
            document.getElementById("email").style.borderColor  = "red";
            document.getElementById("note").style.visibility = "visible";
            document.getElementById("label_password_login").style.color  = "red";
            document.getElementById("password").style.borderColor  = "red";
            
        })  

        
    }

    googleLogin(res,type){
        console.log(res);

        let postData;

        if (type === 'google' && res.w3.U3) {
            postData = {
                name: res.w3.ig,
                provider: type,
                email: res.w3.U3,
                provider_id: res.El,
                token: res.Zi.access_token,
                provider_pic: res.w3.Paa
            };
            this.setState({id: res.El,name:res.w3.ig,email:res.w3.U3,token:res.Zi.access_token,login:true})
        }
        sessionStorage.setItem("userData", JSON.stringify(this.state));         
        window.location.assign('/')

        /**check this is no woorking right/ */
        if (postData) {
            this.props.googleUserData('signup', postData).then(
               (result) => {
                    let responseJson = result;
                    sessionStorage.setItem("userData", JSON.stringify(responseJson));         
                    this.props.history.push('/');
                }
            );
        } else {
            
        }
    }


   

    render(){


        const responseGoogle = (response) => {
            this.googleLogin(response, 'google');
        }

        return (
            <div>
                <div className="row mt-5">
                    <div className="col-md-6 m-auto">
                        <div className="card card-body">                       
                        <form  onSubmit={this.onSubmit}>
                            <div className="form-group">
                            <label id="label_email" htmlFor="email">Email</label>
                            <input
                                value={this.state.email}
                                onChange={this.onChange}
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter Email"
                                
                            />
                            </div>
                            <div className="form-group">
                            <label id="label_password_login" htmlFor="password">Password</label>
                            <input
                                value={this.state.password}
                                onChange={this.onChange}
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Create Password"
                            
                            />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </form>
                        <GoogleLogin className="login"
                                clientId="945218038403-9ndjbhmb819ivlen57pf9v3ull0bn7l6.apps.googleusercontent.com"
                                buttonText="Login With Google"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                        />
                        <p className="lead mt-4">
                            No Account? <a href="/Register">Register</a>
                            <span id="note">Email or Password is incorect</span>
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



 


export default withRouter(Login) ;
