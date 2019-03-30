import React from 'react';
import { Route, Switch} from 'react-router-dom';
import Main from "./Main";
import ProfilePage from "./Pages/Profile/ProfilePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import ReportPage from "./Pages/ReportPage";
import InventoryPage from "./Pages/Inventory/InventoryPage"
import ItemPage from './Pages/Item/ItemPage'
import Header from "./Header";
import Footer from "./Footer";

//import Footer from "./Footer";


class Routes  extends React.Component{ 
    constructor(props){
        super(props)
        this.state = {
            user_id:''
        }
    }

    componentWillMount(){
        if (sessionStorage.getItem('userData') !== null) {
            var user = sessionStorage.getItem('userData');
			this.setState({user_id:user.id});
		}
    }

    render(){

        return (
        <div> 
            <Header /> 
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/profile/:id' component={ProfilePage} />
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/register' component={RegisterPage}/>
                <Route exact path='/report' component={ReportPage}/>
                <Route path='/inventory' component={InventoryPage}/>
                <Route path='/item/:id' component={ItemPage}/>
               
            </Switch>
            <Footer/>
        </div>
        );
    }
}
export default Routes;