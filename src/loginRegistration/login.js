
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from "react-router-dom";
import './login.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { userRegistration } from '../redux/action';
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'


function UserLogin(userRegistration) {
    const [error, setError] = useState('')
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const history = useHistory();

    const loginbtn = async (event) => {
        event.preventDefault()
        const { email, password } = userData
        console.log(email)
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
            history.push("/blogContent");

        } catch (error) {
            setError(error.message)
        };
    }

    const changeInputHandler = (event) => {
        setUserData(
            (prev => ({
                ...prev, ...{
                    [event.target.name]: event.target.value
                }
            }))
        )
    }

    return (
        <div className='loginBody'>
            <div className='loginPage'>
                <div className='loginForm'>
                    <div>
                        <h2>LogIn</h2>
                        <div>
                            <div>
                                <p className='error'>{error}</p>
                                <input
                                    type='text'
                                    name='email'
                                    className='emailInp'
                                    placeholder='Email'
                                    value={userData.email}
                                    onChange={changeInputHandler}
                                />
                            </div>
                            <div>
                                <input
                                    type='password'
                                    name='password'
                                    minLength='8'
                                    maxLength='16'
                                    className='passwordInp'
                                    placeholder='Password'
                                    value={userData.password}
                                    onChange={changeInputHandler}
                                />
                            </div>
                        </div>
                        <NavLink to='/userRegistration' ><button className='registrationBtn'>Registration</button></NavLink>
                        <button className='loginBtn' onClick={loginbtn} >LogIn</button>

                    </div>
                </div>
            </div>
        </div>
    )

}
const mapStateToProps = (state) => {
    return {
        password: state.registration.password,
        email: state.registration.email,
        userName: state.registration.userName
    }

}

export default connect(mapStateToProps, { userRegistration })(UserLogin)