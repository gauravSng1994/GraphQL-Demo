const express = require('express');
const graphQlHTTP = require('express-graphql');
const graphQLSchema = require('./schema/schema');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/graphqldemo');
mongoose.connection.once('open',()=> console.log('mongo connected...'));
const app = express();
app.use('/graphql',graphQlHTTP({
    schema:graphQLSchema,
    graphiql:true
}));
app.get('/',(req,res)=>{
    res.send('<h1>Namaste !!! Gaurav Here.</h1>');
})

app.listen(3000,()=>{
    console.log('listening to port 3000...');
})