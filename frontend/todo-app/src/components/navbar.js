import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './user_context';

function Navbar() {
  const user = useUserContext();
  const navigate = useNavigate();
  console.log(user)
  return (
    <nav className='bg-black bg-opacity-30 p-6 flex flex-row justify-between'>
        <a href='/#' className='hover:opacity-80 duration-150'>
          Todo App
        </a>
        {user == null ?
          <button onClick={() => navigate("/auth")} className='h-full hover:opacity-80 duration-150'>
            Login
          </button> :
          <span>Welcome, {user.username}</span>}
    </nav>
  );
}

export default Navbar;