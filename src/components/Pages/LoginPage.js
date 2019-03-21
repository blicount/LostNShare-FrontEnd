import React from 'react';
import  LoginForm from '../Forms/LoginForm'
import {connect} from 'react-redux'
import {userLoginRequest} from '../../actions/formActions'
import {googleUserData} from '../../actions/formActions'
import "../../css/bootstrap.min.css"
 
class LoginPage extends React.Component {
   /* constructor(props) {
        super(props);
 
    }
   */

    render(){
        const {userLoginRequest} = this.props;
        const {googleUserData} = this.props;

        return (
            <div>
                <LoginForm googleUserData={googleUserData} userLoginRequest={userLoginRequest} />  
            </div>
        );
 
    }
}




export default connect(null,{userLoginRequest,googleUserData} ) (LoginPage);
