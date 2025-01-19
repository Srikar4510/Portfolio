import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { AiFillLinkedin } from 'react-icons/ai';
import { SiLeetcode, SiGeeksforgeeks } from 'react-icons/si';
const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <nav className="bg-gray-900 p-4 text-white fixed w-full z-10 top-0 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-3xl font-extrabold">
          <a href="/">Srikar Ambula</a>
        </div>
        <div className='flex space-x-6'>
    
    <a href="https://www.linkedin.com/in/srikar-ambula-66a647277/" target='_blank' rel='noopener noreferrer' className='footer-icon text-blue-700'>
        <AiFillLinkedin className='text-3xl text-blue-700' />
    </a>
    <a href="https://github.com/Srikar4510" target='_blank' rel='noopener noreferrer' className='footer-icon text-gray-800'>
        <FaGithub className='text-3xl text-white' />
    </a>
    <a href="https://leetcode.com/u/Srikar4510/" target='_blank' rel='noopener noreferrer' className='footer-icon '>
        <SiLeetcode className='text-3xl text-yellow-400' />
    </a>
    <a href="https://www.geeksforgeeks.org/user/srikara21/" target='_blank' rel='noopener noreferrer' className='footer-icon '>
        <SiGeeksforgeeks className='text-3xl text-green-500' />
    </a>
</div>

        <div className="hidden sm:flex space-x-6 items-center text-lg">
          <Link to='/' className="hover:text-blue-400">Home</Link>
          <Link to='/about' className="hover:text-blue-400">About</Link>
          <Link to='/projects' className="hover:text-blue-400">Projects</Link>
          <Link to='/contact' className="hover:text-blue-400">Contact</Link>
        </div>
        <div className="sm:hidden">
          <button onClick={toggleMobileMenu} className="text-2xl focus:outline-none">
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
        <div className={`sm:hidden fixed top-0 left-0 w-full h-full bg-gray-900 text-center transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <button onClick={closeMobileMenu} className="text-2xl absolute top-4 right-4 focus:outline-none">
            ✕
          </button>
          <ul className="font-medium text-2xl space-y-8 mt-20">
            <li><Link to='/' onClick={closeMobileMenu} className="hover:text-blue-400">Home</Link></li>
            <li><Link to='/about' onClick={closeMobileMenu} className="hover:text-blue-400">About</Link></li>
            <li><Link to='/projects' onClick={closeMobileMenu} className="hover:text-blue-400">Projects</Link></li>
            <li><Link to='/experience' onClick={closeMobileMenu} className="hover:text-blue-400">Experience</Link></li>
            <li><Link to='/contact' onClick={closeMobileMenu} className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
