import React from 'react';
import Massage      from '../../../Objects/Massage';
import axios from 'axios';


class RepotList extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			repotList:[]
		 }

	}

	componentDidMount(){
		axios.get('https://lost-and-share.herokuapp.com/Events/allSystemEvents').then((respone) => {
			console.log(respone.data)
			this.setState({
				repotList:respone.data
			})
		}).catch((error) => {
			console.log(error);
		})
		
	}

 
	

	render(){
		if (sessionStorage.getItem('userData') === null) {
			return (<Massage/>)
		}
		return(
			<div className={this.props.isVisible}>
				<div className="row mt-5">
				<div className="col-md-11 m-auto">	
				{
					this.state.repotList.map((rep,i)=>{
						return(
								<div key={i} className="card card-body">  
									<p >{i + ". "}{rep}</p>
								</div>
						)
					})
				}
				</div>
				</div>
            </div>
			
			);
		}
	}
export default RepotList;

