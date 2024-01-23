import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { useParams } from 'react-router-dom'

const Board = () => {

   const { id } = useParams()

   const [post, setPost] = useState({})

   useEffect(() => {
      fetchData()
   }, [])





   const fetchData = async () => {
      try {
         const response = await fetch('http://172.30.1.78:9595/fetch-post-detail', {
            method: 'POST',
            headers: {
               'Content-type': 'application/json'
            },
            body: JSON.stringify({
               postId: id
            })
         })

         if (response.status === 200) {
            const data = await response.json()
            setPost(data)
         }
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <div style={{  backgroundColor: 'black', width: '100%', height: '900px' }}>
         <Navbar />

         <div  style={{backgroundColor:'black',paddingTop:'70px'}}>
            <h1 style={{color:'white', textAlign:'center',marginTop:'20px'}}>{post.title && post.title}</h1>

            <div style={{ width:'800px', margin:'0 auto', height:'auto', marginTop:'50px'}}>

            <p style={{color:'white'}}>{post.body && post.body}</p>
            <p style={{color:'white'}}>작성자 : {post.poster && post.poster.name}</p>
            </div>
         </div>

      </div>
   )
}

export default Board