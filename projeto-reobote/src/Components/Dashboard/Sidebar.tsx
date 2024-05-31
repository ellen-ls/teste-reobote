import React from 'react'
import { FiInbox } from 'react-icons/fi'
import { IoMdSettings } from 'react-icons/io'
import { IoHome } from 'react-icons/io5'

interface SidebarProps {
  sidebarToggle: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({sidebarToggle}) => {
  return (
    <div className={`${sidebarToggle? 'block' : 'hidden'} w-64 bg-[#202124] fixed h-full px-4 py-2 `}>
      <div className='my-14 mb-4'>
        <h1 className='text-2x text-white font-bold'>Admin Dashboard</h1>
      </div>
      <hr />
      <ul className='mt-3 text-white font-bold'>
        <li className='mb-2 rounded hover:shadow hover:bg-[#f1a598] py-2'>
          <a href='' className='px-3'>
          <IoHome className='inline-block w-6 h-6 mr-2 -mt-2'/>
          Home
          </a>
        </li>
       <li className='mb-2 rounded hover:shadow hover:bg-[#f1a598] py-2'>
          <a href='' className='px-3'>
          <FiInbox className='inline-block w-6 h-6 mr-2 -mt-2'/>
          Inbox
          </a>
        </li>
        <li className='mb-2 rounded hover:shadow hover:bg-[#f1a598] py-2'>
          <a href='' className='px-3'>
          <IoMdSettings className='inline-block w-6 h-6 mr-2 -mt-2'/>
          Settings
          </a>
        </li>
        
      </ul>
    </div>
  )
}

export default Sidebar
