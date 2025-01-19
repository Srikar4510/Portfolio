import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className='footer bg-gradient-to-r from-gray-800 via-gray-900 to-black py-6 px-4'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                <p className='text-gray-400 text-center md:text-left mb-4 md:mb-0'>© {year} Srikar. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
