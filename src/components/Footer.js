import React from 'react';
import "../css/footer.css"
class Footer extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			name:'',
			id:''
		 }
		
	}

	componentWillMount(){
		if (sessionStorage.getItem('userData') !== null) {
			var u_data = sessionStorage.getItem('userData')
			var data = JSON.parse(u_data);
			this.setState({
				name:data.name,
				id:data.id
			})
		}
	}

	render(){
		if (sessionStorage.getItem('userData') === null) {
            return (
				<footer>
					<a href="/login">Login or Register</a>
				</footer>
			)
		}
		else{	
			
			return(
			<footer>
				<a href={"/profile/" + this.state.id}>{this.state.name}</a>
			</footer>
			)
		}
	}
}
export default Footer;

