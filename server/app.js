const express = require('express');
const graphQlHTTP = require('express-graphql');
const app = express();
app.use('/graphql',graphQlHTTP({

}));
app.get('/',(req,res)=>{
    res.send('<h1>Namaste !!! Gaurav Here.</h1>');
})

app.listen(3000,()=>{
    console.log('listening to port 3000...');
})