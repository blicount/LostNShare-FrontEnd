import React  from 'react';
import "../css/main.css"

class Main extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            email:'',
            password:''
        };
	}
	componentWillMount(){
		
	}

	render(){
		return(
            <div>
                <main>
                    <h4>Most Popular</h4>
                    <section id="most_popular">
                        <article>s</article>
                    </section>
                    <h4>Most Recent</h4>
                    <section id="most_recent">
                        <article>s</article>
                    </section>
                </main>
            </div>
			);
		}
	}


export default Main;

