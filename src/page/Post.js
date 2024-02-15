import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
const Post = () => {




    const [isTitle, setIsTitle] = useState('')
    const [isWrite, setIsWrite] = useState('')


    const navigate = useNavigate()
    const { type } = useParams()



    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate(-1)
        }
    }, [])




    const fetchTitle = async () => {
        let postType = 0
        if (type === 'notice') {
            postType = 1
        } else if (type === 'event') {
            postType = 2
        }
        try {
            const response = await fetch('http://192.168.0.19:9595/fetch-title', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },

                body: JSON.stringify({
                    title: isTitle,
                    write: isWrite,
                    userId: jwtDecode(localStorage.getItem('token')).id,
                    type: postType
                })
            })

            if (response.status === 200) {
                navigate('/')
            }

        } catch (err) {
            console.log(err)
        }
    }





    return (
        <div style={{ marginTop: '70px', backgroundColor: 'black', width: '100%', height: '900px' }}>
            <Navbar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                    color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    marginLeft: '-30px', marginTop: '70px'
                }}>
                    제목
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

                <div>
                    <input style={{ width: '1000px', height: '20px', marginTop: '10px' }} type='text' placeholder='제목을 입력하시오.'
                        value={isTitle} defaultValue={isTitle} onChange={(e) => setIsTitle(e.target.value)} />
                </div>

                <div>
                    <input style={{ width: '1000px', height: '300px', marginTop: '10px' }} type='text' placeholder='내용을 입력하시오.'
                        value={isWrite} defaultValue={isWrite} onChange={(e) => setIsWrite(e.target.value)} />
                </div>

            </div>

            <div style={{
                width: '30px', height: '20px', background: '#edab56', marginLeft: '87vw', marginTop: '50px', color: 'black',
                borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'
            }} onClick={() => fetchTitle('')}>
                작성
            </div>

        </div>
    )
}

export default Post