import GeneralService from "@/services/EmployeeService";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const Schedule: React.FC = () => {
    const [scheduleList, setScheduleList] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [jobs, setJobs] = useState([]);

    const fetchData = async () => {
        const scheduleResponse = await GeneralService.fetchSchedule();
        const employeeResponse = await GeneralService.fetchEmployees();
        const jobResponse = await GeneralService.fetchJobs();

        setScheduleList(scheduleResponse);
        setEmployees(employeeResponse);
        setJobs(jobResponse);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const scheduleResponse = await GeneralService.fetchSchedule();
                const employeeResponse = await GeneralService.fetchEmployees();
                const jobResponse = await GeneralService.fetchJobs();

                setScheduleList(scheduleResponse);
                setEmployees(employeeResponse);
                setJobs(jobResponse);
            } catch (err) {
                toast.error("Failed to load data");
            }
        };

        loadData();
    }, []);
    const handleDelete = async (employeeId: number, jobId: number) => {
        try {
            const { data } = await GeneralService.deleteAssignment(employeeId, jobId);
            await fetchData();
            toast.success(data.message);
        } catch (error) {
            toast.error(error?.response?.data?.error || "Something went wrong");
        }
    };

    const getEmployeeName = (id: number | string) =>
        employees.find((emp) => emp.id === Number(id))?.name || "-";

    const getJob = (id: number | string) =>
        jobs.find((j) => j.id === Number(id));

    return (
        <div className="bg-sky-300 m-auto rounded-2xl my-20 w-4xl h-fit p-6 flex flex-col gap-8">
            <h2 className="text-xl font-semibold text-sky-900">Schedule</h2>

            <table className="w-full text-left text-sky-950">
                <thead>
                    <tr className="border-b border-sky-500 text-sky-900 font-bold">
                        <th className="p-3">Employee</th>
                        <th className="p-3">Job</th>
                        <th className="p-3">Start Time</th>
                        <th className="p-3">End Time</th>
                        <th className="p-3 text-center">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {scheduleList.map((schedule, index) => {
                        const jobData = getJob(schedule.jobId);

                        return (
                            <tr key={index} className="border-b border-sky-500">
                                <td className="p-3">{getEmployeeName(schedule.employeeId)}</td>
                                <td className="p-3">{jobData?.name || "-"}</td>
                                <td className="p-3">{jobData?.startTime || "-"}</td>
                                <td className="p-3">{jobData?.endTime || "-"}</td>

                                <td className="p-3 text-center items-center justify-center">
                                    <button
                                        onClick={() => handleDelete(schedule.employeeId, schedule.jobId)}
                                        className="bg-red-600 hover:bg-red-700 text-white cursor-pointer px-4 py-2 rounded-lg flex justify-center items-center gap-2"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};


export default Schedule;