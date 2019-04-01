import React from 'react';
import "../../../../css/inventory_page.css"

class Item extends React.Component{
	constructor(props){
		super(props);
        this.state = {
            items:[],
            cuerrent_state:'Found',

        }
        this.getListItemByParams = this.getListItemByParams.bind(this);
	}
	componentWillMount(){
        


   

     
    }


    getListItemByParams(){

    }

	render(){
		return(
            <div>
            { 
                this.props.current_display_items.map( (item, i) => {
                            return (
                                <span className="inventory_item" key={i}>
                                    <img alt="pic" className="item_img" src={'https://lost-and-share.herokuapp.com/' + item.picpath} />
                                    <a 
                                        className="item_title" 
                                        href={'../item/' + item._id}  
                                        key={i}
                                    >
                                        {item.title}
                                    </a>
                                    <p className="item_description">{item.desc}</p>
                                </span>
                            )
                })
            }
            </div>
			);
		}
	}
export default Item;
