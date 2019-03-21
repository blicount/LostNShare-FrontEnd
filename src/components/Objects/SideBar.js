import React from 'react';
import "../../css/inventory_page.css"

class SideBar extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            category:[],
            sub_category:[],
            selected_category:'',
            selected_sub_category:'',
            date_to:'',
            date_until:'',
            location:''

        }

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
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
                        return('');        
                    })    
        }).catch((error) => (console.log(error))); 
       
    }

    onChangeSubCategory(e){
        var index = e.target.selectedIndex;
        var selectedSubCategory = this.state.sub_category[index];
        this.setState({selected_sub_category:selectedSubCategory});
    }
    

	render(){
		return(
				<div id="side_bar">
                     <span className="form-group">
                        <label className="select " htmlFor="search_state">State</label>
                        <select className="form-control">
                            <option value="found">Found</option>
                            <option value="lost">Lost</option>
                        </select>
                    </span>
                    <span className="line"/>
                    <span className="form-group">
                        <label className="select " htmlFor="catagory">Catagory</label>
                        <select required className="form-control" onChange={this.onChangeCategory}>
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
                            <select required id="subCategory" className="form-control"
                                 onChange={this.onChangeSubCategory}>
                            </select>
                        <label className="select" htmlFor="location">Location</label>
                        <select className="form-control">
                            <option></option>
                        </select>
                    </span>
                    <span className="line"/>
                    <span className="form-group">
                        <label className="select " htmlFor="dateFrom">From Date:</label>
                        <input 
                            type="date"
                            name="dateTo"
                            className="form-control"
                        />
                        <label className="select" htmlFor="dateTo">To Date:</label>
                        <input 
                            type="date"
                            name="dateTo"
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
                        <span className="line"/>
                    </span>
				</div>
			);
		}
	}
export default SideBar;

