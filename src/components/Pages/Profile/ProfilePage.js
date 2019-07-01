import React from 'react';
import axios        from 'axios';
import { withRouter } from 'react-router-dom';
import ProfileNav from './Components/ProfileNav';
import Massage from '../../Objects/Massage';
import General from './Components/General';
import Items from './Components/Items';
import UserMannage from './Components/UserMannage';
import ItemMannage from './Components/ItemMannage'
import CategoryMannage from './Components/CategoryMannage'
import ReportList from './Components/ReportList';
import { connect } from 'react-redux'
import '../../../css/profile.css'


class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            links: [
                { label: 'General', active: true },
                { label: 'My Items', active: false },
                { label: 'Report List', active: false },
                { label: 'Category Mannage', active: false },
                { label: 'User Mannage', active: false },
                { label: 'Item Mannage', active: false }
            ],
            mannager: false,
            loading:true,
            visibleLink: 'General'
        }
        this.handleClickSelection = this.handleClickSelection.bind(this);


    }

    componentWillMount() {
        var user = JSON.parse(sessionStorage.getItem('userData'));
        var mannager = false;
        
        axios.post('https://lost-and-share.herokuapp.com/users/CheckIfManger', { email: user.email } ).then(            
            ({ data }) =>{
           
                mannager = data; 
                if (mannager) {
                    this.setState({
                        mannager:true,
                        loading:false,
                        links: [
                            { label: 'General', active: true },
                            { label: 'My Items', active: false },
                            { label: 'Event List', active: false },
                            { label: 'Category Mannage', active: false },
                            { label: 'User Mannage', active: false },
                            { label: 'Item Mannage', active: false }

                        ]
                    })
                } else {
                    this.setState({
                        loading:false,
                        links: [
                            { label: 'General', active: true },
                            { label: 'My Items', active: false },

                        ]
                    })
                }
                this.state.links.forEach(element => {
                    if (element.label === this.state.visibleLink) {
                        element.active = true;
                    } else {

                        element.active = false
                    }
                });                                                                                   
            }
        ).catch((error) =>{
            console.log(error);      
        }) 

        window.addEventListener('scroll', this.listenScrollEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenScrollEvent);
    }

    handleClickSelection(e) {
        this.state.links.forEach(element => {
            if (element.label === e.target.innerText) {
                element.active = true;
                this.setState({ visibleLink: element.label })
            } else {
                element.active = false
            }
        });
        this.forceUpdate();
    }

    listenScrollEvent() {
        if (window.scrollY > 100) {
            document.getElementById("profile_nav").style.top = (window.scrollY - 100) + 'px';
        } else {
            document.getElementById("profile_nav").style.top = 0 + 'px';
        }
    }

    render() {

        if (sessionStorage.getItem('userData') == null) {
            return (<Massage />)
        }
        if(this.state.loading){
            return(
               
                <img alt="logo" className="loading" src="https://gdurl.com/NXps" />
            )
        }
        if (this.state.mannager) {
            return (
                <div className="profile_page" onScroll={this.listenScrollEvent}>
                    <div >
                        <ProfileNav links={this.state.links} handleClickSelection={this.handleClickSelection} />
                    </div>
                    <div className="profile_container">
                    <General isVisible={this.state.links[0].active ? 'visible' : 'hidden'} />
                    <Items isVisible={this.state.links[1].active ? 'visible' : 'hidden'} />
                    <ReportList isVisible={this.state.links[2].active ? 'visible' : 'hidden'} />
                    <CategoryMannage isVisible={this.state.links[3].active ? 'visible' : 'hidden'}/>
                    <UserMannage isVisible={this.state.links[4].active ? 'visible' : 'hidden'} />
                    <ItemMannage isVisible={this.state.links[5].active ? 'visible' : 'hidden'} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="profile_page" onScroll={this.listenScrollEvent}>
                    <div >
                        <ProfileNav links={this.state.links} handleClickSelection={this.handleClickSelection} />
                    </div>
                    <div className="profile_container">
                        <General isVisible={this.state.links[0].active ? 'visible' : 'hidden'} />
                        <Items isVisible={this.state.links[1].active ? 'visible' : 'hidden'} />
                    </div>
                </div>
            );
        }
    }

}
export default withRouter(connect(null, {})(ProfilePage));

