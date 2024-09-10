import React, { useEffect, useRef, useState } from "react";
import HeaderCard from "../components/HeaderCard";
import JobCard from "../components/JobCard";
import { createJob, getJobs } from "../services/jobService";
import { toast } from "react-toastify";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const jobsEndRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const data = await getJobs();
    if (data?.code === 200) {
      setJobs(data?.data);
      setLoading(false);
    } else {
      toast.error(data?.message);
      setLoading(false);
    }
  };

  const handleCreateJob = async () => {
    setLoading(true);
    let res = await createJob();
    if (res?.code === 200) {
      fetchJobs();
      toast.success(res?.message);
      setLoading(false);

      // Scroll to the bottom of the job list
      jobsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      toast.error(res?.message);
      setLoading(false);
    }
  };

  // WebSocket connection
  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_SOCKET_URL);

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    // Handle messages from the WebSocket server
    ws.onmessage = (event) => {
      const updatedJob = JSON.parse(event.data);
      console.log("Received job update from WebSocket:", updatedJob);

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === updatedJob.id
            ? { ...job, status: updatedJob.status, result: updatedJob.result }
            : job
        )
      );
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-8">
      <HeaderCard createJob={handleCreateJob} isHome={true} />

      {loading ? (
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mt-2">Loading...</p>
        </div>
      ) : jobs?.length > 0 ? (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs?.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center mt-12">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 19H5V6h14v13zM12 3v1m0 16v1m9-6h-1M4 12H3m16.293-6.293a1 1 0 00-1.414 0l-2 2a1 1 0 000 1.414L16.293 8.293a1 1 0 001.414-1.414l-2-2a1 1 0 00-1.414 0L11 7m0 0a1 1 0 00-1.414 0L6.293 8.293a1 1 0 001.414 1.414L11 7m0 0a1 1 0 001.414-1.414L15.707 3a1 1 0 00-1.414-1.414L11 3.707 9.707 5m2.293-2.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-2 2m-1 1L7 12"
            />
          </svg>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-4">
            No Jobs Available
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            It seems there are no jobs at the moment. Please check back later.
          </p>
          <button
            onClick={handleCreateJob}
            className="mt-6 inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create New Job
          </button>
        </div>
      )}
      <div ref={jobsEndRef} />
    </div>
  );
};

export default JobList;
