import React, { useState } from 'react';

function Navbar() {
    
  // init user state
  const [user, setUser] = useState(null);

  return (
    <nav className='bg-black bg-opacity-30 p-6 flex flex-row justify-between'>
        <a href='/#' className='hover:opacity-80 duration-150'>
          Todo App
        </a>
        {user == null ?
          <button onClick={() => setUser('ahmed')} className='h-full hover:opacity-80 duration-150'>
            Login
          </button> :
          <span>Welcome, {user}</span>}
    </nav>
  );
}

export default Navbar;