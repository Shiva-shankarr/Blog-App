import React from 'react'
import pic1 from './images/knwoledege.jpg'

function Home() {
  return (
    <div>
     <h1 className='display-3 text-dark text-center fw-bold '> Explore Blogs</h1>
     <div className='text-center mt-4'>
      <img className='w-25 ' src={pic1} alt='Money is power'></img>
     </div>
    <div className='w-50 mx-auto mt-4 fs-5'>
      <p className='text-center'>"Explore Blogs" is an innovative and inclusive online platform designed to ignite curiosity, encourage exploration, and celebrate the diverse world of blogging. With its intuitive interface and rich selection of topics, Explore Blogs invites users to embark on a journey of discovery, learning, and connection through the power of written content.</p>
    </div>
    </div>
  )
}

export default Home
