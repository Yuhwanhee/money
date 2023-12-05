import React from 'react'
import Navbar from '../component/Navbar'

const Post = () => {
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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , flexDirection:'column'}}>

                <div>
                    <input style={{ width: '1000px', height: '20px', marginTop: '10px' }} type='text' placeholder='제목을 입력하시오.' />
                </div>

                <div>
                    <input style={{ width: '1000px', height: '300px', marginTop: '10px' }} type='text' placeholder='내용을 입력하시오.' />
                </div>

            </div>

            <div style={{ width:'30px', height:'20px', background:'#edab56', marginLeft:'1250px', marginTop:'50px', color:'black',
        borderRadius:'5px', display:'flex', justifyContent:'center', alignItems:'center' ,cursor:'pointer'}}>
            작성
            </div>

        </div>
    )
}

export default Post