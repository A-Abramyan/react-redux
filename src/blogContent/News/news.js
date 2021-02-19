import './news.css';
import firebase from 'firebase';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/database'
import { postAdding } from '../../redux/action';
import { connect } from 'react-redux'
import Header from '../../Header/header';

function News(props) {
    const history = useHistory();
    const [post, setPost] = useState({
        post: '',
        postFilter: ''
    })
    const [categoris, setCategori] = useState({ categori: '' })
    const [postList, setPostList] = useState([])

    //     useEffect(() => {
    //         console.log('55555555555555555555', firebase.database().ref(`info`,).on('value', function (a) {
    //             // setNews({
    //             //     [post]: a.val().post,
    //             //     post1: a.val().post1,
    //             //     post2: a.val().post2
    //             // })
    //         }))
    //     console.log('news', news)
    //     firebase.database().ref(`imag`,).on('value', function (snapshot, a) {
    //         setPost(
    //             ((prev) => ({
    //                 ...prev, ...{
    //                     img: snapshot.val().img,
    //                     post: a.val().post,
    //                 }
    //             }))
    //         )
    //     });
    //     console.log('sssssssssss', post)
    // })
    const changeInputHandler = (event) => {
        setCategori(
            (prev => ({
                ...prev, ...{
                    [event.target.name]: event.target.value
                }
            }))
        )
    }
    console.log('categoris', categoris)
    console.log('setPostList', postList)
    useEffect(() => {
        props.post.map(elem => setPost({
            post: elem.post,
            postFilter: elem.postFilter
        }))
        setPostList([...props.post])
    }, props)
    // postList.splice(0, 1)

    return (
        < div className="app" >
            <Header />
            <select name='categori'
                onChange={changeInputHandler}
            >
                <option selected hidden>Choose here</option>
                <option>AllUser</option>
                <option>Only Frend</option>
                <option>Only me</option>
            </select>
            {postList.map(elem => {
                const valid = !categoris.categori || elem.postFilter == categoris.categori
                if (valid && elem.post && elem.postFilter) {
                    return < div className='position1' >
                        <div className='infoDiv'>
                            {elem.post}
                        </div>
                    </div>
                } else if (categoris.categori == 'AllUser' && elem.post && elem.postFilter) {
                    return < div className='position1' >
                        <div className='infoDiv'>
                            {elem.post}
                        </div>
                    </div>
                }
            })}
        </div >
    );
}
const mapStateToProps = (state) => {
    console.log(state.post)

    return {
        post: state.post,
        postFilter: state.post
    }

}
export default connect(mapStateToProps, { postAdding })(News)
