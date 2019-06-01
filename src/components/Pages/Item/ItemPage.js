import React from 'react';
import axios from 'axios';
import "../../../css/bootstrap.min.css"
import "../../../css/item.css"

 
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
          picpath:'' 
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
              picpath     :data.data.picpath
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
            <div className="row">
              <div className="col-md-4">
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                  <img src={this.state.picpath} className="d-block w-100" alt="item img" />
                </div>
              </div>
              <div className="col-md-7">
                <div className="card-body">
                    <p class="itemtype text-center">{this.state.itemtype}</p>
                    <h2>{this.state.title}</h2>
                    <p> {this.state.category}, {this.state.subcategory} </p>
                    <p className="subcategory">{this.state.subcategory}</p>
                    <p><b>Owner:</b> {this.state.owner}</p>
                    <p><b>Location:</b> {this.state.location}</p>
                    <p><b>Item state:</b> {this.state.itemstate}</p>
                    <p><b>Description:</b>  {this.state.description}</p>
                </div>
            </div>
            <div className="col-md-4">
                <div className="matches">
                    <h2>Matched Items</h2>
                </div>
            </div>
            </div>
          </div>
        );
 
    }
}




export default ItemPage;
