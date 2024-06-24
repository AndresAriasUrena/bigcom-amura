'use client';

import Link from 'next/link';
import React, { Suspense } from 'react';

const NotFound: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
};

const NotFoundContent: React.FC = () => {
  return (
    <div className="not-found flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">
      <h1 className="mb-6 text-4xl font-bold text-gray-800">404</h1>
      <p className="mb-4 text-lg text-gray-600">The page you requested could not be found.</p>
      <Link
        href="/"
        className="inline-flex items-center rounded bg-gray-800 px-4 py-2 font-bold text-white hover:bg-gray-700"
      >
        Go back to the home page
        <svg
          className="-mr-1 ml-2 h-4 w-4"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </Link>
      {/* Add more content as needed */}
    </div>
  );
};

export default NotFound;
