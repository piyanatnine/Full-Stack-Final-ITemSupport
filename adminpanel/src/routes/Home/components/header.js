

function Header({click, show}) {

  return (
    <nav className="relative w-full h-32 flex flex-wrap items-center justify-between py-4 bg-[#E35205] 
      text-gray-500shadow-lg navbar navbar-expand-lg navbar-light" 
    >
      <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
        <button onClick={click}>
          
        </button>
      </div>
    </nav>
  );
}

export default Header;