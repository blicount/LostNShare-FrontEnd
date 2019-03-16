import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk  from 'redux-thunk';
import {createStore , applyMiddleware} from 'redux';
import Routes from './components/Routes'



const store = createStore(
    (state = {}) => state,
    applyMiddleware(thunk )

)

ReactDOM.render(( 
    <Provider store={store}>
        <BrowserRouter>
                < Routes/>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));

