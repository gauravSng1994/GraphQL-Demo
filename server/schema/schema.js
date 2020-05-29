const graphql = require('graphql');
const _ = require('lodash');
const Models = require('../models/index');
const {GraphQLObjectType, GraphQLString, GraphQLSchema,
    GraphQLID,GraphQLInt, GraphQLList} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields:()=>({
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {
            type:GenreType,
            resolve(parent,args){
                return Models.Genre.findOne({_id:parent.genre});
            }
        },
        author:{
            type: AuthorType,
            resolve(parent,args){
                return Models.Author.findOne({_id:parent.author});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: ()=>({
        _id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Models.Book.find({author:parent._id});
            }
        }
    })
});

const GenreType = new GraphQLObjectType({
    name:'Genre',
    fields:()=>({
        _id:{type:GraphQLID},
        name:{type:GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type: BookType,
            args: {id: {type:GraphQLID}},
            resolve(parent,args){
                // let id = (Number(args.id) + 1).toString();
                return Models.Book.findOne({_id:args.id});
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return Models.Book.find();
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Models.Author.findOne({_id:args.id});
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return Models.Author.find({});
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt},
            },
            resolve(parent,args){
                let author = new Models.Author(args);
                return author.save();
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                author:{type:GraphQLString}
            },
            resolve(parent,args){
                let book = new Models.Book(args);
                return book.save();
            }
        },
        addGenre:{
            type:GenreType,
            args:{name:{type:GraphQLString}},
            resolve(parent,args){
                let genre = new Models.Genre(args);
                return genre.save();
            }
        },
    }
})
module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})