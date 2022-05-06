function Navbar({show}) {
    return (
      <aside className="duration-500 relative navbar" aria-label="Sidebar"
        style={{ width: show ? '20vw': '0vw' }}
      >
        <div className="overflow-y-auto py-4 bg-white h-screen rounded transition-all duration-300 overflow-hidden">
        <ul className="space-y-2 px-5">
          <li>a</li>
          <li>a</li>
          <li>a</li>
        </ul>
        </div>
      </aside>
    );
  }
  
  export default Navbar;