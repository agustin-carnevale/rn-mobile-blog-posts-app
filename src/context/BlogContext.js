import createDataContext from './createDataContext'
import jsonServer from '../api/jsonServer'

const blogReducer = (state, action)=>{
    switch(action.type){
        case 'get_blogposts': 
            return action.payload
        // case 'add_blogpost':
        //     return [...state, {id: Math.floor(Math.random()*99999), ...action.payload}]
        case 'edit_blogpost':
                return state.map(b => b.id === action.payload.id ? {...action.payload} : b)
        case 'delete_blogpost':
                return state.filter((b)=>b.id !== action.payload)
        default:
            return state
    }
}

const getBlogPosts = dispatch =>{
    return async ()=>{
        const response = await jsonServer.get('/blogposts')
        dispatch({type: 'get_blogposts', payload: response.data})
    }
}

const addBlogPost = (dispatch)=>{
    return async (title,content, callback)=>{
        try {
            await jsonServer.post('/blogposts', {title, content})
            
            // dispatch({type:'add_blogpost', payload: {title,content}})
            if (callback) callback()
        } catch (error) {
            console.log(error)
        }  
    }
}

const editBlogPost = (dispatch)=>{
    return async (id,title,content, callback)=>{
        try {
            await jsonServer.put(`/blogposts/${id}`,{title,content})
            dispatch({type:'edit_blogpost', payload: {id,title,content}})
            callback()
        } catch (error) {
            console.log(error)
        }  
    }
}

const deleteBlogPost = (dispatch)=>{
    return async id =>{
        await jsonServer.delete(`/blogposts/${id}`)
        dispatch({type:'delete_blogpost', payload: id})
    }
}

export const {Context, Provider} = createDataContext(
    blogReducer,
    {getBlogPosts ,addBlogPost, deleteBlogPost, editBlogPost},
    []
)