import React from "react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div
      className="bg-white shadow rounded-lg p-4 mb-4 cursor-pointer"
      onClick={handleClick}
    >
      {job?.result ? (
        <img
          className="w-full h-48 object-cover mb-2 rounded-lg"
          src={job?.result}
          alt="job cover pic"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 mb-2 flex justify-center items-center">
          <p className="text-lg text-gray-600">No image found</p>
        </div>
      )}
      <p className="text-lg font-bold mb-2">ID: {job?.id}</p>
      <span
        className={`py-1 px-3 rounded-full text-white capitalize ${
          job?.status === "resolved" ? "bg-green-500" : "bg-yellow-500"
        }`}
      >
        {job.status}
      </span>
    </div>
  );
};

export default JobCard;
