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
         const response = await fetch('http://172.30.1.45:9595/fetch-post-detail', {
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
      <div style={{ marginTop: '70px', backgroundColor: 'black', width: '100%', height: '900px' }}>
         <Navbar />

         {/* <div style={{marginTop:'200px'}}> */}
            <h1 style={{color:'white'}}>{post.title && post.title}</h1>
            <p style={{color:'white'}}>{post.body && post.body}</p>
            <p style={{color:'white'}}>작성자 : {post.poster && post.poster.name}</p>
         {/* </div> */}

      </div>
   )
}

export default Board