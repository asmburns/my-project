import { CREATE_POST } from "./type"
import {showAlert} from './actions'

export function forbiddenWordsMiddlewear({dispatch}){

    const forbidden = ['fuck', 'php', 'spam']

    return function(next){
        return function(action){
            if(action.type === CREATE_POST){

                const found = forbidden.filter(w => action.payload.title.includes(w))
                if(found.length){
                    return dispatch(showAlert("SPAM DETECTED"))
                }
            }
            return next(action)
        }

    }

}