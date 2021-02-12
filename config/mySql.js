var mySql = require('mysql')
var connection = mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sprotdb'
})

connection.connect(function(err){
    if(err) throw err;
    console.log('connected');
});


module.exports = connection;