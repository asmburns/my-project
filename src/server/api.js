const express = require('express')
const cors = require('cors')
const path = require('path')
const {v4} = require('uuid')
const fetch = require('node-fetch');
const app = express()
const nano = require('nano')('http://admin:password@localhost:5984')
const VK_USERS_API = "https://api.vk.com/method/users.get?&fields=photo_50,home_town,bdate&access_token=08a3f22f08a3f22f08a3f22fb508d0bb45008a308a3f22f5786e9344de2e237ad79a0cf&v=5.122&user_ids=";

const users = nano.use('users')
const usersession = nano.use('usersession')
const categories = nano.use('categories')
const lotgroup = nano.use('lotgroup')
const lot = nano.use('lot')
const message = nano.use('message')
const rating = nano.use('rating')



app.use(express.json())
app.use(cors())


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

async function getVkUserInfo(userId){
  //console.log(VK_USERS_API + userId)
  const response = await request(VK_USERS_API + userId)
  //console.log(response)
  return response.response[0];
}



// POST
app.post('/loginvk', (req, res) => {

  //let user = req.body.session.user

  let user = {}
  user._id = 'vk_'+req.body.session.user.id
  user.name = req.body.session.user.first_name + " " + req.body.session.user.last_name
  

  getVkUserInfo(req.body.session.user.id).then((vkInfo)=>{
    user.photo_50 = vkInfo.photo_50
    users.get(user._id).then((body) => {
      //console.log("User exists: " + body);
      user._rev = body._rev
      //user._new_edits = false
      users.insert(user,{new_edits:true})
    }).catch((err) => {
      //console.log('SERVER_ERROR:' + err);
      //user._rev = '1'
      users.insert(user)
    }).then((body) => {
      //console.log("SUCCESS:" + body);
      res.json(user)
    }).catch((err) => {
      //console.log('SERVER_ERROR2:' + err);
    })
  }).catch((err) => {
    console.log('SERVER_ERROR3:' + err);
  })

})


// POST
app.post('/loginfb', (req, res) => {

  let user = {}

  user._id = 'fb_'+req.body.id
  user.name = req.body.name
  user.photo_50 = req.body.picture.data.url


  users.get(user._id).then((body) => {
      //console.log("User exists: " + body);
      user._rev = body._rev
      //user._new_edits = false
      users.insert(user,{new_edits:true})
    }).catch((err) => {
      //console.log('SERVER_ERROR:' + err);
      //user._rev = '1'
      users.insert(user)
    }).then((body) => {
      //console.log("SUCCESS:" + body);
      res.json(user)
    }).catch((err) => {
      //console.log('SERVER_ERROR2:' + err);
    })

})


// POST
app.post('/session', (req, res) => {

  //console.log(req.body);
  let user = req.body;

  // usersession.get(null, {userId:user._id}).then((body) => {
  //   console.log(body);
  // }).catch((err) => {
  //   console.log(err);
  // })

  const q = {
    selector: {
      userId: { "$eq": user._id}
    },
    fields: [ "_id","userId","_rev"],
    limit:1
  };
  usersession.find(q).then((doc) => {
    console.log("Find compleate");
    console.log(doc);
    if(doc.docs.length === 0){
      usersession.insert({userId:user._id}).then((body) => {
        console.log("Session created");
        console.log(body);
        res.json({_id:body.id,userId:user._id,_rev:body.rev,user:user})
      })
    }else{
      res.json({...doc.docs[0],user:user})
    }
  }).catch((err) => {
    console.log(err);
  });



})
  
app.listen(3000, () => console.log('Server has been started on port 3000...'))