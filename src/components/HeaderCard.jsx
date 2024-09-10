import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HeaderCard = ({ createJob, isHome }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6 flex justify-between items-center w-full">
      <Link to={"/"} className="text-xl font-bold">
        Job Task
      </Link>
      {isHome ? (
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded"
          onClick={createJob}
        >
          Create Job
        </button>
      ) : (
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to home
        </button>
      )}
    </div>
  );
};

export default HeaderCard;
