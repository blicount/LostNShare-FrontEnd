import React from 'react';
import axios from 'axios';
import "../../../css/bootstrap.min.css"
import "../../../css/item.css"
import Matching from '../../Objects/Matching';

 
class ItemPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          itemid:'',
          itemtype:'',
          itemstate:'',
          title :'',
          owner:'',
          location:'',
          category:'',
          subcategory:'',
          description:'',
          picpath:'' ,
          match_list:[]
        }
    }
   
    componentWillMount(){
        var url_string = window.location.href;		
        var ids = url_string.lastIndexOf('/');
        ids = url_string.substr(ids+1);
        axios.post('https://lost-and-share.herokuapp.com/items/getItemById',{ id: ids })         
        .then((data)=>{
            console.log(data); 
            this.setState({
              itemid      :data.data._id,
              itemtype    :data.data.itemtype,
              itemstate   :data.data.itemstate,
              title       :data.data.title,
              owner       :data.data.owner,
              location    :data.data.location,
              category    :data.data.category,
              subcategory :data.data.subcategory,
              description :data.data.desc,
              picpath     :data.data.picpath,
              match_list  :data.data.matching_items
            })   
        })
        .catch(function (error) {
            if (error.response) {
              console.log(error.response.headers);
            } 
            else if (error.request) {
              console.log(error.request);
            } 
            else {
              console.log(error.message);
            }
        console.log(error.config);
        });
        this.forceUpdate()
    }

    render(){
        return (
            <div className ="container">
              <h6>Item Property</h6>
                  <div className="item_property">
                  <img alt="pic" className="property_item_img" src={this.state.picpath } />
									<p className="property_item_state">Item state:
												<i style={this.state.itemstate === 'active' ? { color: "green" } : { color: "red" }}>
											{' ' + this.state.itemstate}
										</i>
									</p>
									<p className="property_item_category">Category:{' ' + this.state.category}</p>
									<p className="property_item_subcategory">SubCategory:{' ' + this.state.subcategory}</p>
									<p className="property_item_title" >{this.state.title}</p>
									<p className="property_item_description" >{this.state.description}</p>
                  <p  className="property_item_owner">Owner: {this.state.owner}</p>
                  <p  className="property_item_location">Location: {this.state.location}</p>
                  <p className="property_item_type">Item case:
												<i style={this.state.itemtype === 'Found' || this.state.itemtype === 'found' ? { color: "green" } : { color: "red" }}>
											{' ' + this.state.itemtype}
										</i>
									</p>
           
              </div>
              <h6>Matched Items</h6>
              <Matching item={this.state.match_list } owner={this.state.owner}/>
            </div>
          
        );
 
    }
}




export default ItemPage;
