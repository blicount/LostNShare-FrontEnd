import React from 'react';
import NavigationBar from './NavigationBar'
//import {Redirect} from 'react-router-dom';
import "../css/header.css"

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        };
        };
    

    render(){     
        return (
            <header>
                <span id="logo_nls">
                   <a href="/" ><img alt="logo" src="./Images/logo_lns.png"/></a>
                </span>
                <h1> LostNShare</h1>
                 <NavigationBar/>
                </header>
        );
    }
}



 


export default Header;
