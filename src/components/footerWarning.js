import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-300">
          <span className="font-semibold">📢 NOTE:</span> This dApp is for demo purposes only. 
          <span className="block sm:inline sm:ml-1">All votes are via the Nuklai Testnet.</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;