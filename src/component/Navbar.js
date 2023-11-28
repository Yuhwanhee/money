import React, { useState } from 'react'
import { navigate, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()


  const [isSignUp, setIsSignUp] = useState(false)


  const changeIsSignUP = () => {
    setIsSignUp(!isSignUp)
  }



  return (
    <div>
      <div style={{
        height: '70px', backgroundColor: '#5e4d30', display: 'flex', justifyContent: 'space-between', position: isSignUp && 'fixed'
      }}>
        <img src={`${process.env.PUBLIC_URL}/btq.jpeg`} alt='' style={{
          width: '10%', height: '50px', cursor: 'pointer', margin: 'auto 0'
          // }} onClick={() => setIsSignUp(true)} />
        }} onClick={() => navigate('/')} />
        <div style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '300px', height: '100%' }}>
          <p className='change-color' style={{ height: '100%', cursor: ' pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>스포츠</p>
          <p className='change-color' style={{ height: '100%', cursor: ' pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>가상스포츠</p>
          <p className='change-color' style={{ height: '100%', cursor: ' pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>라이브 카지노</p>
          <p className='change-color' style={{ height: '100%', cursor: ' pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>룰렛</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: '#edab56', cursor: 'pointer' }}>로그인</p>
          <p style={{
            marginLeft: '20px', width: '100px', height: '37px', backgroundColor: '#ffc454', display: 'flex', alignItems: 'center',
            justifyContent: 'center', borderRadius: '5px', cursor: 'pointer'
          }} onClick={changeIsSignUP}>회원가입</p>
          {/* }} onClick={() => setIsSignUp(true)}>회원가입</p> */}
        </div>





      </div>





      {isSignUp && (
        <div style={{
          position: 'absolute', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center',
          alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <div style={{ width: '550px', height: '900px', backgroundColor: '#181a20', borderRadius: '10px', marginTop: '15vw', overflowY: 'auto',display:'flex',flexDirection:'column' }}>
            <p style={{ color: 'white', width: '15px', margin: '15px 15px 0 auto', cursor: 'pointer' }} onClick={() => setIsSignUp(false)}>X</p>
            <img src={`${process.env.PUBLIC_URL}/btq.jpeg`} alt='' style={{width:"100px", height:'100px', margin:'0 auto'}}
            />
            <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <h3 style={{ fontSize:'20px', color:'#edab56', width:'100px', display:'flex', justifyContent:'center',
          alignItems:'center', marginTop:'50px'}}> 회원가입</h3>
          </div>

          </div>
        </div>
      )}


    </div>
  )
}

export default Navbar