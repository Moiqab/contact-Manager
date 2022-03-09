const express=require('express');
const {check, validationResult} = require('express-validator');
const User=  require('../models/Users');
const Contact=require('../models/contact');
const auth = require('../middleware/auth');
const { findById, findByIdAndUpdate } = require('../models/Users');

const router=express.Router();

router.get('/', auth, async (req,res)=>{
    try{
        const contacts=await Contact.find({user: req.user.id}).sort({
            date: -1
        });
        res.json(contacts);
    }
    catch(err){
     console.error(err.message);
     res.status(500).send('server Error')
    }
})

router.post('/', [auth, [
     check('name' , 'Name is required').not().isEmpty()
]] , async (req,res)=>{
    const errors= validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()})
}
  const { name, email, phone , type }=req.body;

  try{
      const newContact=new Contact({
          name,
          email,
          phone,
          type,
          user: req.user.id
      })
      const contact = await newContact.save();
      res.json(contact);
  }
  catch(err){
     console.error(err.message);
     res.status(500).send('Server Error')
  }
});
router.put('/:id', auth,  async (req,res)=>{
    const { name , email, phone, type}= req.body;
    const contactFields = {};

    if(name) contactFields.name=name;
    if(email) contactFields.email=  email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type= type;

    try{
        let contact= await Contact.findById(req.params.id);
        //check if the contacts exists
        if(!contact) return res.status(404).json({msg: 'Thsi contact does not exists'})
        //if exists
        if(contact.user.toString() !== req.user.id){
        return res.status(404).json({msg: 'You do not have correct  authorization'})
        }
        contact = await Contact.findByIdAndUpdate(req.params.id,
            {  $set: contactFields},
            {new: true}
            );
            res.json(contact);

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error')

    }
})
router.delete('/:id',auth, async (req,res)=>{
    
    try{
        let contact= await Contact.findById(req.params.id);
        //check if the contacts exists
        if(!contact) return res.status(404).json({msg: 'Thsi contact does not exists'})
        //if exists
        if(contact.user.toString() !== req.user.id){
        return res.status(404).json({msg: 'You do not have correct  authorization'})
        }
        await Contact.findByIdAndRemove(req.params.id);
       res.json({msg : 'The contact has been deleted'})

    }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error')

    }
})


module.exports=router;