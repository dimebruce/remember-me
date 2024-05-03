import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Remember me</h1>
      <div className="video-container">
        <video controls autoPlay loop className="responsive-video" controlsList="nodownload" disablePictureInPicture>
          <source src="/video/1.mp4" type="video/mp4" />
        </video>
      </div>
    </>
  )
}

export default App
