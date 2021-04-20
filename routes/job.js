var express = require('express');
var router = express.Router();
var connection = require('./../config/mySql');
var router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/jobPost', (req, res)=>{
    try{
        if(req.body.job_type ==='' || req.body.location === '' || req.body.published === ''|| req.body.org === '' ||req.body.name ==='' ){
                return res.send('invalid entry');
        }else{
                let postJob ={
                    "job_type":req.body.job_type,
                    "org":req.body.org,
                    "location":req.body.location,
                    "summary":req.body.summary,
                    "responsibility":req.body.responsibility,
                    "skills":req.body.skills,
                    "benefits":req.body.benefits,
                    "published":req.body.published, //open date
                    "close":req.body.close, //close date
                    "name":req.body.name, //job name
                    "ID":req.body.id, // id posted by the person in the users table 
                }

                let sql = "INSERT INTO job SET ?";
                connection.query(sql,postJob,(err,data)=>{
                    if(err) {
                        console.log(err);
                        return res.send(err.sqlMessage);
                    }
                    else {
                        console.log('Post added');
                        return res.send({data: data, status: "success"});
                    }
                })
        }

    }catch(err){
        console.log(err);
    }    
    
});


//get a job

router.get("/jobList/:location", (req, res) => {
  let location = req.params.location;
  console.log(location, "jjj");

  let sql = `SELECT * FROM job `;

  if (location !== 'null') {
    sql += `WHERE location RLIKE '${location}'`;
    console.log(location, "l");
  }

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return res.send({ data: error, status: "error" });
    } else {
      return res.send({ data: results, status: "success" });
    }
  });
});


router.post('/apply',(req,res)=>{
    
    try{
        if(req.body.user_id === '' || req.body.job_id === '' ){
                return res.send('invalid Apply');
        }else{
                let apply ={
                    "user_id":req.body.user_id,
                    "job_id":req.body.job_id,
                }

                let sql = "INSERT INTO jobapply SET ?";
                connection.query(sql,apply,(err,data)=>{
                    if(err) {
                        console.log(err);
                        return res.send(err.sqlMessage);
                    }
                    else {
                        console.log('Job applied');
                        return res.send({data: data, status: "success"}); 
                    }
                })
        }

    }catch(err){
        console.log(err);
    }    
    
})

//delete job

router.delete('/deleteJob/:id',(req,res)=>{
    id = req.params.id ? req.params.id:'';
    console.log('deleted id '+req.params.id)
    if(id === ''){
        res.status(500).json({
            message: 'Try Again ...'
        })
    }else{
        
        connection.query('DELETE FROM job WHERE job_id =?',[id],(error,result)=>{
            if(error){
             throw error;   
            }else{
                return res.send({data: " ", status: "success"});
            }
        })
    }
})

module.exports = router;