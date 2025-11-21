import GeneralService from '@/services/EmployeeService';
import { Field, Label, Select } from '@headlessui/react';
import { useEffect, useState } from 'react';

interface JobSelectionProps {
    selectedJobId: string;
    setSelectedJobId: (value: string) => void;
}

const JobSelection = ({ selectedJobId, setSelectedJobId }: JobSelectionProps) => {
    const [jobsList, setJobsList] = useState<[]>([]);

    const selectedJob = jobsList.find((job) => job.id.toString() === selectedJobId);

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await GeneralService.fetchJobs();
            setJobsList(response);
        };

        fetchJobs();
    }, []);

    return (
        <div className="flex flex-col gap-4 bg-sky-300 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-sky-900">Job Selection</h2>

            <div className="grid grid-cols-2 gap-4">

                <Field className="flex flex-col">
                    <Label>Job</Label>
                    <Select
                        name="job"
                        className="bg-sky-950 rounded-lg p-3 hover:bg-sky-900 transition"
                        value={selectedJobId}
                        onChange={(e) => setSelectedJobId(e.target.value)}
                    >
                        <option value="">Select Job</option>
                        {jobsList.map((job) => (
                            <option key={job.id} value={job.id}>
                                {job.name}
                            </option>
                        ))}
                    </Select>
                </Field>

                <Field className="flex flex-col">
                    <Label>Time Window</Label>
                    <div className="bg-sky-950 rounded-lg p-3 text-sky-200">
                        {selectedJob ? `${selectedJob.startTime} - ${selectedJob.endTime}` : "Select a job to view time window"}
                    </div>
                </Field>

            </div>
        </div>
    );
};

export default JobSelection;
