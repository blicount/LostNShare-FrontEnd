import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { userReportRequest } from '../../actions/formActions'
import ReportForm from '../Forms/ReportFrom'
import Massage from '../Objects/Massage'
import "../../css/bootstrap.min.css"

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        if (sessionStorage.getItem('userData') == null) {
            return (<Massage />)
        }
        const { userReportRequest } = this.props;
        return (
            <div>
                <ReportForm userReportRequest={userReportRequest} />
            </div>
        );
    }
}

export default withRouter(connect(null, { userReportRequest })(RegisterPage));
