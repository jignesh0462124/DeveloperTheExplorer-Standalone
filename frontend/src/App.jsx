import { useState } from 'react'
import './App.css'
import EventPoster from './EventPoster'
import Checkout from './Checkout'
import LandingPage from './components/LandingPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <LandingPage />
    </>
  )
}

export default App
