import { useState } from "react";
import EmployeeSelection from "../components/EmployeeSelection"
import Header from "../components/Header"
import JobSelection from "@/components/JobSelection";
import GeneralService from "@/services/EmployeeService";
import toast from "react-hot-toast";

function Home() {

    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    const handleSelect = (id: string) => {
        setSelectedEmployeeId(prev => (prev === id ? null : id));
    };

    const assignRole = async () => {
        try {
            const response = await GeneralService.assignEmployee(selectedEmployeeId, selectedJobId)
            console.log(response);
            toast.success(response?.data?.message || "Assigned successfully!");
        }
        catch (error) {
            console.log(error);
            const message =
                error?.response?.data?.error ||
                error?.message ||
                "Something went wrong while assigning.";

            toast.error(message);
        }
    }

    return (
        <div>
            <div className="flex max-w-7xl mx-auto items-center justify-center">
                <div className="my-12 flex gap-8 flex-col">
                    <h1 className="text-sky-200 text-2xl mx-4 font-bold">
                        Assign Jobs
                    </h1>

                    <EmployeeSelection selectedEmployee={selectedEmployeeId} handleSelect={handleSelect} />

                    <JobSelection selectedJobId={selectedJobId} setSelectedJobId={setSelectedJobId} />

                    {/* Assignment Action */}
                    <div className="flex flex-col gap-4 ">
                        <button
                            onClick={() => { assignRole() }}
                            className="bg-sky-300 text-sky-950 cursor-pointer px-6 py-3 rounded-xl hover:bg-sky-400 transition font-bold"
                        >
                            Assign Employee
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Home
