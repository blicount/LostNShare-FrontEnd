import React from 'react';
import axios        from 'axios';

import Massage      from '../../../Objects/Massage';


class CategoryMannage extends React.Component{
	constructor(props){
		super(props)
		this.state = {
            new_category:'',
            remove_category:'',
            remove_category_id:'',
            chosen_category:'',
            category:[],
            newsubCategoryArray:[],
            mannage_selected_category:'',
            mannage_sub_category:[],
            mannage_selected_sub_category:''
		 }

         this.onChange = this.onChange.bind(this);
         this.addCategory = this.addCategory.bind(this);
         this.addSubCategory = this.addSubCategory.bind(this);
         this.deleteCategory = this.deleteCategory.bind(this);
         this.onChangeCategory = this.onChangeCategory.bind(this);
	}

	componentWillMount(){
        axios.get('https://lost-and-share.herokuapp.com/Categories/getAllCategories')         
        .then((data)=>{
                    this.setState({category:data.data})
                }
            ); 
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        if(e.target.name === "remove_category"){
            this.state.category.forEach(cat => {
                if(cat.name === e.target.value){
                    this.setState({remove_category_id:cat._id});
                }
                if(cat.name === "..."){
                    this.setState({remove_category_id:''});
                }
            });
        }
        else if(e.target.name  === "new_category"){

        }

    }

    addCategory(){
        if(this.state.new_category !== ''){
            axios.post('https://lost-and-share.herokuapp.com/Categories/insertCategory/', {category:this.state.new_category} )         
                .then((data)=>{                 
                console.log(data);               
            }).catch((error) => (console.log(error))); 
    
        }
    }
    
    addSubCategory(){
        if(this.state.newsubCategoryArray !== '' && (this.state.chosen_category !== '' || this.state.chosen_category !== "...")){
            var array = this.state.newsubCategoryArray;
            array = array.split(',')
            axios.post('https://lost-and-share.herokuapp.com/Categories/insertSubCategory', {category:this.state.chosen_category,subcategory:array})         
                .then((data)=>{                 
                console.log(data);               
            }).catch((error) => (console.log(error))); 
            
        }
    }

    deleteCategory(){
        if(this.state.remove_category_id !== ''){
            axios.post('https://lost-and-share.herokuapp.com/Categories/DeleteCategory', {id:this.state.remove_category_id})         
            .then((data)=>{                 
            console.log(data); 
            
                axios.get('https://lost-and-share.herokuapp.com/Categories/getAllCategories')         
                .then((data)=>{
                            this.setState({category:data.data})
                        }
                    ); 

            }).catch((error) => (console.log(error))); 
        }
    }

    onChangeCategory(e){
        var index = e.target.selectedIndex
        var selectedCategory = this.state.category[index].name
        document.getElementById('mannageSubCategory').innerHTML = '';
        this.setState({mannage_selected_category:this.state.category[index].name})
        if(selectedCategory !== "All"){   
            axios.post('https://lost-and-share.herokuapp.com/subcategories/getAllSubCategoryByCategory', {category:this.state.category[index-1].name} )         
            .then((data)=>{    
                        console.log(data)
                        this.setState({
                            mannage_sub_category:data.data.subcategorylist,
                            mannage_selected_sub_category:data.data.subcategorylist[0]         
                        })
                        
                        data.data.subcategorylist.map( (sub_cat, i) => {
                            if(i === 0){
                                var op = document.createElement("option");
                                var textnode = document.createTextNode("All"); 
                                op.className = 'mannage_subcategory_node';
                                op.key = i;
                                op.appendChild(textnode);
                                document.getElementById('mannageSubCategory').appendChild(op);
                            }
                            op = document.createElement("option");
                            textnode = document.createTextNode(sub_cat); 
                            op.className = 'mannage_subcategory_node';
                            op.key = i+1;
                            op.appendChild(textnode);
                            document.getElementById('mannageSubCategory').appendChild(op);
                            return('');        
                        })           
            }).catch((error) => (console.log(error))); 
        }
    }

	render(){
		if (sessionStorage.getItem('userData') == null) {
			return (<Massage/>)
		}
		return(
			<div className={this.props.isVisible}>
                <section className="category_mannage_section">
                    <label className="select " htmlFor="catagory">Catagory</label>
                    <select required className="form-control" onChange={this.onChangeCategory} value={this.state.selected_category}>
                            { 
                                this.state.category.map( (cat, i) => {
                                return (
                                    <option  className="mannage_category" key={i}>{cat.name}</option>
                                    )
                                })
                            }
                    </select>
                    <label  className="select" htmlFor="subcatagory">Sub Catagory</label>
                    <select required id="mannageSubCategory" className="form-control" onChange={this.onChangeSubCategory} value={this.state.selected_sub_category}>
                    </select>
                </section>
             <section className="category_mannage_section">
                <label>Add Category</label>
                <input
                    
                    onChange={this.onChange}
                    type="category"
                    id="category"
                    name="new_category"
                    className="form-control"
                    placeholder="Enter Category"
                    pattern=".{2,10}" required title="2 to 10 characters"
                />   
                <button onClick={this.addCategory}  className="btn btn-primary btn-block">Add</button>
             </section>
             <section className="category_mannage_section">
                 <label>Add SubCategory</label>
                 <select required className="form-control" onChange={this.onChange} name="chosen_category">
                 { 
                                    this.state.category.map( (cat, i) => {
                                        if(cat.name !== "All"){
                                            return (
                                                <option  className="category" key={i}>{cat.name}</option>
                                            )
                                        }
                                        else{
                                            return (
                                                <option  className="category" key={i}>...</option>
                                            )
                                        }
                                    })
                                }
                </select>
                 <input
                    
                    onChange={this.onChange}
                    type="category"
                    id="category"
                    name="newsubCategoryArray"
                    className="form-control"
                    placeholder="Enter subCategory use , between subCategorys"
                    pattern=".{2,10}" required title="2 to 10 characters"
                />   
                <button onClick={this.addSubCategory}  className="btn btn-primary btn-block">Add</button>

             </section>
             <section className="category_mannage_section">
                <label>Remove Category</label>
                <select required className="form-control" onChange={this.onChange} name="remove_category">
                                { 
                                    this.state.category.map( (cat, i) => {
                                        if(cat.name !== "All"){
                                            return (
                                                <option  className="category" key={i}>{cat.name}</option>
                                            )
                                        }
                                        else{
                                            return (
                                                <option  className="category" key={i}>...</option>
                                            )
                                        }
                                    })
                                }
                </select>
                <button onClick={this.deleteCategory}  className="btn btn-primary btn-block">Remove</button>
             </section>
            </div>
			
			);
		}
	}
export default CategoryMannage;

