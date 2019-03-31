import React from 'react';
import Massage      from '../../../Objects/Massage';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import '../../../../css/profile.css'

class Items extends React.Component{
	constructor(props){
		super(props)
		this.state = {
				owner_items:[]
		 }

	}

	componentWillMount(){
		

		var user = JSON.parse(sessionStorage.getItem('userData'));
		console.log(user.email)

		axios.post('https://lost-and-share.herokuapp.com/items/getItemByOwner', user )         
			.then((data)=>{
						console.log(data);
						this.setState({owner_items:data.data})}
			)
			.catch((error) =>{
					console.log(error);

					
			})
	}

 
	

	render(){
		if (sessionStorage.getItem('userData') == null) {
			return (<Massage/>)
		}
		return(
			<div className={this.props.isVisible} 	>
            { 
                this.state.owner_items.map( (item, i) => {
                            //console.log(item._id);
                            return (
                                <span className="pofile_item" key={i}>
                                    <img alt="pic" className="pofile_item_img" src={item.picpath} />
                                    <a className="pofile_item_title" href={item.title}  key={i}>{item.title}</a>
									<button>Update</button>
									<button>Remove</button>
                                </span>
                            )
                })
            }
            </div>
			
			);
		}
	}
export default withRouter(Items);

