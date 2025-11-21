import GeneralService from '@/services/EmployeeService';
import { Field, Label, Select } from '@headlessui/react'
import { useEffect, useState } from 'react';


const Employees: React.FC = () => {
    const [employeeList, setEmployeeList] = useState<[]>([])

    useEffect(() => {

        const fetchEmployees = async () => {
            const response = await GeneralService.fetchEmployees();
            setEmployeeList(response)
        };

        fetchEmployees();

    }, []);

    return (
        <div className="bg-sky-300 m-auto rounded-2xl my-20 w-4xl h-fit p-6 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-sky-900">Employees</h2>

                <table className="w-full text-left text-sky-950">
                    <thead>
                        <tr className="border-b border-sky-500 text-sky-900 font-bold">
                            <th className="p-3">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Availability</th>
                        </tr>
                    </thead>

                    <tbody>
                        {employeeList.map((employee) => {
                            return (
                                <tr
                                    key={employee.id}
                                    className="border-b border-sky-500"
                                >
                                    <td className="p-3 flex items-center gap-2">
                                        {employee.id}
                                    </td>

                                    <td className="p-3">{employee.name}</td>
                                    <td className="p-3">{employee.role}</td>

                                    <td
                                        className={`p-3 font-semibold ${employee.availability ? "text-green-700" : "text-red-600"
                                            }`}
                                    >
                                        {employee.availability ? "Available" : "Unavailable"}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default Employees;