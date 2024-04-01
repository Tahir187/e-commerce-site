import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer  bg-gradient-to-br from-transparent via-purple-300 to-transparent'>
      <div className='container py-4 text-center'>
        <div className='flex items-center justify-center text-black font-medium text-sm'>
          <Link to='/' className='text-uppercase'>Privacy Policy</Link>
          <div className='vert-line h-4 w-px mx-4 bg-white'></div>
          <Link to='/' className='text-uppercase'>Term of Service</Link>
          <div className='vert-line h-4 w-px mx-4 bg-white'></div>
          <Link to='/' className='text-uppercase'>About E.com.</Link>
        </div>
        <span className='text-white block mt-2 font-medium text-sm'>&copy; 2024 E.com. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
