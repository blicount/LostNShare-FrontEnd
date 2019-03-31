import React from 'react';
//import axios from 'axios';

import Item from './Item'
import "../../../../css/inventory_page.css"
class Container extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			pages:'',
			items:[],
			current_display_items:[],
			cuerrent_state:'Found',
			currentPage:''
		}
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	 componentWillMount(){
		
		fetch('https://lost-and-share.herokuapp.com/items/getAll' +this.state.cuerrent_state+ 'Items/')         
        .then((response)=>response.json())
        .then((data)=>{
			console.log(data);
			var url_string = window.location.href;		
			var url = new URL(url_string);
			var page = url.searchParams.get("page");
			//console.log(page);
			this.setState({
				items:data,
				current_display_items:data.slice(page === 1 ? 0 : (page-1) * 9,(page) * 9),
				pages:(Math.floor(data.length/9) +1),
			})
		});

    }

	handlePageChange(e){
		var url_string = window.location.href;
		var nextPage =  window.location.href.slice(0, -1) + e.target.innerText ;

		if(url_string !== nextPage){
			this.props.handleChangePageAndState(window.location.assign(nextPage) );
			//this.props.history.push('/foo');
			
			//window.location.assign(nextPage)

		 }         

	}

	handleClickSelection(e){
		console.log("her");
	}

	render(){
		let pages_number = [];
		for (var i = 1; i <= this.state.pages; i++) {
			pages_number.push(<i onClick={this.handlePageChange} className="page_link" key={i}>{i}</i>);
		}
		
		return(
            <main>
				<article id="container">
                    <Item current_display_items={this.state.current_display_items} handleClickSelection={this.handleClickSelection}/>
       			</article>
				<span  className="pages" >
					{pages_number}
				</span>
            </main>   
			);
		}
	}
export default  Container;

