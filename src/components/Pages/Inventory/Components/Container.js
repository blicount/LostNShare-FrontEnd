import React from 'react';
import axios from 'axios';

import Item from './Item'
import "../../../../css/inventory_page.css"

class Container extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			items:[],
			current_display_items:[],
			filter_display_items:[],
			cuerrent_state:'found'
		}
		
	}

	 componentWillMount(){
		var state = 'found';
		axios.get('https://lost-and-share.herokuapp.com/items/getAllActiveItems')         
        .then((data)=>{
			console.log(data);
			if(localStorage.getItem('PrevSideBarState') !== null){
				state = JSON.parse(localStorage.getItem('PrevSideBarState'))
				this.setState({cuerrent_state:state.state })
				console.log(state.state);
			}
			if(state.state === "lost" || state.state === "Lost"){
				this.setState({
					items:data.data,
					current_display_items:data.data.filter((x) => {
						if(x.itemtype === 'lost' || x.itemtype ===  'Lost'){
							return x;
						}
					})
					
				})
			}else{
				this.setState({
					items:data.data,
					current_display_items:data.data.filter((x) => {
						if(x.itemtype === 'found' || x.itemtype ===  'Found'){
							return x;
						}
					})
				})
			}
			
		}).catch((error) =>{
			console.log(error);

			
	});

    }

	handleClickSelection(e){
		console.log("show item");
	}

	componentWillReceiveProps(p){
		console.log(p);
		var shouldReturn = false;
		if(p.filters.state === 'Found' || p.filters.state === 'found' || p.filters.state === ''){
			this.setState({
				current_display_items:this.state.items.filter((x) => {
					if(x.itemtype === 'Found' || x.itemtype ===  'found'){
						shouldReturn = true;
						if(p.filters.category !== 'All'){
							shouldReturn = false;
						}
						if(p.filters.category === x.category){
							shouldReturn = true;
							if(p.filters.sub_category !== 'All'){
								shouldReturn = false;
							}
							if(p.filters.sub_category === x.sub_category){
								shouldReturn = true;
							}
						}

					}
					//console.log("from: "  + x.updatedate.substring(0,10) + " = " + p.filters.date_from)
					if(Date.parse(x.updatedate.substring(0,10)) < Date.parse(p.filters.date_from) && p.filters.date_from !== ''){
						shouldReturn = false;
				
					}
					//console.log("to: " + x.updatedate.substring(0,10) + " = " + p.filters.date_to)
					if(Date.parse(x.updatedate.substring(0,10)) > Date.parse(p.filters.date_to) && p.filters.date_to !== ''){
						shouldReturn = false;
					}
					
					if(p.filters.location !== ''){
						this.setState({
							current_display_items: this.state.current_display_items.filter((x)=>{
								console.log(x.location + " !=" + p.filters.location)
								if(x.location !== p.filters.location){
									shouldReturn = false;
								}
							})
						})
					}

					if(shouldReturn === true){
						shouldReturn = false;
						return x;
					}
				})
				
			})
			this.setState({cuerrent_state:'found'})
		}else{
			this.setState({
				current_display_items:this.state.items.filter((x) => {
					if(x.itemtype === 'lost' || x.itemtype ===  'Lost'){
						shouldReturn = true;
						if(p.filters.category !== 'All'){
							shouldReturn = false;
						}
						if(p.filters.category === x.category){
							shouldReturn = true;
							if(p.filters.sub_category !== 'All'){
								shouldReturn = false;
							}
							if(p.filters.sub_category === x.sub_category){
								shouldReturn = true;
							}
						}

					}
					//console.log("from: "  + x.updatedate.substring(0,10) + " = " + p.filters.date_from)
					if(Date.parse(x.updatedate.substring(0,10)) < Date.parse(p.filters.date_from) && p.filters.date_from !== ''){
						shouldReturn = false;
				
					}
					//console.log("to: " + x.updatedate.substring(0,10) + " = " + p.filters.date_to)
					if(Date.parse(x.updatedate.substring(0,10)) > Date.parse(p.filters.date_to) && p.filters.date_to !== ''){
						shouldReturn = false;
					}

					if(p.filters.location !== ''){
						this.setState({
							current_display_items: this.state.current_display_items.filter((x)=>{
								console.log(x.location + " !=" + p.filters.location)
								if(x.location !== p.filters.location){
									shouldReturn = false;
								}
							})
						})
					}

					if(shouldReturn === true){
						shouldReturn = false;
						return x;
					}
				})
			})
			this.setState({cuerrent_state:'lost'})

		}


		if(p.query_string !== ''){
			this.setState({
				current_display_items: this.state.current_display_items.filter(x => String(x.title).includes(p.query_string))
			})
			
		}
	
	}

	render(){
		return(
            <main>
				<article id="container">
                    <Item current_display_items={this.state.current_display_items} handleClickSelection={this.handleClickSelection}/>
       			</article>

            </main>   
			);
		}
	}
export default  Container;

