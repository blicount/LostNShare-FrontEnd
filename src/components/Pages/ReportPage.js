import React from 'react';
import  RegisterForm from '../Forms/RegisterForm'
import {connect} from 'react-redux'
import {userReportRequest} from '../../actions/formActions'
import "../../css/logto.css";
import "../../css/bootstrap.min.css"
 
class RegisterPage extends React.Component {
    /*
    constructor(props) {
        super(props);
    }
   */
    render(){
        const {userReportRequest} = this.props;
        return (
            <div>
                <RegisterForm userReportRequest={userReportRequest}/>  
            </div>
        );
 
    }
}




export default connect(null,{userReportRequest} ) (RegisterPage);
