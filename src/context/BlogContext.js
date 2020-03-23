import createDataContext from './createDataContext'

const blogReducer = (state, action)=>{
    switch(action.type){
        case 'add_blogpost':
            return [...state, {id: Math.floor(Math.random()*99999), ...action.payload}]
        case 'edit_blogpost':
                return state.map(b => b.id === action.payload.id ? {...action.payload} : b)
        case 'delete_blogpost':
                return state.filter((b)=>b.id !== action.payload)
        default:
            return state
    }
}

const addBlogPost = (dispatch)=>{
    return async (title,content, callback)=>{
        try {
            await dispatch({type:'add_blogpost', payload: {title,content}})
            callback()
        } catch (error) {
            console.log(error)
        }  
    }
}

const editBlogPost = (dispatch)=>{
    return async (id,title,content, callback)=>{
        try {
            await dispatch({type:'edit_blogpost', payload: {id,title,content}})
            callback()
        } catch (error) {
            console.log(error)
        }  
    }
}

const deleteBlogPost = (dispatch)=>{
    return (id)=>{
        dispatch({type:'delete_blogpost', payload: id})
    }
}

export const {Context, Provider} = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost},
    [{id: '123', title:'Auto-generated Blog Post', content:'This is the content of my Auto-generated Blog Post'}]
)