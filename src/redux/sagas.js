import {takeEvery, put,call} from 'redux-saga/effects'
import {REQUEST_POSTS, FETCH_POSTS} from './type'
import { showLoading, hideLoading, showAlert } from './actions'

export function* sagaWatcher(){
    yield takeEvery(REQUEST_POSTS,sagaworker)
}

function* sagaworker(){
    try {
        yield put(showLoading())
        const payload = yield call(fetchPosts)
        yield put({type: FETCH_POSTS, payload: payload})
        yield put(hideLoading())    
    } catch (error) {
        yield put(showAlert("" + error))
        yield put(hideLoading())    
    }
    
}

async function fetchPosts() {

            const response = await fetch ('https://jsonplaceholder.typicode.com/posts?_limit=5')
            return  await response.json()


    // return async dispatch => {
    //     try {
    //         dispatch(showLoading())
    //         const response = await fetch ('https://jsonplaceholder.typicode.com/posts?_limit=5')
    //         const json = await response.json()

    //         setTimeout(() => {
    //             dispatch({type: FETCH_POSTS, payload: json})
    //             dispatch(hideLoading())    
    //         }, 500);
    //     } catch (error) {
    //         dispatch(showAlert("" + error))
    //         dispatch(hideLoading())    
    //     }
        
    // }
    
}