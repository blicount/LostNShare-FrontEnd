import React from 'react';
import "../css/main.css"
import Item from './Pages/Inventory/Components/Item'
import axios from 'axios';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cuerrent_state: 'found',
            current_display_items: []

        };
    }
    componentWillMount() {

        axios.get('https://lost-and-share.herokuapp.com/items/getAllActiveItems')
            .then((data) => {
                console.log(data.data);
                this.setState({
                    items: data.data,
                    current_display_items: data.data.slice(0, 6),

                })
            });
    }

    render() {
        return (
            <div>
                <main>
                    <div className="row mt-5 ">
                        <div className="col-md-12 m-auto">
                            <div className="card card-body agenda_bg">
                                <h3 id="agenda">Welcome to LostNShare the platform that gathers reports of lost and found items</h3>
                            </div>
                        </div>
                    </div>

                    <h4>Most Recent</h4>
                    <section id="most_recent">
                        <article>
                            <Item current_display_items={this.state.current_display_items} handleClickSelection={this.handleClickSelection} />
                        </article>
                    </section>
                </main>
            </div>
        );
    }
}


export default Main;


