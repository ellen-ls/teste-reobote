import axios from "axios";
import { useEffect, useState } from "react"

import Sidebar from './Sidebar'
import Navbar from "./Navbar";
import { logout } from "../../actions/logout";
import { useNavigate } from "react-router-dom";
import { FaSadCry } from "react-icons/fa";


// Define a interface User para tipagem dos dados do usuário
interface User {
  id: number;
  name: string;
  email: string;
  created_at: string
}
// Define a interface DashboardData para tipagem dos dados do dashboard
interface DashboardData {
  number_users: number;
  logged_user: User;
  users: User[]
}

const Dashboard: React.FC = () => {
  // Define os estados do componente usando useState
  const [data, setData] = useState<DashboardData | null>(null);// Estado para armazenar os dados do dashboard
  const [loading, setLoading] = useState(true);// Estado para indicar se os dados estão sendo carregados
  const [sidebarToggle, setSidebarToggle] = useState<boolean>(false);// Estado para controlar a visibilidade da sidebar

  const navigate = useNavigate()

// useEffect para buscar os dados do dashboard assim que o componente é montado
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token') // Obtém o token de autenticação do localStorage
        const tokenType = localStorage.getItem('token_type') // Obtém o tipo de token do localStorage
        const config = {
          headers: { Authorization: `${tokenType} ${token}` } // Configura os headers da requisição com o token de autenticação

        }
        console.log(data)
        const response = await axios.get('https://teste.reobote.tec.br/api/dashboard', config)
        const responseData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data
        setData(responseData)// Define os dados do dashboard
        setLoading(false)// Define o estado de carregamento como falso
      } catch (error) {
        console.error('Error fetch data', error) // Loga o erro caso a requisição falhe
        setLoading(false)// Define o estado de carregamento como falso
      }
    }
    fetchData()// Chama a função fetchData
  }, []); // Dependência vazia indica que o efeito roda apenas uma vez, após a montagem do componente

 // Renderiza uma mensagem de carregamento enquanto os dados estão sendo buscados
  if (loading) {
    return <div className="text-center text-3xl text-[#f1a598]"><p className="py-5">Loading...</p></div>
  }// Renderiza uma mensagem de não autorizado se os dados não foram carregados
  if (!data) {
    return <div className="flex flex-col justify-center items-center text-center">
      <p className=" flex text-3xl text-red-600 py-5 gap-2"><FaSadCry className="text-3xl text-red-600" /> Não autorizado</p>
      <button className='bg-[#f1a598] hover:bg-[#edcfc4] text-white text-xl py-2 w-36 rounded-3xl' onClick={() => navigate('/')}>Voltar</button>
    </div>
  }

  return (

    <div className={`w-full ${sidebarToggle ? "mr-64" : ""} bg-gray-200 pb-5`}>
      <Sidebar sidebarToggle={sidebarToggle} />{/* Renderiza a sidebar */}
      <Navbar
        sidebarToggle={sidebarToggle}
        setSidebarToggle={setSidebarToggle}
        logout={logout}
        navigate={navigate}
        loggedUserEmail={data.logged_user.email}
      />{/* Renderiza a navbar com as propriedades necessárias */}
      <div className="flex justify-end">
        <p className="bg-[#f1a598] border-2 border-[#edcfc4] m-5 py-2 px-2 text-gray-700 rounded-2xl">Numero de Usuários: {data.number_users}</p>

      </div>
      <div className="sm:flex justify-center overflow-x-auto" >
      
           <table className="table-auto border border-[#f1a598] rounded-2xl ">
            <thead>
            <tr>
            <th className="border text-center bg-[#f1a598]">Id</th>
              <th className="border text-center bg-[#f1a598] ">Nome</th>
              <th className="border text-center bg-[#f1a598]">Email</th>
              <th className="border text-center bg-[#f1a598]">Criado em</th>

            </tr>
          </thead>
          <tbody>
            {data.users.map((user) => (
             
                <tr>
                  <td className="hover:bg-[#f1a598] text-gray-700 border-2 border-b-[#f1a598] text-center">{user.id}</td>
                  <td className="hover:bg-[#f1a598] text-gray-700 border-2 border-b-[#f1a598]  text-center">{user.name}</td>
                  <td className="hover:bg-[#f1a598] text-gray-700 border-2 border-b-[#f1a598]  text-center">{user.email}</td>
                  <td className="hover:bg-[#f1a598] text-gray-700 border-2 border-b-[#f1a598]  text-center">{user.created_at.slice(0,-17)}</td>
                </tr>

            ))}
          </tbody>
          
        </table>
        </div>
      </div>

  )
}

export default Dashboard
