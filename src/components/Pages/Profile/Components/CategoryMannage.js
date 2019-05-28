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
            category:[]
		 }

         this.onChange = this.onChange.bind(this);
         this.addCategory = this.addCategory.bind(this);
         this.addSubCategory = this.addSubCategory.bind(this);
         this.deleteCategory = this.deleteCategory.bind(this);
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
                if(cat.name == "..."){
                    this.setState({remove_category_id:''});
                }
            });
        }

    }

    addCategory(){
        axios.post('https://lost-and-share.herokuapp.com/Categories/insertCategory/', {category:this.state.new_category} )         
        .then((data)=>{                 
           console.log(data);               
        }).catch((error) => (console.log(error))); 
    }
    
    addSubCategory(){

    }

    deleteCategory(){
        var config = {
            headers: {'Access-Control-Allow-Origin': '*'}
        };
        if(this.state.remove_category_id !== ''){
            axios.delete('https://lost-and-share.herokuapp.com/Categories/DeleteCategory/', {id:this.state.remove_category_id})         
            .then((data)=>{                 
            console.log(data);               
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
                <h3>Add Category</h3>
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
             <hr/>
             <section className="category_mannage_section">
                 <h3>Add SubCategory</h3>

             </section>
             <section className="category_mannage_section">
                <h3>Remove Category</h3>
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

