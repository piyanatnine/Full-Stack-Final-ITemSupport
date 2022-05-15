function Navbar({show, menu}) {

  const MenuItem = () => {
    return menu.map((menu) => {
      return <li className="text-3xl text-white">{menu.title}</li>
    })
  }

  return (
    <aside className={`duration-500 t-0 w-[18vw] fixed navbar transition-all
    ${show ? 'left-0' : '-left-[18vw]'}`} aria-label="Sidebar"
    >
      <div className="bg-slate-600 h-screen transition-all duration-300 overflow-hidden">
        <div className="bg-[#4D84FE] h-20 justify-item-center shadow-lg  grid place-content-center">
          <div className="flex">
            <img className="object-cover w-10 h-10 mx-2" src="https://www.it.kmitl.ac.th/wp-content/uploads/2017/12/it-logo.png"/>
            <div className="grid">
              <span className="text-xl font-bold text-white">IT Support @KMITL</span>
              <span className="text-sm font-semibold text-white">Admin Dashboard</span>
            </div>
          </div>
          
        </div>
      <ul className="space-y-2 px-5 my-10">
        <MenuItem/>
      </ul>
      </div>
    </aside>
  );
}

export default Navbar;