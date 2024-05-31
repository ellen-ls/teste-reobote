import { FaBars, FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../actions/logout'

interface NavbarProps {
  sidebarToggle: boolean;
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;

}
const Navbar: React.FC<NavbarProps> = ({sidebarToggle, setSidebarToggle}) => {

  const navigate = useNavigate()
  return (
    
      
      <nav className='bg-[#202124] px-4 py-3 flex justify-between'>
        <div className='flex items-center text-xl z-40'>
          <FaBars className='text-white me-4 cursor-pointer' onClick={()=> setSidebarToggle(!sidebarToggle)}/>
          <span className='text-white font-semibold'>Lista de Registros</span>
        </div>
        <div className='relative'>
          <button className='text-white group'>
            <FaUserCircle className='w-6 h-6 mt-1' />
            <div className='z-10 hidden absolute bg-white rounded-lg shadow w-32 group-focus:block top-full right-0'>
              <ul className='py-2 text-sm text-gray-950'>
                <li><a href=''>Profile</a></li>
                <li><a href=''>Setting</a></li>
                <li>
                  <button className="text-yellow-500" onClick={() => logout().then(() => { navigate("/") }).catch((e) => { return e })}>Logout</button>
                </li>
              </ul>
            </div>
          </button>
        </div>
      </nav>
    
  )
}

export default Navbar
