import React from 'react';
import SideBar from "../Objects/SideBar"
import SearchBar from "../Objects/Container"
import Container from "../Objects/Search"


class InventoryPage extends React.Component {

   
    render(){
      

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
