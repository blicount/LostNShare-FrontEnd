import React from 'react';
import Massage      from '../../../Objects/Massage';


class RepotList extends React.Component{
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
		return(
			<div className={this.props.isVisible}>
RepotList
            </div>
			
			);
		}
	}
export default RepotList;

