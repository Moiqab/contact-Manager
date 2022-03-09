const express=require('express');
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');
const auth = require('../middleware/auth');

const User=  require('../models/Users');

const router=express.Router();

router.get('/', auth, async (req,res)=>{
    try{
        const user=  await User.findById(req.user.id).select('-password');
        res.json(user);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send(' server error ');

    }
})

router.post('/',[
    check('email', 'please provide a valid email').isEmail(),
    check('password',  'please enter a password ').exists()
]
,
 async (req,res)=>{
    const errors= validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
}
     const{email,password}= req.body;
     try{
         let user = await User.findOne({email});
         if(!user){
             return res.status(400).json({msg: 'A user with this email not exits'})
         }
         const isMatch = await bcrypt.compare(password,user.password);
         if(!isMatch){
             return res.status(400).json({msg: 'Incorrect password'})
         }
         const payload={
            user:{
                id: user.id
            }
        }
        jwt.sign(payload , config.get('jwtSecret'), {
            expiresIn: 400000
        }, (err, token)=>{
            if(err) throw err;
            res.json({ token })
        })
     }
     catch(err){
        console.error(err.message);
        res.status(500).send('server error');

     }
 });


module.exports=router;