import './blogContent.css';
import firebase from 'firebase';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { postAdding } from '../redux/action';
import 'firebase/database'
import 'firebase/auth'
import Header from '../Header/header';

function BlogContent({ postAdding }) {
  const [error, setError] = useState('')
  const storage = firebase.storage()
  const [posts, setPosts] = useState({
    post: '',
    postFilter: ''
  })
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')

  // event.preventDefault()
  // const { post, postFilter } = posts
  // const newPost = {
  //   post, postFilter,
  // }
  // const postStore = async () => {
  //   const post = firebase.auth().currentUser
  //   return post ? await firebase.database().ref(`/posts/post`).set({
  //     post: post,
  //     postFilter: postFilter
  //   }) : null
  // }
  // const handleChange = (e) => {
  //   if (e.target.files) {
  //     setImage(e.target.files[0])
  //   }
  // }

  // const handleUpload = () => {
  //   const uploadtask = storage.ref(`images/${image.name}`).put(image)
  //   uploadtask.on(
  //     "state_changed",
  //     snapshot => { },
  //     error => {
  //     },
  //     () => {
  //       console.log('image', image)
  //       storage
  //         .ref('images')
  //         .child(image.name)
  //         .getDownloadURL()
  //         .then(url => {
  //           setUrl(url)
  //         })
  //     }
  //   )
  //   setImage(null)
  // }
  // useEffect(() => {
  //   const post = posts.post
  //   const postFilter = posts.postFilter
  //   // const newPost = {
  //   //   post, postFilter,
  //   // }
  //   // const user = firebase.auth().currentUser
  //   if (post) {
  //     firebase.database().ref(`/posts/${Date.now().toString()}`).set({
  //       post: post,
  //       postFilter: postFilter
  //     })
  //   } else {
  //     return null
  //   }


  // }, [posts])

  const submitPHandler = async (event, state) => {
    event.preventDefault()
    const { post, postFilter } = posts
    const newPost = {
      post, postFilter,
    }
    const postStore = async () => {
      const user = firebase.auth().currentUser
      console.log(user, 'user')
      return (

        post && postFilter ? await firebase.database().ref(`/posts/${user.uid}/${Date.now().toString()}`).set({
          post: post,
          postFilter: postFilter
        }) : null
      )
    }
    try {
      await postStore()
      setError('')
    } catch (error) {
      throw setError(error.message);
    };
    // console.log('state', state)
    postAdding(newPost)
  }
  const changeInputHandler = (event) => {
    setPosts(
      (prev => ({
        ...prev, ...{
          [event.target.name]: event.target.value
        }
      }))
    )
  }

  return (
    <div className="app">
      <Header />
      {/* <img className='userAvatar' src={url} />
        <p className='imageName'>{image != null ? image.name : ''}</p>
        <input
          className='downloadImg'
          type='file'
          onChange={handleChange} />
        {image ? <button className='addImage' onClick={handleUpload}>ADD</button> : ''} */}
      <div>
        <input
          className='postInput'
          value={posts.post}
          onChange={(event) => changeInputHandler(event)}
          name='post'
          type='text' />
        <select name='postFilter'
          onChange={changeInputHandler}
          value={posts.postFilter}
        >
          <option selected hidden>Choose here</option>
          <option>Only Frend</option>
          <option>Only me</option>
        </select>
      </div>
      {posts.post && posts.postFilter ? <button type='submit' onClick={submitPHandler} className='abbButton'>Add Post </button> : ''}
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log('state', state.post)
  return {
    post: state.post.post,
    postFilter: state.post.postFilter
  }

}
export default connect(mapStateToProps, { postAdding })(BlogContent)