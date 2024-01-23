import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { navigate, useNavigate } from 'react-router-dom'
import { updatePoint } from '../redux/features/pointSlice'

const Navbar = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const userPoint = useSelector((state) => state.point.point)



  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState('')
  const [password2, setPassword2] = useState('')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [isLogIn, setIsLogIn] = useState(false)
  const [isId, setIsId] = useState('')
  const [isPw, setIsPw] = useState('')
  const [isAuth, setIsAuth] = useState(false)


  const [showPw, setShowPw] = useState(false)


  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setIsAuth(false)
    } else {
      setIsAuth(true)
    }
  }, [])

  useEffect(() => {
    fetchPoint()
  }, [isAuth])






  const fetchPoint = async () => {
    if (isAuth) {
      try {
        const response = await fetch('http://172.30.1.78:9595/point', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },

          body: JSON.stringify({
            userId: jwtDecode(localStorage.getItem('token')).id
          })
        })
        const data = await response.json()
        dispatch(updatePoint(data.point))
      } catch (err) {
        console.log(err)

      }
    }

  }



  const changeIsSignUP = () => {
    setIsSignUp(!isSignUp)
  }

  const ChangeIsLogIn = () => {
    setIsLogIn(!isLogIn)
  }


  const handdleCancle = () => {
    setIsSignUp(false)
    setId('')
    setPassword('')
    setName('')
    setPassword2('')

  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsAuth(false)
    navigate('/')
    window.location.reload()
  }







  const signUp = async () => {
    try {
      const response = await fetch('http://172.30.1.78:9595/signup', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },

        body: JSON.stringify({
          id: id,
          password: password,
          name: name
        })
      })
      if (response.status === 200) {
        const { token } = await response.json()
        localStorage.setItem('token', token);
        handdleCancle()
      } else {
        alert('실패')
      }
    } catch (err) {
      console.log(err)

    }
  }


  const handdleLogIn = async () => {
    const response = await fetch('http://172.30.1.78:9595/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },

      body: JSON.stringify({
        isId,
        isPw

      })
    })
    if (response.status === 200) {
      const { token } = await response.json()
      localStorage.setItem('token', token);
      setIsLogIn(false)
      setIsAuth(true)
      window.location.reload()
    } else if (response.status === 400) {
      alert('통실')
    }

  }








  return (
    <div>
      <div style={{
        height: '70px', backgroundColor: '#5e4d30', display: 'flex', justifyContent: 'space-between', position: 'fixed', width: '100%', top: 0,
      }}>
        <img src={`${process.env.PUBLIC_URL}/btq.jpeg`} alt='' style={{
          width: '10%', height: '50px', cursor: 'pointer', margin: 'auto 0'
          // }} onClick={() => setIsSignUp(true)} />
        }} onClick={() => navigate('/')} />
        <div style={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '300px', height: '100%' }}>
          <p className='change-color' style={{ height: '100%', cursor: ' pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>스포츠</p>
          <p className='change-color' style={{ height: '100%', cursor: ' pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>가상스포츠</p>
          <p className='change-color' style={{ height: '100%', cursor: ' pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>라이브 카지노</p>
          <p className='change-color' style={{ height: '100%', cursor: ' pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center' }} onClick={() => navigate('/rulet')}>룰렛</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isAuth && (
            <p style={{ color: '#edab56', marginRight: '30px' }}>포인트 : {userPoint.toLocaleString()}</p>
          )}
          <p style={{ color: '#edab56', cursor: 'pointer', marginRight: '20px' }}
            onClick={() => isAuth ? handleLogout() : ChangeIsLogIn()}>{isAuth ? '로그아웃' : '로그인'}
          </p>
          {!isAuth && (
            <p style={{
              width: '100px', height: '37px', backgroundColor: '#ffc454', display: 'flex', alignItems: 'center',
              justifyContent: 'center', borderRadius: '5px', cursor: 'pointer'
            }} onClick={changeIsSignUP}>회원가입</p>
          )}
        </div>





      </div>





      {isSignUp && (
        <div style={{
          position: 'absolute', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center',
          alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <div style={{ width: '550px', height: '900px', backgroundColor: '#181a20', borderRadius: '10px', marginTop: '15vw', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <p style={{ color: 'white', width: '15px', margin: '15px 15px 0 auto', cursor: 'pointer' }} onClick={handdleCancle}>X</p>
            <img src={`${process.env.PUBLIC_URL}/btq.jpeg`} alt='' style={{ width: "100px", height: '100px', margin: '0 auto' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h3 style={{
                fontSize: '20px', color: '#edab56', width: '100px', display: 'flex', justifyContent: 'center',
                alignItems: 'center', marginTop: '50px'
              }}> 회원가입</h3>
            </div>


            <div style={{ marginLeft: '39px' }}>
              <div style={{ fontSize: '14px', color: '#edab56', width: '400px', textAlign: "left", marginBottom: ' 12px' }}>아이디</div>
              <input type='text' style={{
                width: '200px', height: '25px', padding: '5px 10px', border: '1px solid rgba(0,0,0,0.3', fontSize: '12px', marginBottom: '25px'
              }} value={id} onChange={(e) => setId(e.target.value)} defaultValue={id} />

              <div style={{ display: 'flex' }}>

                <div style={{ marginRight: '30px' }}>
                  <div style={{ fontSize: '14px', color: '#edab56', textAlign: "left", marginBottom: ' 12px' }}>비밀번호</div>
                  <input type={showPw ? 'text' : 'password'} style={{
                    width: '200px', height: '25px', padding: '5px 10px', border: '1px solid rgba(0,0,0,0.3', fontSize: '12px', marginBottom: '25px'
                  }} value={password} onChange={(e) => setPassword(e.target.value)} defaultValue={password} />
                  {/* <input type='checkbox' onChange={()=>setShowPw(!showPw)}/> */}
                </div>

                <div>
                  <div style={{ fontSize: '14px', color: '#edab56', textAlign: "left", marginBottom: ' 12px' }}>비밀번호 확인</div>
                  <input type='password' style={{
                    width: '200px', height: '25px', padding: '5px 10px', border: '1px solid rgba(0,0,0,0.3', fontSize: '12px', marginBottom: '25px'
                  }} value={password2} onChange={(e) => setPassword2(e.target.value)} defaultValue={password2} />
                </div>

              </div>

              <div style={{ fontSize: '14px', color: '#edab56', width: '400px', textAlign: "left", marginBottom: ' 12px' }}>이름</div>
              <input type='text' style={{
                width: '200px', height: '25px', padding: '5px 10px', border: '1px solid rgba(0,0,0,0.3', fontSize: '12px', marginBottom: '25px'
              }} value={name} onChange={(e) => setName(e.target.value)} defaultValue={name} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

              <div style={{
                width: '240px', height: '54px', border: 'none', borderRadius: '3px', cursor: 'pointer',
                display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', backgroundColor: '#edab56'
              }}
                onClick={signUp}
              >
                회원가입하기
              </div>
            </div>
          </div>
        </div>
      )}

      {isLogIn && (
        <div style={{
          position: 'absolute', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center',
          alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
          <div style={{ width: '550px', height: '900px', backgroundColor: '#181a20', borderRadius: '10px', marginTop: '15vw', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            <p style={{ color: 'white', width: '15px', margin: '15px 15px 0 auto', cursor: 'pointer' }} onClick={() => setIsLogIn(false)}>X</p>
            <img src={`${process.env.PUBLIC_URL}/btq.jpeg`} alt='' style={{ width: "100px", height: '100px', margin: '0 auto' }}
            />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h3 style={{
                fontSize: '20px', color: '#edab56', width: '100px', display: 'flex', justifyContent: 'center',
                alignItems: 'center', marginTop: '50px'
              }}> 로그인</h3>
            </div>



            <div style={{ marginLeft: '39px' }}>
              <div style={{ fontSize: '14px', color: '#edab56', width: '400px', textAlign: "left", marginBottom: ' 12px' }}>아이디</div>
              <input type='text' style={{
                width: '400px', height: '25px', padding: '5px 10px', border: '1px solid rgba(0,0,0,0.3', fontSize: '12px', marginBottom: '25px'
              }} value={isId} onChange={(e) => setIsId(e.target.value)} defaultValue={isId} />



              <div style={{ marginRight: '30px' }}>
                <div style={{ fontSize: '14px', color: '#edab56', textAlign: "left", marginBottom: ' 12px' }}>비밀번호</div>
                <input type={showPw ? 'text' : 'password'} style={{
                  width: '400px', height: '25px', padding: '5px 10px', border: '1px solid rgba(0,0,0,0.3', fontSize: '12px', marginBottom: '25px'
                }} value={isPw} onChange={(e) => setIsPw(e.target.value)} defaultValue={isPw} />
                {/* <input type='checkbox' onChange={()=>setShowPw(!showPw)}/> */}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{
                width: '240px', height: '54px', border: 'none', borderRadius: '3px', cursor: 'pointer',
                display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', backgroundColor: '#edab56'
              }}

                onClick={handdleLogIn}>
                로그인하기
              </div>
              <p > 포인트 :</p>
            </div>

          </div>
        </div>
      )}


    </div>
  )
}

export default Navbar