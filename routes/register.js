var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection = require('./../config/mySql');
var router = express.Router();
var bcrypt = require('bcrypt');

// router.post('/', async (req, res) => {
//   try
// })

// exports.register = async function(req,res){
//     const password = req.body.password;
//     const encryptedPassword = await bcrypt.hash(password, saltRounds)
//     var users={
//        "type":req.body.type,  //player, coach and user
//        "firstName":req.body.firstName,
//        "lastName":req.body.lastName,
//        "email":req.body.email,
//        "number":req.body.number,
//        "password":encryptedPassword
//      }
    
//     connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
//       if (error) {
//         res.send({
//           "code":400,
//           "failed":"error ocurred"
//         })
//       } else {
//         res.send({
//           "code":200,
//           "success":"user registered sucessfully"
//             });
//         }
//     });
//   }

module.exports = router;