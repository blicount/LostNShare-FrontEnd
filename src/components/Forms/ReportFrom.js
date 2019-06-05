import React from 'react';
import {withRouter} from 'react-router-dom';
import "../../css/report.css";
import ColorPicker from 'rc-color-picker'
import "../../css/bootstrap.min.css"
import axios from 'axios';
import { Panel as ColorPickerPanel } from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';


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
            category:[],
            selected_item_id:'',
            image_name:'',
            shape:[
                'triangle',
                'trapezoid',
                'star',
                'square',
                'rectangle',
                'octagon',
                'heart',
                'diamond'
            ],
            color:'blue'

        };
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this)
       
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
        this.setState({image_name:e.target.files[0].name})
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
        fd.append('ItemImage',this.state.image,this.state.image_name)
        fd.append("email",user.email)
        fd.append("itemtype", this.state.item_state)
        fd.append("title",this.state.title)
        fd.append("category",this.state.selected_category)
        fd.append("subcategory",this.state.selected_sub_category)
        fd.append("location",this.state.location)
        fd.append("desc",this.state.description)

        

        if(localStorage.getItem('PrevSideBarState') !== null){
            var state = JSON.parse(localStorage.getItem('PrevSideBarState'))
            state.state = this.state.item_state;
            console.log(state)
            localStorage.setItem('PrevSideBarState', JSON.stringify(state));
        }


        this.props.userReportRequest(fd).then(            
            ({ data }) =>{
                    this.props.history.push('/inventory');   
            }
        ).catch((error) =>{
            console.log(error);
            
        });      
    }

 
    changeHandler(colors){
        console.log(colors)
        this.setState({color:colors.color})
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
                                checked={this.state.item_state === 'lost'} 
                                value="lost"
                                onChange={this.onChange}
                                id="item_state"
                                name="item_state"
                                className="radio"
                                
                            /> lost
                            <input type="radio"  
                                checked={this.state.item_state === 'found'} 
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
                            <div class="form-group ">
                                <label id="shape_select_label" className="shape" htmlFor="shape">Shape</label>
                                <select required id="shape_select"  className="form-control ">
                                { 
                                this.state.shape.map( (shp, i) => {
                                return (
                                    <option  className="shape" key={i}>{shp}</option>
                                    )
                                })
                                }
                                </select>
                            </div>
                            <div class="form-group">
                                <label id="color_select_label" className="select" htmlFor="color" >Color</label>
                                <input type="text" className="color_textbox" name="color" value={this.state.color} class="form-control"></input>
                                <ColorPicker className="colorPicker" enableAlpha={false} color={'#345679'}  mode="RGB" onChange={this.changeHandler} />
                                </div>
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
                            <label  id="location_select" className="select" htmlFor="location">Location</label>
                            <select required id="subCategory" className="form-control-report form-control"
                                 onChange={this.onChangeSubCategory}>
                            </select>
                            </div>
                            <span className="line"/>
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
