import React from 'react'
import Navbar from '../component/Navbar'

const Homepage = () => {
  return (
    <div >
      <Navbar />
      <div style={{ backgroundColor: 'black', width: '100%',height:'1000px' }}>
        <p style={{color:'white'}}>homepage</p>
      </div>
    </div>
  )
}

export default Homepage