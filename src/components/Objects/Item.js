import React from 'react';
import "../../css/inventory_page.css"

class Item extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            items:[],
            cuerrent_state:'Found',

        }
        this.getListItem = this.getListItem.bind(this);
        this.getListItemByParams = this.getListItemByParams.bind(this);
	}
	componentWillMount(){

        fetch('https://lost-and-share.herokuapp.com/items/getAll' +this.state.cuerrent_state+ 'Items/')         
        .then((Response)=>Response.json())
        .then((data)=>{
                    //console.log(data);
                    this.setState({items:data})}
            );

     
    }

    getListItem(){

    }

    getListItemByParams(){

    }

	render(){

		return(
            <span>
            { this.state.items.map( (item, i) => {
                          //console.log(item._id);
                          return (
                            <span className="item" key={i}>
                                <img alt="pic" className="item_img" src={item.picpath} />
                                <a className="item_title" href={item.title}  key={i}>{item.title}</a>
                            </span>
                          )
            }) }
            </span>
			);
		}
	}
export default Item;

