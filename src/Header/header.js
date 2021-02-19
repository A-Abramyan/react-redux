import './header.css';
import firebase from 'firebase';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import 'firebase/auth'
import 'firebase/database'

function Header() {


    return (

        <div className='header'>
            <NavLink to='/blogContent'><button className='menuItem'>HOME</button></NavLink>
            <NavLink to='/live'> <button className='menuItem'>LIVE</button></NavLink>
            <NavLink to='/news'><button className='menuItem' >NEWS</button></NavLink>
            <div className='menuItem' >FAVOURITES</div>
            <div className='menuItem'>SETTING</div>
            <button className='logout' >LOGOUT</button>
        </div>
    );
}


export default Header
