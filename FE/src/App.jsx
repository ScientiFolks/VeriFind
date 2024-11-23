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
        </div>
        <div className="w-full">
          {activeComponent === 'Find' ? <Find /> : <Verify />}
        </div>
      </div>
      <footer className="mt-16 flex justify-between items-center text-gray-2 gap-4 md:text-base text-sm transition-all duration-300">
        <div>&copy; 2024 NumHack VeriFind.</div>
        <div>ScientiFolks</div>
      </footer>
    </div>
  )
}

export default App