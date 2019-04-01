import React        from 'react';
//import axios        from 'axios';
import {withRouter} from 'react-router-dom';
import ProfileNav   from './Components/ProfileNav';
import Massage      from '../../Objects/Massage';
import General      from './Components/General';
import Items        from './Components/Items';
import UserMannage  from './Components/UserMannage';
import ItemMannage  from './Components/ItemMannage'
import ReportList   from './Components/ReportList';
import Matching     from './Components/Matching'
import {connect}    from 'react-redux'
import '../../../css/profile.css'


class ProfilePage extends React.Component{
	constructor(props){
		super(props)
		this.state = {
            links:[
                { label: 'General'		,active: true },
                { label: 'My Items'		,active: false},
                { label: 'Matching'		,active: false},
                { label: 'General'		,active: true },
                { label: 'My Items'		,active: false},
				{ label: 'Report List'	,active: false},
				{ label: 'Matching'		,active: false},
				{ label: 'User Mannage' ,active: false},
				{ label: 'Item Mannage'	,active: false}
            ],
            mannager:false
		 }
         this.handleClickSelection = this.handleClickSelection.bind(this);
     
         
	}

	componentDidMount(){
        //var user = JSON.parse(sessionStorage.getItem('userData'));
        var mannager = false;
        /*/console.log(user.email)
        /*axios.get('https://lost-and-share.herokuapp.com/users/userdetails', { headers: { email: user.email }} ).then(            
            ({ data }) =>{
                console.log(data);                                            
            }
        ).catch((error) =>{
            console.log(error);      
        }) */

        if (mannager) {
            this.setState({links:[
                { label: 'General'		,active: true },
                { label: 'My Items'		,active: false},
                { label: 'Matching'		,active: false},
                { label: 'Report List'	,active: false},
				{ label: 'User Mannage' ,active: false},
				{ label: 'Item Mannage'	,active: false}

            ]})
        }else{ 
            this.setState({links:[
                { label: 'General'		,active: true },
                { label: 'My Items'		,active: false},
                { label: 'Matching'		,active: false},

            ]})
        }
        window.addEventListener('scroll', this.listenScrollEvent);
	}

    componentWillUnmount() {
        window.removeEventListener('scroll', this.listenScrollEvent);
    }

    handleClickSelection(e){
        this.state.links.forEach(element => {
            if(element.label === e.target.innerText){
                element.active = true;
            } else{

                element.active = false 
            }   
        });     
        this.forceUpdate();
	}
	
    listenScrollEvent(){
        if (window.scrollY > 100) {
            document.getElementById("profile_nav").style.top = (window.scrollY-100)+'px';
        }else{
            document.getElementById("profile_nav").style.top = 0+'px';
        }
    }

	render(){

		if (sessionStorage.getItem('userData') == null) {
			return (<Massage/>)
        }
        if(this.state.mannager){
            return(
                <div className="profile_page" onScroll={this.listenScrollEvent}>
                    <ProfileNav     links={this.state.links} handleClickSelection={this.handleClickSelection} />
                    <General        isVisible={this.state.links[0].active ? 'visible' : 'hidden'} />
                    <Items          isVisible={this.state.links[1].active ? 'visible' : 'hidden'}/>                     
                    <Matching       isVisible={this.state.links[2].active ? 'visible' : 'hidden'}/>
                    <ReportList     isVisible={this.state.links[2].active ? 'visible' : 'hidden'}/>
                    <UserMannage    isVisible={this.state.links[3].active ? 'visible' : 'hidden'}/>
                    <ItemMannage    isVisible={this.state.links[4].active ? 'visible' : 'hidden'}/>    
                </div>
                );
        }else{
            return(
                <div className="profile_page" onScroll={this.listenScrollEvent}> 
                    <div >
                        <ProfileNav     links={this.state.links} handleClickSelection={this.handleClickSelection}  />
                    </div>
                    <div className="profile_container">
                        <General        isVisible={this.state.links[0].active ? 'visible' : 'hidden'}/>
                        <Items          isVisible={this.state.links[1].active ? 'visible' : 'hidden'}/>
                        <Matching       isVisible={this.state.links[2].active ? 'visible' : 'hidden'}/>
                    </div>
                </div>
                );
        }
        }
        
	}
export default withRouter(connect(null,{} ) (ProfilePage));

