import React from 'react';
import { Link } from 'react-router-dom';

const GenericError = () => {
  return (
    <div className="overflow-hidden w-full h-screen relative">
      <div className="absolute inset-0">
        <img src="/images/cades-cove.jpg" className="w-full h-full object-cover" alt="Gravel road looking onto a field with the mountains in the background on a foggy day." />
      </div>
      <div className="relative w-full h-full flex justify-center items-center p-8">
        <div className="text-center bg-white bg-opacity-75 p-8 rounded-xl border-2 border-gray-600 drop-shadow-lg">
          <h1 className="text-4xl mb-4">Something went wrong</h1>
          <p className="text-lg mb-4">Sorry, we've encountered an error.</p>
          <Link to="/" className="text-blue-500 hover:underline">Go back to Home</Link>
        </div>
      </div>
    </div>
  );
};

export default GenericError;
