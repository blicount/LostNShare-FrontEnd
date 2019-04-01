import React from 'react';
import SideBar from "./Components/SideBar"
import SearchBar from "./Components/Search"
import Container from "./Components/Container"
//import Massage from '../Objects/Massage';
import {connect} from 'react-redux'


class InventoryPage extends React.Component {
    constructor(props){
    super(props)
    this.state={
        
    }
    this.handleChangePageAndState = this.handleChangePageAndState.bind(this);

    }


    handleChangePageAndState(page){
        //this.props.history.replaceState(page);
        
    }




    render(){
        /*if (sessionStorage.getItem('userData') == null) {
            return (<Massage/>)
        }*/
        //this.props.location.state.detail
        //item_state={this.props.location.state.item_state}
        return (
          
            <div id="inventory">
                <SideBar/>
                <div >
                    <SearchBar   />
                    <Container handleChangePageAndState={this.handleChangePageAndState} />
                </div>  
            </div>
        );
 
    }
}




export default connect(null ) (InventoryPage);
