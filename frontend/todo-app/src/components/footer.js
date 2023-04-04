import React from 'react';

function Footer() {

  return (
    <footer className='w-full px-12 pb-6 grid grid-cols-1 gap-2 md:gap-4 text-center text-sm opacity-70'>
        <p>Double click to edit a todo</p>
        <div className='w-full flex flex-col md:flex-row items-center justify-between'>
          <p>Built with	&#10084; by Ahmed Nabil</p>
          <div className='-mx-6'>
            <a href='/#' className='fa italic mx-3 hover:opacity-80 duration-150'>Linkedin &#xf08c;</a> |
            <a href='/#' className='fa italic mx-3 hover:opacity-80 duration-150'>Github &#xf09b;</a> |
            <a href='/#' className='fa italic mx-3 hover:opacity-80 duration-150'>Facebook &#xf09a;</a>
          </div>
        </div>
    </footer>
  );
}

export default Footer;