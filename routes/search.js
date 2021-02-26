var express = require('express');
var router = express.Router();
var connection = require('./../config/mySql');
var router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next)=> {
    
    try {

        type=req.body.type;
        firstName=req.body.firstName ?req.body.firstName:'';
        nationality = req.body.nationality ?req.body.nationality:'';
        sport_category= req.body.sport_category ?req.body.sport_category:'';
        
        if(req.body.type === ''){
            res.status(500).json({
                message: 'Try Again ...'
            })
        }else{
           
            const params = [type];
            let sql = 'SELECT * FROM users WHERE type = ?';
      
            if (firstName !== '' ) {
              sql += ' AND firstName RLIKE ?';
              params.push('^'+firstName);
            }
            if (nationality !== ''  ) {
              sql += ' AND nationality RLIKE ?';
              params.push('^'+nationality);
            }
            if (sport_category !=='') {
              sql += ' AND sport_category = ?';
              params.push(sport_category);
            }

            console.log(sql,params)
      
            connection.query(sql, params, (error, results, fields) => {
                        console.log(results)
                        res.send(results);
                        if(error){
                            console.log(error)
                        }
              });

        }

    } catch (error) {
        console.log(error);
    }


  });
  
  module.exports = router;
  
//   `SELECT * FROM users WHERE ${req.body.firstName && `firstName = ${req.body.firstName}`} 
//   ${req.body.nationality && `AND nationality = ${req.body.nationality}`}
//    ${req.body.sport_type && `AND sport_category in ${req.body.sport_category}`}
//     AND type=${req.body.type}`

// `SELECT * FROM users WHERE ${req.body.firstName && `firstName = '${req.body.firstName}'`} 
//         ${req.body.nationality && `AND nationality = '${req.body.nationality}'`}
//          ${req.body.sport_type && `AND sport_category in '${req.body.sport_category}'`}
//           AND type='${req.body.type}'`

// connection.query(`SELECT * FROM users WHERE ${req.body.firstName && `firstName = ${req.body.firstName}`}` ,(err,result) =>{

//     console.log(result);
//     res.send(result);
// })