const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull,
}=require('graphql')
const Post=require('./models/post.js')

const PostType=new GraphQLObjectType({
    name:"Posts",
    fields:()=>({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    })
})

const Mutation=new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addPost:{
            type: PostType,
            args:{
                title: {
                    type: GraphQLString
                },
                description: {
                    type: GraphQLString
                }
            },
            resolve(parent,args){
                let post=new Post({
                    title: args.title,
                    description: args.description
                })
                
                return post.save()
            }
        },
        deletePost:{
            type: PostType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return Post.deleteOne({_id:args.id})
            }
        },
        updatePost:{
            type: PostType,
            args:{
                id: {type: new GraphQLNonNull(GraphQLID)},
                title: {
                    type: GraphQLString
                },
                description:{
                    type: GraphQLString
                }
            },
            resolve(parent,args){
                return Post.updateOne(
                    {_id:args.id},
                    {$set:{
                        title: args.title,
                        description: args.description
                    }}
                )
            }
        }
    }
})

const RootQuery=new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        posts:{
            type: new GraphQLList(PostType),
            resolve(parent,args){
                return Post.find({})
            }
        },
        post:{
            type: PostType,
            args:{
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            resolve(parent,args){
                return Post.findById(args.id)
            }
        }
    }
})

module.exports=new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})