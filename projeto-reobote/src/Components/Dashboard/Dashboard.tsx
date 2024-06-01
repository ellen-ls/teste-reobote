import axios from "axios";
import { useEffect, useState } from "react"

import Sidebar from './Sidebar'
import Navbar from "./Navbar";
import { logout } from "../../actions/logout";
import { useNavigate } from "react-router-dom";
import { FaSadCry } from "react-icons/fa";

interface User {
  id: number;
  name: string;
  email: string;
}

interface DashboardData {
  number_users: number;
  logged_user: User;
  users: User[]
}

const Dashboard: React.FC=()=> {
 const [data, setData] = useState<DashboardData | null>(null);
 const [loading, setLoading] = useState(true);
 const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);
 
const navigate = useNavigate()
 

 useEffect(()=>{
  const fetchData = async () =>{
    try{
     const token = localStorage.getItem('access_token')
     const tokenType = localStorage.getItem('token_type')
     const config = {
      headers:{ Authorization: `${tokenType} ${token}`}
     
     }
     console.log(data)
     const response = await axios.get('https://teste.reobote.tec.br/api/dashboard', config)
     const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
     setData(responseData)
     setLoading(false)
    }catch(error){
      console.error('Error fetch data', error)
      setLoading(false)
    }
  }
  fetchData()
 },[]);

 if(loading){
  return <div className="text-center text-3xl text-[#f1a598]"><p>Loading...</p></div>
 }
 if(!data){
  return <div className="flex flex-col justify-center items-center text-center">
  <p className=" flex text-3xl text-red-600 p-5 gap-2"><FaSadCry className="text-3xl text-red-600"/> Não autorizado</p>
  <button className='bg-[#f1a598] hover:bg-[#edcfc4] text-white text-xl py-2 w-36 rounded-3xl' onClick={()=> navigate('/')}>Voltar</button>
  </div>
 }
 
  return (
    
   <div className={`w-full ${sidebarToggle? "mr-64" : ""} bg-gray-200 pb-5`}>
   <Sidebar sidebarToggle={sidebarToggle}/>
   <Navbar 
    sidebarToggle={sidebarToggle} 
    setSidebarToggle={setSidebarToggle}
    logout={logout} 
    navigate={navigate}
    loggedUserEmail={data.logged_user.email}
    />
  <div className="flex justify-end">
  <p className="bg-[#f1a598] border-2 border-[#edcfc4] m-5 py-2 px-2 text-gray-700 rounded-2xl">Numero de Usuários: {data.number_users}</p>
  
  </div>
  <div className="sm:flex justify-center overflow-x-auto" >
     
      <table className="table-auto border border-[#f1a598] bg-[#edcfc4] rounded-2xl ">
  <thead>
    <tr>
      <th className="border text-center bg-[#f1a598] rounded-tl-2xl ">Nome</th>
      <th className="border text-center bg-[#f1a598] rounded-tr-2xl ">Email</th>
      
    </tr>
  </thead>
  <tbody>
  {data.users.map((user, index) => (
    index % 2 !== 0 ?
    <tr>
      <td className="bg-[#f1a598] text-gray-700 border text-center">{user.name}</td>
      <td className="bg-[#f1a598] text-gray-700 border text-center">{user.email}</td>
    </tr>
    :
    <tr>
      <td className="bg-[#edcfc4] border text-center">{user.name}</td>
      <td className="bg-[#edcfc4] border text-center">{user.email}</td>
  </tr>
    ))}
  </tbody>
</table>
  </div>
      
   </div>

  )
}

export default Dashboard
