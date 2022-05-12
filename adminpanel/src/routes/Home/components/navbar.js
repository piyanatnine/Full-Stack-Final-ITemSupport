import React, { useState } from 'react';

function Header({click, show, user, signOut}) {

  const Menu = () => { return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
    </svg>
  )}

  const [dropDown, setDropDown] = useState(false)
  
  //Component
  const UserProfile = () => {
    return (
      <button className="flex" onClick={()=> {setDropDown(!dropDown)}}>
        <div className="rounded-full w-7 h-7 bg-black mx-2 overflow-hidden">
          <img className="object-cover w-7 h-7" src={user.photoURL}/>
        </div>
        <span className='max-w-[8vw] truncate ...'>
          { user.displayName}
        </span>
      </button>
    )
  }

  return (
    <nav className="relative w-full h-20 bg-slate-100 
      text-gray-500 shadow-lg flex justify-between" 
    > 
      <div className="container-fluid w-full flex flex-wrap items-center justify-between pl-5">
        <div onClick={click}>
          <Menu/>
        </div>
      </div>
      <div className="grid justify-items-end px-5 content-center hover:bg-[#d8dce0]">
          <UserProfile/>
          {dropDown && <div id="dropdown" className="absolute mt-20 w-32 px-3 py-1 rounded-md shadow-lg bg-white focus:outline-none">
            <ui className="list-none">
              <li><span>Profile</span></li>
              <li><span>Settings</span></li>
              <li role="separator" className="divider my-1"><hr/></li>
              <li><button onClick={signOut}>Logout</button></li>
            </ui>
          </div>}
      </div>
    </nav>
  );
}

export default Header;