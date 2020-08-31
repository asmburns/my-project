import React from 'react';

import Post from './Post';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPost } from '../redux/actions';


export default ()=>{

    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.fetchedPosts)
    const loading = useSelector(state => state.app.loading)

    if(loading){
        return <h5>LOADING</h5>
    }else{
        if (!posts || !posts.length){
            return <button className="btn btn-primary" onClick={()=>dispatch(fetchPost())}>Загрузить</button>
        }
        return(
            posts.map(post=> <Post post={post} key={post.id}></Post>)
            
        )
    }
}


