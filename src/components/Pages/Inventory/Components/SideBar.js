import React from 'react';
import "../../../../css/inventory_page.css"
import axios from 'axios';

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
        this.handleSearchFromSideBar = this.handleSearchFromSideBar.bind(this);
    }
    
    componentWillMount(){
        if(localStorage.getItem('PrevSideBarState') !== null){
            var state = JSON.parse(localStorage.getItem('PrevSideBarState'))
            console.log("old state")
            console.log(state.selected_category)
            this.setState({state:state.state })
         
        }
        axios.get('https://lost-and-share.herokuapp.com/Categories/getAllCategories')         
        .then((data)=>{
                    this.setState({category:data.data})
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
        if(e.target.name === "state"){
            localStorage.setItem('PrevSideBarState', JSON.stringify(this.state));
        }
        this.setState({[e.target.name]: e.target.value});
        var prop = e.target.name
        var value = e.target.value
        this.props.handleSearchFromSideBar(prop,value);
        
    }

    onChangeCategory(e){
        var index = e.target.selectedIndex
        var selectedCategory = this.state.category[index].name
        var prop = 'category'
        var value = this.state.category[index].name
        this.props.handleSearchFromSideBar(prop,value);
        document.getElementById('subCategory').innerHTML = '';
        this.setState({selected_category:this.state.category[index].name})
        if(selectedCategory !== "All"){   
            axios.post('https://lost-and-share.herokuapp.com/subcategories/getAllSubCategoryByCategory', {category:this.state.category[index-1].name} )         
            .then((data)=>{                 
                        this.setState({
                            sub_category:data.data.subcategorylist,
                            selected_sub_category:data.data.subcategorylist[0]         
                        })
                        var prop = 'sub_category' 
                        this.props.handleSearchFromSideBar(prop,"All");
                        
                        data.data.subcategorylist.map( (sub_cat, i) => {
                            if(i === 0){
                                var op = document.createElement("option");
                                var textnode = document.createTextNode("All"); 
                                op.className = 'sub_category';
                                op.key = i;
                                op.appendChild(textnode);
                                document.getElementById('subCategory').appendChild(op);
                            }
                            var op = document.createElement("option");
                            var textnode = document.createTextNode(sub_cat); 
                            op.className = 'sub_category';
                            op.key = i+1;
                            op.appendChild(textnode);
                            document.getElementById('subCategory').appendChild(op);
                            return('');        
                        })           
            }).catch((error) => (console.log(error))); 
        }
    }

    onChangeSubCategory(e){
        var index = e.target.selectedIndex-1;
        var selectedSubCategory = this.state.sub_category[index];
        this.setState({selected_sub_category:selectedSubCategory});
        var prop = 'sub_category'
        var value = this.state.sub_category[index] 
        if(index < 0){
            value = "All";
        }
        this.props.handleSearchFromSideBar(prop,value);

    }

    componentDidUpdate(){
        localStorage.setItem('PrevSideBarState', JSON.stringify(this.state));

    }
    
    handleSearchFromSideBar(){
        this.props.handleSearchFromSideBar('s');
    }

	render(){
		return(
				<div id="side_bar"  >
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
                           onChange={this.onChange}
                            type="date"
                            name="date_from"
                            className="form-control"
                        />
                        <label className="select" htmlFor="dateTo" >To Date:</label>
                        <input 
                            onChange={this.onChange}
                            type="date"
                            name="date_to"
                            className="form-control"
                        />
                    </span>
                    <span className="line"/>
				</div>
			);
		}
	}
export default SideBar;

