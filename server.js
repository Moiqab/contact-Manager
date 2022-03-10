const express= require('express');
const connectdb= require('./config/db');
const path = require('path');

const app=express();

connectdb();

app.use(express.json({extended : false}))

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

//server static files on production server

if(process.env.NODE_ENV==='production'){
    //set static folder

    app.use(express.static('client/build'));
    app.get('*' , (req,res)=>res.sendFile(path.resolve(__dirname ,'client' , 'build', 'index,html')));
}

const PORT= process.env.PORT || 5000;



app.get('/' ,(req,res) => res.json({msg: 'Welcome to contact manager app'}))
app.listen(PORT,()=> console.log(`server started on port ${PORT}`));