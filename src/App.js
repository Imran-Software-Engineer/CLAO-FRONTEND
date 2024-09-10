import React from "react";
import { Route, Routes } from "react-router-dom";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetails";
import NoPage from "./pages/NoPage";

const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<JobList />} />
      <Route path={"/jobs/:jobId"} element={<JobDetail />} />
      <Route path={"*"} element={<NoPage />} />
    </Routes>
  );
};

export default App;
