import React from 'react';
//import axios from 'axios';
import {withRouter} from 'react-router-dom';
//import {Redirect} from 'react-router-dom';
import "../../css/report.css";
import "../../css/bootstrap.min.css"
//import LoginPage from '../Pages/LoginPage';

class ReportForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            description:'',
            file:'',
            image:'',
            imagePreviewUrl:'',
            selected_category:'',
            selected_sub_category:'',
            sub_category:[],
            category:[]

        };
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    }


    componentWillMount(){
        fetch('https://lost-and-share.herokuapp.com/Categories/getAllCategories')         
        .then((Response)=>Response.json())
        .then((data)=>{
                    //console.log(data);
                    this.setState({category:data})
                }
            ); 
       /* fetch('https://lost-and-share.herokuapp.com/location')         
        .then((Response)=>Response.json())
        .then((data)=>{
                    console.log(data);
                    this.setState({location:data})}
            ); */  		
    }


    onChangeCategory(e){
        var index = e.target.selectedIndex
        var selectedCategory = this.state.category[index-1].name
        document.getElementById('subCategory').innerHTML = '';
        this.setState({selected_category:this.state.category[index-1].name})
        fetch('https://lost-and-share.herokuapp.com/subcategories/getAllSubCategoryByCategory/'+ selectedCategory )         
        .then((Response)=>Response.json())
        .then((data)=>{                 
                    this.setState({
                        sub_category:data.subcategorylist,
                        selected_sub_category:data.subcategorylist[0]
                    })
                    data.subcategorylist.map( (sub_cat, i) => {
                        var op = document.createElement("option");
                        var textnode = document.createTextNode(sub_cat); 
                        op.className = 'sub_category';
                        op.key = i;
                        op.appendChild(textnode);
                        document.getElementById('subCategory').appendChild(op);
                        return(null);        
                    })    
        }).catch((error) => (console.log(error))); 
       
    }

    onChangeSubCategory(e){
        var index = e.target.selectedIndex;
        var selectedSubCategory = this.state.sub_category[index];
        this.setState({selected_sub_category:selectedSubCategory});
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    fileSelectedHandler(e){
        e.preventDefault();
        if (!e.target.files[0].type.match(/image.*/)) {
            console.log("this is not an image");
            return;
        };
        const fd = new FormData();
        fd.append('image',e.target.files[0],e.target.files[0].name)
        this.setState({ image:fd})
        
        console.log(e.target.files[0]);
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(file)
    }

    onSubmit(e){
        e.preventDefault();
       


        this.props.userReportRequest(this.state).then(            
            ({ data }) =>{
                 this.setState({err:data.err,isLoading: false,status:data.status})
                 if(this.state.title === null || this.state.description === null){
                    
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
        ).catch((error) =>{
            console.log(error);
            
        });      
    }



    render(){
       
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img alt="pic" src={imagePreviewUrl} />);
        } else {
          $imagePreview = ('');
        }
        return (
            <div>
                <div className="row mt-5 row-report">
                    <div className="col-md-6 m-auto">
                        <div className="card card-body report-card"> 
                        <h3>Item Information</h3>                      
                        <form  onSubmit={this.onSubmit}>
                            <div className="form-group">
                            <label htmlFor="title">Tilte</label>
                            <input
                                value={this.state.title}
                                onChange={this.onChange}
                                type="title"
                                id="title"
                                name="title"
                                required
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
                                required
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
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <i className="fa fa-cloud-upload"></i> Upload Photo
                            </label>
                            <input id="file-upload" type="file" onChange={this.fileSelectedHandler }/>
                            <div className="imgPreview">{$imagePreview}</div>
                            </div>

                            <div className="form-group">
                            <label className="select" htmlFor="catagory">Catagory</label>
                            <select required className="form-control-report form-control" onChange={this.onChangeCategory}>
                                <option  value="blank" >...</option>
                                { 
                                    this.state.category.map( (cat, i) => {
                                    return (
                                        <option  className="category" key={i}>{cat.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label  className="select" htmlFor="subcatagory">Sub Catagory</label>
                            <select required id="subCategory" className="form-control-report form-control"
                                 onChange={this.onChangeSubCategory}>
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



 


export default withRouter(ReportForm);
