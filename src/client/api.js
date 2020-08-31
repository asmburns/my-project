import { SERVER_API } from "../constants"
import {v4} from "uuid"
import { sessionService } from 'redux-react-session';


async function createUpdateSession(user){
    console.log("create session");
    const response = await request(SERVER_API + 'session', 'POST', user)
    console.log(response)
    //sessionService.saveSession(response).then(currentSession => console.log(currentSession)).catch(err => console.log(err))
    sessionService.saveSession(response._id)
      .then(() => {
        sessionService.saveUser(response.user)
        .then(() => {
          console.log("OK")
        });
      });
    
}


export async function loginFbServer(vrResponse){
    const response = await request(SERVER_API + 'loginfb', 'POST', vrResponse)
    createUpdateSession(response).then(currentSession => console.log(currentSession)).catch(err => console.log(err))
}

export async function loginVkServer(vrResponse){
    const response = await request(SERVER_API + 'loginvk', 'POST', vrResponse)
    createUpdateSession(response).then(currentSession => console.log(currentSession)).catch(err => console.log(err))
}


export const logout = () => {
    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
    };
  };
  

async function request(url, method = 'GET', data = null) {
    try {
      const headers = {}
      let body
  
      if (data) {
        headers['Content-Type'] = 'application/json'
        body = JSON.stringify(data)
      }
  
      const response = await fetch(url, {
        method,
        headers,
        body
      })
      return await response.json()
    } catch (e) {
      console.warn('Error:', e.message)
    }
}