import React from 'react';
import {connect} from 'react-redux'
import {userReportRequest} from '../../actions/formActions'
//import {Redirect} from 'react-router-dom';
import  ReportForm from '../Forms/ReportFrom'
import "../../css/bootstrap.min.css"
//import LoginPage from './LoginPage';
import Massage from '../Objects/Massage'

class RegisterPage extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {}
    }


    render(){
        if (sessionStorage.getItem('userData') == null) {
            return (<Massage/>)
        }

        const {userReportRequest} = this.props;
        return (
            <div>
                <ReportForm userReportRequest={userReportRequest}/>  
            </div>
        );
 
    }
}




export default connect(null,{userReportRequest} ) (RegisterPage);
