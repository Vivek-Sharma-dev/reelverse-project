import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Search from "./Search";

const Header = () => {
  return (
    // --- Sticky Header only on desktop ---
    <header className="bg-slate-900 p-4 border-b border-gray-800  mb-21 md:mb-0 z-50 overflow-x-hidden md:sticky md:top-0">
      <nav className="container mx-auto flex justify-between items-center">
        <Logo />     
        <NavLinks /> 
        <Search />   
      </nav>
    </header>
  );
};

export default Header;
