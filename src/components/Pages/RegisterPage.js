import React from 'react';
import  RegisterForm from '../Forms/RegisterForm'
import {connect} from 'react-redux'
import {googleUserData} from '../../actions/formActions' 
import {userRegisterRequest} from '../../actions/formActions'
import "../../css/bootstrap.min.css"
 
class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        const {userRegisterRequest} = this.props;
        const {googleUserData} = this.props;
        return (
            <div>
                <RegisterForm googleUserData={googleUserData} userRegisterRequest={userRegisterRequest}/>  
            </div>
        );
 
    }
}

export default connect(null,{userRegisterRequest,googleUserData}) (RegisterPage);
