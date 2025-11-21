import GeneralService from "@/services/EmployeeService";
import { useEffect, useState } from "react";

const Jobs: React.FC = () => {
  const [jobList, setJobList] = useState([]);

  useEffect(() => {

    const fetchJobs = async () => {
      const response = await GeneralService.fetchJobs();
      setJobList(response);
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-sky-300 m-auto rounded-2xl my-20 w-4xl h-fit p-6 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold text-sky-900">Jobs</h2>

        <table className="w-full text-left text-sky-950">
          <thead>
            <tr className="border-b border-sky-500 text-sky-900 font-bold">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Start Time</th>
              <th className="p-3">End Time</th>
            </tr>
          </thead>

          <tbody>
            {jobList.map((job) => (
              <tr key={job.id} className="border-b border-sky-500">
                <td className="p-3">{job.id}</td>
                <td className="p-3">{job.name}</td>
                <td className="p-3">{job.startTime}</td>
                <td className="p-3">{job.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Jobs;