var cookieParser = require('cookie-parser');
var mysql = require('mysql')
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sportsdb'
});

connection.connect(function(err){
    if(err) throw err;
    console.log('connected');
});


module.exports = connection;