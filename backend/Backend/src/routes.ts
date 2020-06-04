import { Request,Response,RequestHandler } from "express";

import express = require('express');

const router = express.Router();

const Form = require("./Form")

import session = require('express-session');

router.get('/',(req,res)=>{
    res.send("hello")
});
router.get('/login/name',(req:Request,res:Response)=>{
    Form.find({})
       .then((data:any)=>{
           console.log('data:',data)
           res.json(data);
       })
       .catch((error: any)=>{
           console.log('error:');
       });
    
});

// interface Response{
//     send(user: any);
//     json: any;
//     status?:number;
// }

router.post('/api/register',(req:Request,res:Response)=>{
    console.log('body',req.body);
    const data = req.body;
    const form = new Form(data); 
    Form.findOne({email:req.body.email},function(err:any,user:object){
        if(user){
          return  res.status(500).json({
                success:false,
                msg:"User already exists"})
              }
            else{
                if(req.session){
                req.session.form = form._id; 
                }
                form.password = form.generateHash(data.password);
                
                form.save((error:any)=>{
                    if(error){
                     res.status(500).json({msg:"internal server error"})
                    return;
                    }
                    return res.status(200).send({
                            success:true,
                            msg: "recieved a data"
                        })
                    
                })}})
    
    
});

router.post('/api/login',function(req:Request,res:Response){
    const data = req.body;
    
    const form = new Form(data);
    let email =req.body.email;
    let password = req.body.password
     console.log(data);
    Form.findOne({email:email},function(err:Error,user:any){
        console.log("user is ",user)
        if(err){
            console.log("invalid email or password ");
            return res.status(500).send();
        }
        if(!user){
            
            return res.status(404).send({
                success :false,
                message : 'user not matched'
            });
            
        }
        
        if(!user.validPassword(password)){
            return res.status(404).send({
                success :false,
                message : 'password not matched'
            });
        }
        console.log("user found");
        req.session.form= user._id;
        return res.status(200).send({
            id:user.id,
            success:true,
            message:'valid sign in'
        });
        
  
    })

})

// // router.get('/api/dashboard',function(req,res){
// //     if(!req.session.user){
// //         return res.status(401).send();
// //     }
// //     return res.status(200).send("Welcome to dashboard");
// // })

router.get('/api/logout',function(req:Request,res:Response){
    req.session.destroy(err=>{
        if(err){
            return err.send({
                success:false,
                message:"invalid logout"
            })
        }
        return res.status(200).send({
            success:true,
            message:"logout sucesfull"
        })
    })
});
router.get('/api/sessionAssigned',(req:Request,res:Response)=>{
    if(req.session )
    {if(req.session.form){
       return res.status(200).send({
            id:req.session.form,
            success:true,
            message:"user Logged In"
        });
    }
}
    return res.json({
        success:false,
        message:"user not logged in"
    })
})

router.get('/api/getSignedUser/:id',(req:Request,res:Response)=>{
    Form.findOne({_id:req.params.id},function(err:Error,user:Object){
        if(err){
            return("user not found")
        }
        if(!user){
            return res.status(404).send("user not found")
        }
        return res.send(user);
    });

})


module.exports = router;

