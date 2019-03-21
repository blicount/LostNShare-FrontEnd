import React from 'react';


import { Link } from 'react-router-dom';
import '../css/header.css'

class NavigationBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        selected:''
  };

  }

  componentWillUnmount() {
     window.removeEventListener('load', this.selectedNavLink) 
  } 
     
  componentDidMount(){

     //document.getElementsByClassName(x).style.textDecoration = 'underline';
    //var selectedNav = this.state.selected;
    //selectedNav.style.textDecoration = 'underline';
    //selectedNav.textDecorationColor = 'white !important';
  }



  render() {

    let linksMarkup = this.props.links.map((link, index) => {
      let linkMarkup = link.active ? (
          <Link onClick={this.props.handleClickSelection} className="selected" to={link.link} href={link.link}>{link.label}</Link>
        ) : (
            <Link onClick={this.props.handleClickSelection} className="" to={link.link} href={link.link}>{link.label}</Link>
        );
        return (
          <li key={index} className="menu__list-item">
              {linkMarkup }
          </li>
      );
    });
    return (
        <nav >
                 {linksMarkup}
        </nav>
        
    );
    
  }
  
}



export default NavigationBar;

