import { useState } from 'react'

import Find from './components/Find/Find'
import Verify from './components/Verify/Verify'
import ToggleButton from './components/Button/ToggleButton'

function App() {
  const [activeComponent, setActiveComponent] = useState('Find')

  const handleToggle = (option) => {
    setActiveComponent(option)
  }

  return (
    <div className="container mx-auto p-16 min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="flex flex-col items-center">
          <div className="w-full mb-8">
            <ToggleButton onToggle={handleToggle} />
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-gradient-1 via-gradient-2 to-gradient-3 text-transparent bg-clip-text">
            VeriFind
          </h1>
        </div>
        <div className="mt-8 w-full">
          {activeComponent === 'Find' ? <Find /> : <Verify />}
        </div>
      </div>
      <footer className="mt-16 flex justify-between items-center text-gray-2 gap-4">
        <div>&copy; 2024 NumHack VeriFind.</div>
        <div>ScientiFolks</div>
      </footer>
    </div>
  )
}

export default App