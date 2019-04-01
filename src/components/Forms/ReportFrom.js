import React from 'react';
//import axios from 'axios';
import {withRouter} from 'react-router-dom';
//import {Redirect} from 'react-router-dom';
import "../../css/report.css";
import "../../css/bootstrap.min.css"
import axios from 'axios';
//import LoginPage from '../Pages/LoginPage';

class ReportForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            description:'',
            file:'',
            image:'',
            item_state:'lost',
            location:'test',
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
        axios.get('https://lost-and-share.herokuapp.com/Categories/getAllCategories')         
        .then((data)=>{
                    this.setState({category:data.data,selected_category:data.data[0]._id})
                    axios.post('https://lost-and-share.herokuapp.com/subcategories/getAllSubCategoryByCategory', {category:data.data[0].name} )         
                    .then((data)=>{ 
                        console.log(data);
                
                                this.setState({
                                    sub_category:data.data.subcategorylist,
                                    selected_sub_category:data.data.subcategorylist[0]
                                })
                                data.data.subcategorylist.map( (sub_cat, i) => {
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
        var selectedCategory = this.state.category[index].name
        document.getElementById('subCategory').innerHTML = '';
        this.setState({selected_category:this.state.category[index].name})
        axios.post('https://lost-and-share.herokuapp.com/subcategories/getAllSubCategoryByCategory', {category:this.state.category[index].name})         
        .then((data)=>{           
            console.log(data.data)      
                    this.setState({
                        sub_category:data.data.subcategorylist,
                        selected_sub_category:data.data.subcategorylist[0]
                    })
                    data.data.subcategorylist.map( (sub_cat, i) => {
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
            //console.log("this is not an image");
            return;
        };
        const fd = new FormData();
        console.log(e.target.files[0])
        console.log(e.target.files[0].name)

        fd.append('image',e.target.files[0],e.target.files[0].name)
        this.setState({ image:e.target.files[0]})
        
        console.log(fd);
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

        var user = JSON.parse(sessionStorage.getItem('userData'));
        var itemData = {
            email       : user.email,
            itemtype    : this.state.item_state,
            title       : this.state.title,
            category    : this.state.selected_category,
            subcategory : this.state.selected_sub_category,
            ItemImage   : this.state.image,
            location    : this.state.location,
            desc        : this.state.description,
        }

        console.log(itemData)

        const fd = new FormData();
        fd.append('ItemImage',this.state.image,'plaeholder')
        fd.append("email",user.email)
        fd.append("itemtype", this.state.item_state)
        fd.append("title",this.state.title)
        fd.append("category",this.state.selected_category)
        fd.append("subcategory",this.state.selected_sub_category)
        fd.append("location",this.state.location)


        console.log(fd)


        this.props.userReportRequest(fd).then(            
            ({ data }) =>{

                    this.props.history.push('/inventory/pages?page=1');
                    console.log(data)
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
                        <form  onSubmit={this.onSubmit} encType="multipart/form-data">
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
                            <input type="radio"   
                                checked={this.state.item_state === 'Lost'} 
                                value="lost"
                                onChange={this.onChange}
                                id="item_state"
                                name="item_state"
                                className="radio"
                                
                            /> lost
                            <input type="radio"  
                                checked={this.state.item_state === 'Found'} 
                                value="found"
                                onChange={this.onChange}
                                id="item_state"
                                name="item_state"
                                className="radio"

                            /> found
                            </div>
                            <div className="form-group upload_photo ">
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <i className="fa fa-cloud-upload"></i> Upload Photo
                            </label>
                            <input id="file-upload" type="file" onChange={this.fileSelectedHandler }/>
                            <div className="imgPreview">{$imagePreview}</div>
                            </div>

                            <div className="form-group">
                            <label id="category_select" className="select" htmlFor="catagory">Catagory</label>
                            <select required className="form-control-report form-control" onChange={this.onChangeCategory}>
                                { 
                                    this.state.category.map( (cat, i) => {
                                    return (
                                        <option  className="category" key={i}>{cat.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <label  id="sub_category_select" className="select" htmlFor="subcatagory">Sub Catagory</label>
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
