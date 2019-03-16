import React from 'react';
import "../../css/inventory_page.css"

class Items extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            key:'w',
            careationdate:'',
            category:'',
            desc:'',
            eventlistid:'' ,
            itemstate:'',
            itemtype:'',
            location:'',
            picpath:'',
            subcategory:'',
            title:'',
            updatedate:'',
            _id:''
        }
        this.getListItem = this.getListItem.bind(this);
        this.getListItemByParams = this.getListItemByParams.bind(this);
	}
	componentWillMount(){
        console.log("k");

     
    }

    getListItem(){

    }

    getListItemByParams(){

    }

	render(){

		return(
            <span className="item">
            </span>
			);
		}
	}
export default Items;

