import axios from "axios";
import { useEffect, useState } from "react"

import Sidebar from './Sidebar'
import Navbar from "./Navbar";

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

 

 useEffect(()=>{
  const fetchData = async () =>{
    try{
     const token = localStorage.getItem('access_token')
     const tokenType = localStorage.getItem('token_type')
     const config = {
      headers:{ Authorization: `${tokenType} ${token}`}
     }
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
  return <div>Loading...</div>
 }
 if(!data){
  return <div>No data available</div>
 }
 
  return (
    
   <div className={`w-full ${sidebarToggle? "mr-64" : ""} bg-gray-200`}>
   <Sidebar sidebarToggle={sidebarToggle}/>
   <Navbar 
    sidebarToggle={sidebarToggle} 
    setSidebarToggle={setSidebarToggle}
    />
   <p className="text-black">{data.logged_user.email}</p> 
  <div >
      <ul>
         {data.users.map(user => (
         <li key={user.id}>
          <p>Nome: {user.name}</p> 
          <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
      </div>
   </div>

  )
}

export default Dashboard
