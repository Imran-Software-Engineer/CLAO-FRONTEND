import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-9xl font-extrabold text-gray-900 tracking-widest">
        404
      </h1>
      <div className="bg-indigo-500 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <div className="pt-4 mt-4 text-center">
        <h2 className="text-2xl font-semibold">Uh-oh! You seem to be lost.</h2>
        <p className="text-gray-600 mt-2">
          The page you are looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="mt-5 inline-block px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NoPage;
