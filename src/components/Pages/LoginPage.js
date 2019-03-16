import React from 'react';
import  LoginForm from '../Forms/LoginForm'
import {connect} from 'react-redux'
import {userLoginRequest} from '../../actions/formActions'
import {googleUserData} from '../../actions/formActions'
import "../../css/logto.css";
import "../../css/bootstrap.min.css"
 
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.googleUserData = this.googleUserData.bind(this);
    }
   
    googleUserData(action,data){
        googleUserData(action,data);
    }

    render(){
        const {userLoginRequest} = this.props;

        return (
            <div>
                <LoginForm userLoginRequest={userLoginRequest} />  
            </div>
        );
 
    }
}




export default connect(null,{userLoginRequest} ) (LoginPage);
