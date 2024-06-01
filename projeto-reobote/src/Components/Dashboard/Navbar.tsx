import { FaBars, FaUserCircle } from 'react-icons/fa'

interface NavbarProps {
  sidebarToggle: boolean;
  setSidebarToggle: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => Promise<void>;
  navigate: (path: string) => void;
  loggedUserEmail: string;

}
const Navbar: React.FC<NavbarProps> = ({sidebarToggle, setSidebarToggle, loggedUserEmail,logout,navigate}) => {
  
  return (
   
      
      <nav className='bg-[#202124] px-4 py-3 flex justify-between'>
        <div className='flex items-center text-xl z-40'>
          <FaBars className='text-white me-4 cursor-pointer' onClick={()=> setSidebarToggle(!sidebarToggle)}/>
          <span className='text-white font-semibold'>Lista de Registros</span>
        </div>
        <div className='relative'>
          <button className='text-white group'>
          <button className="flex-auto bg-[#f1a598] w-20 py-1 ml-5 rounded-3xl" onClick={()=> logout().then(()=>{navigate("/")}).catch((e)=>{return e})}>Logout</button> 
            <FaUserCircle className='w-10 h-12 ml-10 mt-2' />
            
         <div className='z-10 hidden absolute bg-white rounded-lg shadow w-36 group-focus:block top-full right-0'>
          <ul className='py-2 text-sm text-gray-950'>
                <li className='m-2'>{loggedUserEmail}</li>
                <li><a href=''>Profile</a></li>
                <li><a href=''>Setting</a></li>
         </ul>
     
            </div>
          </button>
        </div>
      </nav>
    
  )
}

export default Navbar
