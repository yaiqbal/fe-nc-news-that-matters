import { useState } from 'react'
import './App.css'
import Header from './Header'
import Topics from './Topics'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
      <Topics />
    </div>
  )

}

export default App

