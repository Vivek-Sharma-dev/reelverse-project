import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md'; // Added Email icon
import { Link, NavLink } from 'react-router-dom'; // Added Link component from React Router
import Logo from './header/Logo';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-gray-800 p-8">
      <div className="container mx-auto">
        
        {/* --- Top Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          
          {/* Column 1: Brand & Mission */}
          <div className="flex flex-col md:col-span-2 lg:col-span-1">
            <div className="mb-4">
            <Logo />
            </div>
            {/* The Intro */}
            <p className="text-gray-400 text-md md:text-lg leading-snug pr-4">
              ReelVerse isn't just a database; it's your personal movie companion. 
              Discover, track, and dive deeper into every story ever told on screen.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="text-start md:text-center">
            <h3 className="text-lg font-bold text-white mb-4">Navigate</h3>
            <ul className="space-y-3 text-lg">
              <li><NavLink to="/hollywood" className="text-gray-400 hover:text-white transition-colors">Hollywood</NavLink></li>
              <li><NavLink to="/bollywood" className="text-gray-400 hover:text-white transition-colors">Bollywood</NavLink></li>
              <li><NavLink to="/anime" className="text-gray-400 hover:text-white transition-colors">Anime</NavLink></li>
              <li><NavLink to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</NavLink></li>
            </ul>
          </div>

         
          {/* Column 3: Resources */}
          <div className="text-left">
            <h3 className="text-lg font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-3 text-lg">
              <li>
                <a 
                  href="https://www.themoviedb.org/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  TMDb API
                </a>
              </li>
              <li className="text-gray-500 text-md md:text-lg pt-2">
                This product uses the TMDb API but is not endorsed or certified by TMDb.
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom Section: Copyright & Socials --- */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-lg">
            &copy; {new Date().getFullYear()} Vivek Sharma. All rights reserved.
          </p>
          
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a
              href="https://github.com/Vivek-Sharma-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all hover:rotate-y-180  hover:scale-120"
              title="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="www.linkedin.com/in/vivek-sharma-44776233a" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-all hover:rotate-y-180  hover:scale-120"
              title="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="mailto:viveksharmaa252@gmail.com"
              className="text-gray-400 hover:text-white transition-all hover:rotate-y-180  hover:scale-120"
              title="Email"
            >
              <MdEmail size={24} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;