import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'


const Homepage = () => {

  const [reply, setReply] = useState('')
  const [noticePost, setNoticePost] = useState([])
  const [eventPost, setEvnetPost] = useState([])
  const [isGrade, setIsGrade] = useState(0)
  const [isButton, setIsButton] = useState(false)

  const navigate = useNavigate()





  const fetchPost = async () => {
    try {
      const response = await fetch('http://192.168.0.19:9595/fetch-post')
      const data = await response.json()

      const notice = data.filter((post) => post.type === 1)
      const event = data.filter((post) => post.type === 2)

      setNoticePost(notice)
      setEvnetPost(event)


    } catch (err) {
      console.log(err)
    }
  }


  const fetchGrade = async () => {
    try {
      const response = await fetch('http://192.168.0.19:9595/fetch-grade', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },

        body: JSON.stringify({
          userId: jwtDecode(localStorage.getItem('token')).id
        })
      })
      if (response.status === 200) {
        const data = await response.json()
        setIsGrade(data)
      }
    } catch (err) {
      console.log(err)

    }
  }



  useEffect(() => {
    fetchPost()
  }, [])

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      return
    } else {
      fetchGrade()
    }
  }, [])






  // const array = [
  //   { new: true, title: 'test1' },
  //   { new: true, title: 'test2' },
  //   { new: false, title: 'test3' },
  //   { new: true, title: 'test4' }
  // ]

  // const newArray = array.filter((post) => post.title === 'test1')

  // console.log(newArray)






  const goToPost = (type, id) => {
    navigate(`/board/${id}`)
  }



  const Gbutton = () => {
    if (isGrade === 6) {
      setIsButton(true)
    }
  }





  return (

    <div >
      <Navbar />

      <div style={{ marginTop: '70px', backgroundColor: 'black', width: '100%', height: 'auto', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ backgroundColor: '#181a20', width: '80%', height: '800px' }}>
          <img src={`${process.env.PUBLIC_URL}/IMG_5446.JPG`} alt='' style={{
            width: '100%', height: '300px', cursor: 'pointer', margin: 'auto 0'
          }} />


          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


            <div style={{ width: '80%', height: '40px', marginTop: '50px', display: 'flex', justifyContent: 'space-between'}}>

              <div >
                <div style={{ display: 'flex' ,justifyContent:'center', alignItems:'center'}}>
                  <div style={{
                    backgroundColor: '#edab56', width: '350px', height: '40px', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', borderRadius: '5px'
                  }}>
                    공지 규정/notice Rules
                  </div>
                  {isGrade === 6 && (
                    <div className='center' style={{ border: '1px solid yellow', height:'30px',width: '50px', cursor: 'pointer', backgroundColor:'white' , marginLeft:'10px'}} onClick={() => navigate('/post/notice')} > 
                    작성
                    </div>
                  )}


                </div>




                <div style={{ backgroundColor: '#181a20', width: '100%', height: '100px', overflow: 'scroll', color: 'white' }}>
                  {noticePost.map((post, index) => (
                    <div key={index}>
                      <p style={{ cursor: 'pointer' }} onClick={() => goToPost('notice', post._id)}>
                        {post.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ display: 'flex' }}>

                  <div style={{
                    backgroundColor: '#edab56', width: '350px', height: '40px', display: 'flex', justifyContent: 'center',
                    alignItems: 'center', borderRadius: '5px'
                  }}>
                    이벤트존 event
                  </div>


                  {isGrade === 6 && (
                    <div style={{ border: '1px solid yellow', width: '100px', cursor: 'pointer' }} onClick={() => navigate('/post/event')} > qjtoen</div>
                  )}

                </div>

                <div style={{ backgroundColor: '#181a20', width: '100%', height: '100px', overflow: 'scroll', color: 'white' }}>
                  {eventPost.map((post, index) => (
                    <div key={index}>
                      <p style={{ cursor: 'pointer' }} onClick={() => goToPost('event', post._id)}>
                        {post.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
        <div style={{ width: '20%', height: '800px', backgroundColor: '#707478', overflowY: 'auto' }}>
          <div style={{ width: '90%', backgroundColor: '#000', margin: '5%', height: '1200px', borderRadius: '5px' }}>

          </div>
        </div>
      </div>
    </div>
  )
}
export default Homepage