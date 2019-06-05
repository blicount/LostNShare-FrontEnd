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
        query:'',
        filters:{
            state:'',
            type:'',
            category:'All',
            sub_category:'',
            date_to:'',
            date_from:'',
            location:''
        },
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.handleSearchFromSideBar = this.handleSearchFromSideBar.bind(this);
    }


	componentDidMount(){
        window.addEventListener('scroll', this.listenScrollEvent);
	}

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenScrollEvent);
    }



    listenScrollEvent(){
        console.log("scroll")
        if (window.scrollY > 100) {
            document.getElementById("side_bar").style.top = (window.scrollY-100)+'px';
        }else{
            document.getElementById("side_bar").style.top = 0+'px';
        }
    }

    handleSearch(query_string){
        this.setState({query:query_string})
    }

    handleSearchFromSideBar(prop ,value){
        console.log(prop + ":" + value)
        var filters = {...this.state.filters}

        if(prop === "state"){
            if(value === "found" || value === "Found"){
                filters.state = 'found';
            }else{
                filters.state = 'lost';
            }
        }
        else if(prop === "category"){
            filters.category = value;
        }
        else if(prop === "sub_category"){
            filters.sub_category = value;
        }
        else if(prop === "date_from"){
            filters.date_from = value;

        }
        else if(prop === "date_to"){
            filters.date_to = value;
        }
        else if(prop === "location"){
            filters.location = value;
        }

        this.setState({filters})
    }

    render(){
        return (
          
            <div id="inventory">
                <SideBar handleSearchFromSideBar={this.handleSearchFromSideBar}/>
                <div onScroll={this.listenScrollEvent}>
                    <SearchBar handleSearch={this.handleSearch}  />
                    <Container query_string={this.state.query} filters={this.state.filters} />
                </div>  
            </div>
        );
 
    }
}




export default connect(null ) (InventoryPage);
