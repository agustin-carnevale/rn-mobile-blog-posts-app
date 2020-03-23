import React, {useContext} from 'react'
import { Context } from '../context/BlogContext'
import BlogPostForm from '../components/BlogPostForm'

const CreateScreen = ({navigation})=>{
    const {addBlogPost} = useContext(Context)

    const onSubmit = (title, content)=>{
        addBlogPost(title,content, ()=>{
            navigation.navigate('Index')
        })    
    }

    return(
        <BlogPostForm  initialValues={{title:'', content: ''}} onSubmit={onSubmit}/>
    )
}

export default CreateScreen