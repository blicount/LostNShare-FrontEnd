import React from 'react';
import { Route, Switch} from 'react-router-dom';
//import App from "../App";
import Main from "./Main";
import ProfilePage from "./Pages/ProfilePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import ReportPage from "./Pages/ReportPage";
import InventoryPage from "./Pages/InventoryPage"
import Header from "./Header";
import Footer from "./Footer";

//import Footer from "./Footer";


const Routes = () => (
 
        <div> 
            <Header /> 
            <Switch>
                <Route exact path='/' component={Main}/>
                <Route exact path='/profile' component={ProfilePage}/>
                <Route exact path='/login' component={LoginPage}/>
                <Route exact path='/register' component={RegisterPage}/>
                <Route exact path='/report' component={ReportPage}/>
                <Route exact path='/inventory' component={InventoryPage}/>
            </Switch>
            <Footer/>
        </div>
    
);
export default Routes;