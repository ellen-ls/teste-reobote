import axios from "axios";
import { useEffect, useState } from "react"
import { logout } from "../../actions/logout";
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();

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
    <div>
    <h2>Aqui é o dashboard</h2>
    <div >
      <button className="bg-blue-400" onClick={()=> logout().then(()=>{navigate("/")}).catch((e)=>{return e})}>Logout</button>
    </div>
    <div>
    <p>Number of users: {data.number_users}</p>
            <p>Logged in as: {data.logged_user.email}</p>
            <ul>
                {data.users.map(user => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
    </div>
    </div>
  )
}

export default Dashboard
