var express = require('express');
var router = express.Router();
var connection = require('./../config/mySql');
var router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/signup', (req, res) => {
  try {
      if(req.body.type === '' || req.body.firstName === ''  || req.body.password === '' || req.body.phone === null || req.body.email === '' ){
          res.status(500).json({
              message: 'Try Again'
          })
      }else{
          bcrypt.hash(req.body.password, 10, (err, hash) => {
              if(err){
                  return res.status(500).json({
                      error: err,
                  });
              }else{
                  let user = {
                          "type":req.body.type,  //player, coach and user
                          "firstName":req.body.firstName,//for company its org name
                          "dob":req.body.dob,
                          "email":req.body.email,
                          "phone":req.body.phone,
                          "password":hash,
                          "nationality":req.body.nationality,
                          "sport_category":req.body.sport_category,
                          "org_location":req.body.org_location,
                          "job_location":req.body.job_location,
                          "playing_since":req.body.playing_since,
                          "coaching_since":req.body.coaching_since
                  }
                  let sql = "INSERT INTO users SET ?"
                  connection.query(sql, user,  (err, data)=> {             
                          if(err) {
                              console.log(err);
                              return res.send(err.sqlMessage);
                          }
                          else {
                              console.log('user added');
                              return res.send(data);
                          }
                  }); 
              }
          })
      }
      
      
  }
  catch(err) {
      console.log(err);
  }
});


// User Login
router.post('/login', (req, res, next) => {
    let email = req.body.userId;
    let phone = req.body.userId;
        connection.query('SELECT * FROM users WHERE email = ? OR phone = ?', [email,phone], (error, result, field) => {
        if( result.length > 0){
                bcrypt.compare( req.body.password, result[0].password, (err, results) => {
                if(err){
                    return res.status(401).json({
                        message: 'Login Failed'
                    })
                }
                if(results){
                    const token = jwt.sign({
                        type: result[0].type,
                        firstName: result[0].firstName,
                        lastName: result[0].lastName,
                        
                    }, 
                    'secret',
                    {
                        expiresIn: '1h',
                    }
                    );
                    return res.status(200).json({
                        message: 'Login Successful',
                        token: token,
                    })
                }
                res.status(401).json({
                    message: 'Incorrect Password',
                })
            })



        }else{
            return res.status(401).json({
                message: 'Incorrect Email or Phone Number.'
            })

        }
        
    })
})

//get user list  

router.get('/getAllUsers/:type',(req,res)=>{
            
        
            let type = req.params.type;
            console.log(type)

            connection.query('SELECT * FROM users WHERE type = ?', [type], (error, result, field) =>{
            if( result.length > 0){
                   return res.send({data: result, status: "success"});

            }else{
                return res.send({data: error, status: "error"});
    
              }
            })
            
})

//add rating

router.post('/addRating',(req,res)=>{
        id = req.body.id ?req.body.id:'';
        rating = req.body.rating ?req.body.rating:'';

        if(req.body.id ==='' || req.body.rating ==='' ){
            res.status(500).json({
                message: 'Try Again ...'
            })
        }else{
            
            connection.query('UPDATE users SET rating = ? WHERE ID =?',[rating,id],(error,result)=>{
                if(error){
                 throw error;   
                }else{
                    return res.send({data: " ", status: "success"});
                }
            })
        }
})

//delete user 


router.delete('/deleteUser/:id',(req,res)=>{
    id = req.params.id ? req.params.id:'';
    console.log('deleted id '+req.params.id)
    if(id === ''){
        res.status(500).json({
            message: 'Try Again ...'
        })
    }else{
        
        connection.query('DELETE FROM users WHERE ID =?',[id],(error,result)=>{
            if(error){
             throw error;   
            }else{
                return res.send({data: " ", status: "success"});
            }
        })
    }
})

module.exports = router;
