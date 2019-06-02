import React  from 'react';
import "../css/main.css"
import Item from './Pages/Inventory/Components/Item'
import axios from 'axios';

class Main extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            cuerrent_state: 'found',
            current_display_items:[]

        };
        this.handleClickSelection = this.handleClickSelection.bind(this);
	}
	componentWillMount(){

		axios.get('https://lost-and-share.herokuapp.com/items/getAllActive' +this.state.cuerrent_state+ 'Items/')         
        .then((data)=>{
			console.log(data.data);
			this.setState({
				items:data.data,
				current_display_items:data.data.slice(0,6),
				
			})
		});

    }

    handleClickSelection(){


    }

	render(){
		return(
            <div>
                <main>
                    <h4>Most Recent</h4>
                    <section id="most_recent">
                        <article>
                        <Item current_display_items={this.state.current_display_items} handleClickSelection={this.handleClickSelection}/>
                        </article>
                    </section>
                </main>
            </div>
			);
		}
	}


export default Main;

/*




*/ 

