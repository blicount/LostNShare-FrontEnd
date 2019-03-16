import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
//import {Redirect} from 'react-router-dom';
import ".../css/report.css";
import ".../css/bootstrap.min.css"

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            email:'',
            password:'',
            password2:''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        e.preventDefault();
       
        this.setState({err:{},isLoading: true})
        this.props.userReportRequest(this.state).then(            
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

    render(){


        return (
            <div>
                <div className="row mt-5 row-report">
                    <div className="col-md-6 m-auto">
                        <div className="card card-body report-card"> 
                        <h3>Item Information</h3>                      
                        <form  method="POST" onSubmit={this.onSubmit}>
                            <div className="form-group">
                            <label htmlFor="tilte">Tilte</label>
                            <input
                                value={this.state.title}
                                onChange={this.onChange}
                                type="title"
                                id="title"
                                name="title"
                                className="form-control form-control-report"
                                placeholder="Enter Item Title"
                                
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                value={this.state.description}
                                onChange={this.onChange}
                                type="description"
                                id="description"
                                name="description"
                                className="form-control form-control-report"
                                placeholder="Enter Item Description"
                                
                            />
                            </div>
                            <div className="form-group">
                            <label htmlFor="state">Item State:</label>
                            <input type="radio"   checked
                                value={this.state.itemstate}
                                onChange={this.onChange}
                                id="itemstate"
                                name="itemstate"
                                className="radio"
                            /> Lost
                            <input type="radio"  
                                value={this.state.itemstate}
                                onChange={this.onChange}
                                id="itemstate"
                                name="itemstate"
                                className="radio"
                            /> Found
                            </div>
                            <div className="form-group upload_photo ">
                            <label for="file-upload" class="custom-file-upload">
                                <i class="fa fa-cloud-upload"></i> Upload Photo
                            </label>
                            <input id="file-upload" type="file"/>
                            <div className="photo"></div>
                            </div>

                            <div className="form-group">
                            <label className="select" htmlFor="catagory">Catagory</label>
                            <select className="form-control-report form-control">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                            <label className="select" htmlFor="subcatagory">Sub Catagory</label>
                            <select className="form-control-report form-control">
                                <option value="volvo">Volvo</option>
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
                            </select>
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">
                            Submit
                            </button>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



 


export default withRouter(ReportPage);
