import React from 'react';
//import axios from 'axios';
import Item from './Item'
import "../../css/inventory_page.css"

class Container extends React.Component{
	/*constructor(props){
		super(props);

	}

	 componentWillMount(){
        

    }
*/

	render(){

		return(
            <main>
				<article id="container">
                    <Item/>
       			</article>
                <a href="/" className="page_nav">1 2 3 ...</a>
            </main>   
			);
		}
	}
export default  Container;

