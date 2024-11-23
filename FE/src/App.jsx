import { useState } from 'react'
import './App.css'

import Find from './components/Find/Find'
import Verify from './components/Verify/Verify'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Find />
      <Verify />
    </>
  )
}

export default App
