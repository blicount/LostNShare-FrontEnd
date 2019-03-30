import React from 'react';
import {withRouter} from 'react-router-dom';
import "../../css/bootstrap.min.css";
 
class Massage extends React.Component {
    constructor(props) {
        super(props);
        this.handelClick = this.handelClick.bind(this);
    }
   

    handelClick(){
        
        this.props.history.push('/login');
    }

    render(){
        return (
            <div className="row mt-5">
                <div className="col-md-6 m-auto">
                  <div className="card card-body">  
                        <label >You need to login\register in order to report a item</label>
                        <button onClick={this.handelClick} href="/login">login</button>
                    </div>
                </div>
            </div>
        );
 
    }
}




export default  withRouter(Massage);
