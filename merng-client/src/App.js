import React, { useState } from 'react'
import styles from './styles/App.module.css'
import {query,addMutation,delMutation} from './utils/apolloQueries'
import {useMutation, useQuery} from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { Button, Row, Col, Panel, Loader } from 'rsuite'


function App() {
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const {loading:loadingPosts,data:dataPosts}=useQuery(query)
    
    const [addPost,{loading:addLoading,error:addError}]=useMutation(addMutation)
    
    const [deletePost,{ loading: deleteLoading, error: deleteError }]=useMutation(delMutation)
    
    const add=(e,title,description)=>{
        e.preventDefault()
        addPost({
            variables: {title,description},
            refetchQueries:['posts']
        })
        setTitle('')
        setDescription('')
    }
    
    const addTitle=(e)=>{
        setTitle(e.target.value)
    }
    const addDescription=(e)=>{
        setDescription(e.target.value)
    }
    
    const del=(id)=>{
        deletePost({
            variables: {id},
            refetchQueries:['posts']
        })
    }
    
    if(addError){
        console.log({message:addError})
        return <p>Encountered a problem while adding new post</p>
    }
    if(deleteError){
        console.log({message:deleteError})
        return <p>Not able to delete</p>
    }
    if (addLoading) return <Loader center content="loading" />
    if(deleteLoading){
        return <Loader center content="loading" />
    }
    if(loadingPosts) return <Loader center content="loading" />
    
  return (
        <>
            <div className={styles.app__inputPanel}>
                <center><h4><strong>Notekeeper</strong></h4></center>
                <input 
                    onChange={addTitle}
                    value={title}
                    placeholder="Enter a title"
                />
                <input
                    onChange={addDescription}
                    value={description}
                    placeholder="Enter a description"
                />
                <button className={styles.app__addBtn} disabled={!title && !description} onClick={(e)=>add(e,title,description)}>
                    Add Note
                </button>
            </div>
            <div className={styles.app__row}>
            <Row>
            {
                !deleteLoading && dataPosts && !loadingPosts &&
                dataPosts.posts.map((post)=>(
                    <Col sm={12} md={6} lg={4} key={post.id}>
                        <Panel shaded bordered className={styles.app__card}>
                            <div className={styles.app__text}>
                                <p><strong>Title :</strong> {post.title}</p>
                                <p><strong>Description :</strong> {post.description}</p>
                            </div>
                            <div className={styles.app__buttons}>
                                <Button color="red" onClick={()=>del(post.id)} className={styles.app__delete}>
                                    Delete Post
                                </Button>
                                <Link to={`/update/${post.id}`}>
                                    <Button appearance="default" color="green" className={styles.app__updLink}>
                                        Update
                                    </Button>
                                </Link>
                            </div>
                        </Panel>
                    </Col>
                ))
            }
            </Row>
            </div>
        </>
  );
}

export default App;
