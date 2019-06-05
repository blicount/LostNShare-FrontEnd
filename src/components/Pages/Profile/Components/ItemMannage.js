import React from 'react';
import Massage      from '../../../Objects/Massage';
import Items	from './Items'

class ItemMannage extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			ItemMannage:true
		 }

	}

	componentWillMount(){

	}

 
	

	render(){
		if (sessionStorage.getItem('userData') == null) {
			return (<Massage/>)
		}
		console.log(this.props.isVisible)
		return(
			<div className={this.props.isVisible}>
				<Items ItemMannage={this.state.ItemMannage}/>
            </div>
			
			);
		}
	}
export default ItemMannage;

