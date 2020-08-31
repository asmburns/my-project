const nano = require('nano')('http://admin:password@localhost:5984')

function createDB(dbName){
    nano.db.get(dbName).then((body) => {
        console.log(dbName + ' EXISTS');
      }).catch((err) => {
        nano.db.create(dbName).then((body) => {
            console.log('database '+dbName+' created!')
        }) 
      })
}

createDB('users')
createDB('usersession')
createDB('categories')
createDB('lotgroup')
createDB('lot')
createDB('message')
createDB('rating')






 

