import React from 'react';
import SideBar from "../Objects/SideBar"
import SearchBar from "../Objects/Container"
import Container from "../Objects/Search"
import {Redirect} from 'react-router-dom';


class InventoryPage extends React.Component {
    constructor(props){
    super(props)
    this.state={}
    }
    
    render(){
        if (sessionStorage.getItem('userData') == null) {
            return (<Redirect to={'/login'}/>)
        }
        return (
          
            <div id="inventory">
                <SideBar/>
                <div >
                    <Container  />
                    <SearchBar/>
                </div>  
            </div>
        );
 
    }
}




export default InventoryPage;
