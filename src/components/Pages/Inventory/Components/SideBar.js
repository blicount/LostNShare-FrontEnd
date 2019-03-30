import React from 'react';
import "../../../../css/inventory_page.css"

class SideBar extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            category:[],
            sub_category:[],
            state:'found',
            selected_category:'',
            selected_sub_category:'',
            date_to:'',
            date_from:'',
            location:''
        }
        this.onChange = this.onChange.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
    }
    
    componentWillMount(){
        var state = JSON.parse(localStorage.getItem('PrevSideBarState'))
        console.log("old state")
        console.log(state.selected_category)
        this.setState({selected_category:state.selected_category,selected_sub_category:state.selected_sub_category  })
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

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
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
                        return('');        
                    })    
        }).catch((error) => (console.log(error))); 

    }

    onChangeSubCategory(e){
        var index = e.target.selectedIndex;
        var selectedSubCategory = this.state.sub_category[index];
        this.setState({selected_sub_category:selectedSubCategory});

    }

    componentDidUpdate(){
        localStorage.setItem('PrevSideBarState', JSON.stringify(this.state));

    }
    

	render(){
		return(
				<div id="side_bar">
                     <span className="form-group">
                        <label className="select " htmlFor="search_state">State</label>
                        <select className="form-control" onChange={this.onChange} name="state" value={this.state.state}>
                            <option value="found">Found</option>
                            <option value="lost">Lost</option>
                        </select>
                    </span>
                    <span className="line"/>
                    <span className="form-group">
                        <label className="select " htmlFor="catagory">Catagory</label>
                        <select required className="form-control" onChange={this.onChangeCategory} value={this.state.selected_category}>
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
                            <select required id="subCategory" className="form-control" onChange={this.onChangeSubCategory} value={this.state.selected_sub_category}>
                            </select>
                        <label className="select" htmlFor="location">Location</label>
                        <select className="form-control" onChange={this.onChange} name="location" value={this.state.location}>
                            <option></option>
                        </select>
                    </span>
                    <span className="line"/>
                    <span className="form-group">
                        <label className="select " htmlFor="dateFrom" >From Date:</label>
                        <input 
                           
                            type="date"
                            name="date_from"
                            className="form-control"
                        />
                        <label className="select" htmlFor="dateTo" >To Date:</label>
                        <input 
                            
                            type="date"
                            name="date_to"
                            className="form-control"
                        />
                    </span>
                    <span className="line"/>
                    <span className="form-group">
                        <label className="select " htmlFor="Color">Color</label>
                        <select className="form-control">
                        <option value="blank" >...</option>

                        </select>
                        <label className="select" htmlFor="Size">Size</label>
                        <select className=" form-control">
                        <option value="blank">...</option>

                        </select>
                        <label className="select" htmlFor="Shape">Shape</label>
                        <select className="form-control">
                            <option></option>
                        </select>
                    </span>
                    <span className="line"/>
				</div>
			);
		}
	}
export default SideBar;

