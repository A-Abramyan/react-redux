import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase'
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import { rootReducer } from './redux/reducer/rootReducer';
import 'firebase/auth'
import 'firebase/database'


firebase.initializeApp({
  apiKey: "AIzaSyCbRZ-at5YIc1QBhugFuOE3_XSuXw9PiyU",
  authDomain: "db-firebase-24869.firebaseapp.com",
  databaseURL: "https://db-firebase-24869-default-rtdb.firebaseio.com",
  projectId: "db-firebase-24869",
  storageBucket: "db-firebase-24869.appspot.com",
  messagingSenderId: "923981648574",
  appId: "1:923981648574:web:1bea14ef23fccd13ca44ef"
}
)
const store = createStore(rootReducer, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
