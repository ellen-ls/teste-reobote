import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Components/Login/Login"
import Register from "./Components/Register"

function App() {
 

  return (
  <div>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login></Login>}></Route>
    <Route path='/register' element={<Register></Register>}></Route>
      
    </Routes>
    </BrowserRouter> 
  </div>
  )
}

export default App
