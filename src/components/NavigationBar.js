import React from 'react';

//import { Link } from 'react-router-dom';


class NavigationBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email:'',
      password:''
  };
  }

  render() {
    return (
        <nav>
            <li><a href="/Lost">Lost</a></li>
            <li><a href="/Report">Report</a></li>
            <li><a href="/Found">Found</a></li>
            <li><a  href="/Register">Sign up</a></li>
            <li><a href="/Login">Login</a></li>
        </nav>
    );
  }
}



export default NavigationBar;

