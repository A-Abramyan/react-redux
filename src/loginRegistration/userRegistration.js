import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import './userRegistration.css'
import { connect } from 'react-redux'
import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'
import { userRegistration } from '../redux/action';


function UserRegistration({ userRegistration }) {
    const [registration, setRegistration] = useState(false)
    const [validation, setValidation] = useState(false)
    const [error, setError] = useState('')
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        userName: '',
        id: ''
    })
    const [uid, setUid] = useState('')
    const history = useHistory();


    const submitHandler = async (event) => {
        event.preventDefault()
        const { email, password, userName } = userInfo
        const newUser = {
            email, password, userName,
        }

        const getUid = async () => {
            // const user = firebase.auth().currentUser;

            // console.log('user', user)

            // if (user) {
            //     firebase.database().ref(`/user/${user.uid}/info`).set({
            //         name: userName,
            //         email: email
            //     })
            // }
        }

        // const test = await getUid()
        setError('')
        setValidation(true)
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                firebase.database().ref(`/user/${user.uid}/info`).set({
                    name: user.displayName,
                    email: user.email
                })
            })
            .catch((error) => {
                setValidation(false)
                throw setError(error.message);
            })

        console.log('fdsfdsfdsfdsfdsfds', firebase.auth())
        console.log('userRegistration', userRegistration)
        userRegistration(newUser)
        setRegistration(true)
    }



    useEffect(() => {
        if (registration && validation) {
            history.push("/");
        }
    })

    const changeInputHandler = (event) => {
        setUserInfo(
            (prev => ({
                ...prev, ...{
                    [event.target.name]: event.target.value
                }
            }))
        )
    }
    return (
        <form className='formReg' onSubmit={submitHandler}>
            <div className='generalPage'>
                <div className='homePageArow'>
                    <NavLink to='/'>
                        <img className='registrationLogo' src='https://cdn.iconscout.com/icon/free/png-256/back-arrow-1767531-1502435.png' />
                    </NavLink>
                </div>
                <div className='inputDiv'>
                    <div className='registrationForm'>
                        `<h2> Registration </h2>
                        <p className='registrError'>{error}</p>
                        <input
                            type='text'
                            name='email'
                            placeholder='Email'
                            value={userInfo.email}
                            onChange={changeInputHandler}
                        />
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={userInfo.password}
                            onChange={changeInputHandler}
                        />
                        <input
                            name='userName'
                            type='text'
                            placeholder='UserName'
                            value={userInfo.userName}
                            onChange={changeInputHandler}
                        />
                        <div>{
                            userInfo.email && userInfo.password && userInfo.userName ?
                                <button type='submit' className='addButton' onClick={submitHandler} >Registration </button>
                                : null
                        }
                        </div>
                    </div>
                </div>
            </div >
        </form >

    )
}
const mapStateToProps = (state) => {

    console.log('state', state)
    return {
        password: state.registration.password,
        email: state.registration.email,
        userName: state.registration.userName
    }

}

export default connect(mapStateToProps, { userRegistration })(UserRegistration)