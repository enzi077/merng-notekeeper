import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import {postQuery,updMutation} from '../utils/apolloQueries'
import styles from '../styles/Update.module.css'
import { Button, Loader } from 'rsuite'

function Update(props) {
    const {postId}=props.match.params
    const {loading,data:dataPost}=useQuery(postQuery,{
        variables: {id: postId}
    })
    
    const [data,setData]=useState()
    const [title,setTitle]=useState('')
    const [description,setDescription]=useState('')
    const [titleChangeCursor,setTitleChangeCursor]=useState(false)
    const [descriptionChangeCursor,setDescriptionChangeCursor]=useState(false)
    const [updatePost,{loading: updLoading, error: updError}]=useMutation(updMutation)
    
    useEffect(()=>{
        setData(dataPost)
        return ()=>{
            setData()
        }
    },[dataPost])
    
    const changeTitleHandler=(e)=>{
        setTitleChangeCursor(true)
        setTitle(e.target.value)
    }
    const changeDescriptionHandler=(e)=>{
        setDescriptionChangeCursor(true)
        setDescription(e.target.value)
    }
    
    const updPost=(id,title,description)=>{
        if(!titleChangeCursor && !descriptionChangeCursor){
            updatePost({
                variables:{id,title:data.post.title,description:data.post.title},
                refetchQueries:['post','posts']
            })
        }else if(!titleChangeCursor){
            updatePost({
                variables:{id,title:data.post.title,description},
                refetchQueries:['post','posts']
            })
        }else if(!descriptionChangeCursor){
            updatePost({
                variables:{id,title,description:data.post.description},
                refetchQueries:['post','posts']
            })
        }else{
            updatePost({
                variables:{id,title,description},
                refetchQueries:['post','posts']
            })
        }
        setTitleChangeCursor(false)
        setDescriptionChangeCursor(false)
    }
    
    if(updLoading){
        return <Loader center content="loading" />
    }
    
    if(updError){
        return <p>Error while updating</p>
    }
    
    return (
        <>
            {
                !loading && data &&
                <div className={styles.update__inputPanel}>
                    <input
                        placeholder={data.post.title}
                        value={title}
                        onChange={changeTitleHandler}
                    />
                    <input
                        placeholder={data.post.description}
                        value={description}
                        onChange={changeDescriptionHandler}
                    />
                </div>
            }
            <div className={styles.update__btnSave}>
                <Link to="/">
                    <Button  color="green" style={{width:'100px'}} onClick={()=>updPost(postId,title,description)}>
                        Save
                    </Button>
                </Link>
            </div>
            <div className={styles.update__btnCancel}>
                <Link to="/">
                    <Button color="red" style={{width:'100px'}}>Cancel</Button>
                </Link>
            </div>
        </>
    )
}

export default Update
