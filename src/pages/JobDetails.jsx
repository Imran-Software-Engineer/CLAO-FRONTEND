import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../services/jobService";
import HeaderCard from "../components/HeaderCard";
import { toast } from "react-toastify";

const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobDetails();
  }, []);

  const fetchJobDetails = async () => {
    setLoading(true);
    const data = await getJobById(jobId);
    if (data?.code === 200) {
      setJob(data?.data);
      setLoading(false);
    } else {
      toast.error(data?.message);
      setLoading(false);
    }
  };

  if (!job) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center p-8">
      <HeaderCard isHome={false} createJob={() => {}} />
      <div className="w-full max-w-4xl">
        {loading ? (
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 mt-2">Loading...</p>
          </div>
        ) : job?.id !== null && job?.id !== undefined ? (
          <div className="bg-white shadow rounded-lg p-4">
            {job?.result ? (
              <img
                className="w-full h-[300px] object-cover mb-2 rounded-lg"
                src={job?.result}
                loading="lazy"
                alt="job detail pic"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 mb-2 flex justify-center items-center">
                <p className="text-lg text-gray-600">No image found</p>
              </div>
            )}
            <p className="text-lg font-bold mb-2">ID: {job?.id}</p>
            <p className="capitalize">
              Status:{" "}
              <span
                className={`py-1 px-3 rounded-full text-white capitalize ${
                  job?.status === "resolved" ? "bg-green-500" : "bg-yellow-500"
                }`}
              >
                {job.status}
              </span>
            </p>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg p-4 text-center">
            {" "}
            No Job found.
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
