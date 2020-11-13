import gql from 'graphql-tag'

export const query=gql`
query posts{
    posts{
        id
        title
        description
    }
}
`

export const postQuery=gql`
query post($id: ID!){
    post(id: $id){
        title
        description
    }
}
`

export const addMutation=gql`
mutation addPost($title: String!,$description: String!){
    addPost(title: $title,description: $description){
        title
        description
    }
}
`

export const delMutation=gql`
mutation deletePost($id: ID!){
    deletePost(id: $id){
        id
    }
}
`

export const updMutation=gql`
mutation updatePost($id: ID!,$title: String, $description: String){
    updatePost(id: $id, title: $title, description: $description){
        id
        title
        description
    }
}
`