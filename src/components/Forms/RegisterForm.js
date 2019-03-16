import React from 'react';
import {withRouter} from 'react-router-dom';
import GoogleLogin from 'react-google-login';

//import GoogleLogout  from 'react-google-login';
import {Redirect} from 'react-router-dom';
import "../../css/logto.css";
import "../../css/bootstrap.min.css"

class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
           this.state = {
            name:'',
            email:'',
            password:'',
            password2:'',
            err:'',
            status:''
    };
    
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.googleSignup = this.googleSignup.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
       
        this.setState({err:{},isLoading: true})
        this.props.userRegisterRequest(this.state).then(            
            ({ data }) =>{
                 this.setState({err:data.err,isLoading: false,status:data.status})
                 if(this.state.password !== this.state.password2){
                    document.getElementById("password").style.borderColor  = "red";
                    document.getElementById("password2").style.borderColor  = "red";
                    document.getElementById("Label_password").innerHTML = "Passwords - dosen't match";
                    document.getElementById("Label_password").style.color  = "red";  
                 }
                 else if(this.state.status === 'fail'){
                    document.getElementById("email").style.borderColor  = "red";
                    document.getElementById("Label_email").innerHTML = "Email - this Email is already in use";
                    document.getElementById("Label_email").style.color  = "red";  
                    this.setState({err:{},isLoading: false,status:{}})      
                }else{
                    this.props.history.push('/');
                }
            }
        );   
    }

    
    googleSignup(res, type) {
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
        }

        if (postData) {
            this.props.googleUserData('signup', postData).then((result) => {
            let responseJson = result;
            localStorage.setItem("userData", JSON.stringify(responseJson));
            
            this.props.history.push('/');
        });
        } else {}
    }

    render(){
        if (this.state.redirect || sessionStorage.getItem('userData')) {
            return (<Redirect to={'/Main'}/>)
        }

        const responseGoogle = (response) => {
            console.log("google console");
            console.log(response);
            this.googleSignup(response, 'google');
        }

        return (
            <div>
                <div className="row mt-5"></div>
                    <div className="col-md-6 m-auto">
                        <div className="card card-body">                  
                        <form  onSubmit={this.onSubmit}>
                            <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                value={this.state.name}
                                onChange={this.onChange}
                                type="name"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter Name"
                                pattern=".{3,10}" required title="3 to 10 characters"

                            />
                            
                            </div>
                            <div className="form-group">
                            <label htmlFor="email" id="Label_email">Email</label>
                            <input
                                value={this.state.email}
                                onChange={this.onChange}
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                placeholder="Enter Email"
                                required
                                
                            />
                            </div>
                            <div className="form-group">
                            <label id="Label_password" htmlFor="password">Password</label>
                            <input
                                value={this.state.password}
                                onChange={this.onChange}
                                type="password"
                                id="password"
                                name="password"
                                className="form-control"
                                placeholder="Create Password"
                                pattern=".{6,10}" required title="6 to 10 characters"
                            
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="password2">Confirm Password</label>
                            <input
                                value={this.state.password2}
                                onChange={this.onChange}
                                type="password"
                                id="password2"
                                name="password2"
                                className="form-control"
                                placeholder="Confirm Password"  
                                pattern=".{6,10}" required title="6 to 10 characters"
                  
                            />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block submit">
                            Register
                            </button>
                        </form>
                        <GoogleLogin
                            clientId="945218038403-9ndjbhmb819ivlen57pf9v3ull0bn7l6.apps.googleusercontent.com"
                            buttonText="Login with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />
                        <p className="lead mt-4">Have An Account? <a href="Login">Login</a></p>
                        </div>
                    </div>
            </div>
        );
    }
}

export default withRouter(RegisterForm);
