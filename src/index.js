import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux';
import store from './store/index.js';
//import { LoginContextProvider } from './Component/Store/LoginContex.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <LoginContextProvider>
    
  //   <App />
    
  // </LoginContextProvider>
   <Provider store={store}><App/></Provider> 
  
);


reportWebVitals();
