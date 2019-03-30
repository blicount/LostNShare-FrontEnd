import React  from 'react';
import "../css/main.css"
import Item from './Pages/Inventory/Components/Item'

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

		fetch('https://lost-and-share.herokuapp.com/items/getAll' +this.state.cuerrent_state+ 'Items/')         
        .then((Response)=>Response.json())
        .then((data)=>{
			console.log(data);
			this.setState({
				items:data,
				current_display_items:data.slice(0,3),
				
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
                    <h4>Most Popular</h4>
                    <section id="most_popular">
                        <article>s</article>
                    </section>
                </main>
            </div>
			);
		}
	}


export default Main;

/*




*/ 

