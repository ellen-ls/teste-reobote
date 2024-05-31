import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Components/Login/Login"
import Register from "./Components/Resgister/Register"
import Dashboard from "./Components/Dashboard/Dashboard"

function App() {
 

  return (
  <div>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login></Login>}></Route>
    <Route path='/register' element={<Register></Register>}></Route>
    <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
      
    </Routes>
    </BrowserRouter> 
  </div>
  )
}

export default App
