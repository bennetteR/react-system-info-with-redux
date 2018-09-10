import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as mettricsFile from './data/mettrics';

const initialState = {
    data: mettricsFile[0]
};

function reducer(state = initialState, action){
    switch(action.type){
        case 'FETCH_RESULTS': 
            return {
                data: action.results
            }
        default: 
            return state;
    }

}

const store = createStore(reducer);

ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
