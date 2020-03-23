import React, {useContext} from 'react'
import {View, Text, StyleSheet, FlatList, Button} from 'react-native'
import BlogContext from '../context/BlogContext'

const IndexScreen = ()=>{

    const {data, addBlogPost} = useContext(BlogContext)

    return (
        <View>
            <Text>INDEX SCREEN</Text>
            <Button title="Add Post" onPress={addBlogPost}/>
            <FlatList 
                data={data}
                keyExtractor={b=>b.title}
                renderItem={({item})=><Text>{item.title}</Text>}
            />
        </View>
    )
}

const styles = StyleSheet.create({

})

export default IndexScreen