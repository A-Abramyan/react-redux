import './live.css';
import firebase from 'firebase';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import 'firebase/auth'
import 'firebase/database'
import Header from '../../Header/header';

function Live() {
    const [live, setLive] = useState('')
    function foo1() {
        setLive('https://www.livescore.com/en/football/live/')

    }
    return (
        <div className="app">
            <Header />
            <p className='livePage'>
                <a href="https://www.livescore.com/en/football/live/">
                    <img className='liveLogo' src='https://pics.freeicons.io/uploads/icons/png/7648256341545304610-512.png' />
                </a>
            </p>

        </div >
    );
}

export default Live
