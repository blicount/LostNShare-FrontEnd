import React from 'react';
import Massage      from '../../../Objects/Massage';


class ItemMannage extends React.Component{
	constructor(props){
		super(props)
		this.state = {
		 }

	}

	componentDidMount(){
	}

 
	

	render(){
		if (sessionStorage.getItem('userData') == null) {
			return (<Massage/>)
		}
		console.log(this.props.isVisible)
		return(
			<div className={this.props.isVisible}>
ItemMannage
            </div>
			
			);
		}
	}
export default ItemMannage;

