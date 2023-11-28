import React from 'react'
import { navigate, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()





  return (
    <div style={{ height: 'auto', backgroundColor:'#5e4d30', display: 'flex', justifyContent: 'space-between' 
    ,padding:'0 50px',height:'100px'}}>
      <img src={`${process.env.PUBLIC_URL}/btq.jpeg`} alt='' style={{
        width: '10%', height: '50px', cursor: 'pointer', margin:'auto 0'
      }} onClick={navigate('/')} />
      <div style={{ color:'white',display: 'flex', justifyContent: 'space-between', alignItems: 'center',width: '300px',height:'100%' }}>
        <p className='change-color' style={{height:'100%',cursor:' pointer', fontWeight:'bold',display:'flex',alignItems:'center'}}>스포츠</p>
        <p className='change-color' style={{height:'100%',cursor:' pointer', fontWeight:'bold',display:'flex',alignItems:'center'}}>가상스포츠</p>
        <p className='change-color' style={{height:'100%',cursor:' pointer', fontWeight:'bold',display:'flex',alignItems:'center'}}>라이브 카지노</p>
        <p className='change-color' style={{height:'100%',cursor:' pointer', fontWeight:'bold',display:'flex',alignItems:'center'}}>룰렛</p>
      </div>
      <div style={{display:'flex',alignItems:'center', justifyContent:'center'}}>
        <p style={{color:'#edab56', cursor:'pointer'}}>로그인</p>
        <p style={{marginLeft:'20px', width:'100px', height:'37px', backgroundColor:'#ffc454',display:'flex', alignItems:'center',
      justifyContent:'center', borderRadius:'5px', cursor:'pointer'}}>회원가입</p>
      </div>
    </div>)
}

export default Navbar