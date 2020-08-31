import {combineReducers} from 'redux'
import { postsReducer } from "./postsReducer";
import { appReducer } from './appReducer';
import { sessionReducer } from 'redux-react-session';

export const rootReducer = combineReducers({posts: postsReducer, app: appReducer, session: sessionReducer}) 