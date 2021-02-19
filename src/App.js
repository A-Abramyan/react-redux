import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import firebase from 'firebase';
import { BrowserRouter, Route } from 'react-router-dom';
import BlogContent from './blogContent/blogContent';
import UserLogin from './loginRegistration/login';
import UserRegistration from './loginRegistration/userRegistration';
import News from './blogContent/News/news';
import Live from './blogContent/Live/live';
import Header from './Header/header';


function App() {
  const [newsImg, setNewsImg] = useState('')
  const [user, setUser] = useState({
    name: '',

  })

  function foo1() {
    firebase.database().ref(`name`,).on('value', function (snapshot) {
      setUser({
        name: snapshot.val(),
      })
    });

    console.log('user', user)
  }

  useEffect(() => {
    firebase.database().ref(`img`).on('value', function (snapshot) {
      setNewsImg(snapshot.val())
    });
  });
  console.log(newsImg)
  return (
    <BrowserRouter>
      <div className='App'>
        <Route exact path='/' render={() => <UserLogin />} />
        <Route exact path='/userRegistration' render={() => <UserRegistration />} />
        <Route exact path='/blogContent' render={() => <BlogContent />} />
        <Route exact path='/news' render={() => <News  />} />
        <Route exact path='/live' render={() => <Live />} />
        {/* <UserLogin /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
