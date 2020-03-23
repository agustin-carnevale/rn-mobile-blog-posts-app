import React, { useContext} from 'react'
import { Context } from '../context/BlogContext'
import BlogPostForm from '../components/BlogPostForm'

const EditScreen = ({navigation})=>{
    const {state, editBlogPost} = useContext(Context)
    const id = navigation.getParam('id')
    const blogPost = state.find(blog => blog.id === id )

    const onSubmit = (title, content)=>{
        editBlogPost(id,title,content, ()=>{
            navigation.navigate('Index')
        })
    }

    return(
       <BlogPostForm  initialValues={{title:blogPost.title, content: blogPost.content}} onSubmit={onSubmit}/>
    )
}

export default EditScreen