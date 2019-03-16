import React from 'react';
import { Route, Switch} from 'react-router-dom';
//import App from "../App";
import Main from "./Main";
import UserPage from "./Pages/UserPage";
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
                <Route exact path='/User' component={UserPage}/>
                <Route exact path='/Login' component={LoginPage}/>
                <Route exact path='/Register' component={RegisterPage}/>
                <Route exact path='/Report' component={ReportPage}/>
                <Route exact path='/Lost' component={InventoryPage}/>
                <Route exact path='/Found' component={InventoryPage}/>
            </Switch>
            <Footer/>
        </div>
    
);
export default Routes;