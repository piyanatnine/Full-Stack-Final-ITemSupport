function Navbar({show}) {
    return (
      <aside className="duration-500 relative navbar" aria-label="Sidebar"
        style={{ width: show ? '20vw': '0vw' }}
      >
        <div className="py-4 bg-slate-600 h-screen transition-all duration-300 overflow-hidden">
        <ul className="space-y-2 px-5">

        </ul>
        </div>
      </aside>
    );
  }
  
  export default Navbar;