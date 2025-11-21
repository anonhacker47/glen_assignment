import GeneralService from '@/services/EmployeeService';
import { Field, Label, Select } from '@headlessui/react'
import { useEffect, useState } from 'react';

interface EmployeeSelectionProps {
    selectedEmployee: string | null;
    handleSelect: (id: string) => void;
}

const EmployeeSelection: React.FC<EmployeeSelectionProps> = ({ selectedEmployee, handleSelect }) => {
    const [employeeList, setEmployeeList] = useState<[]>([])
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [roleFilter, setRoleFilter] = useState<string>("All");
    const [availabilityFilter, setAvailabilityFilter] = useState<string>("All");

    useEffect(() => {

        const fetchEmployees = async () => {
            const response = await GeneralService.fetchEmployees();
            setEmployeeList(response)
        };

        fetchEmployees();

    }, []);

    const filteredEmployees = employeeList
        .filter((employee) =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((employee) =>
            roleFilter === "All" ? true : employee.role === roleFilter
        )
        .filter((employee) => {
            if (availabilityFilter === "All") return true;
            return availabilityFilter === "Available"
                ? employee.availability
                : !employee.availability;
        })
    return (
        <div className="bg-sky-300 m-auto rounded-2xl w-4xl h-fit p-6 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold text-sky-900">Employee Selection</h2>

                <div className="grid grid-cols-3 gap-4">

                    <div className="flex flex-col">
                        Search<input
                            placeholder="Search employee name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-sky-950 rounded-lg p-3 hover:bg-sky-900 transition"
                        />
                    </div>

                    <Field className="flex flex-col">
                        <Label>Role</Label>
                        <Select
                            name="role"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="bg-sky-950 rounded-lg p-3 hover:bg-sky-900 transition"
                        >
                            <option>All</option>
                            <option>TCP</option>
                            <option>LCT</option>
                            <option>Supervisor</option>
                        </Select>
                    </Field>

                    <Field className="flex flex-col">
                        <Label>Availability</Label>
                        <Select
                            name="availability"
                            value={availabilityFilter}
                            onChange={(e) => setAvailabilityFilter(e.target.value)}
                            className="bg-sky-950 rounded-lg p-3 hover:bg-sky-900 transition"
                        >
                            <option>All</option>
                            <option>Available</option>
                            <option>Unavailable</option>
                        </Select>
                    </Field>

                </div>

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
                        {filteredEmployees.map((employee) => {
                            const isSelected = selectedEmployee === employee.id;

                            return (
                                <tr
                                    key={employee.id}
                                    onClick={() => handleSelect(employee.id)}
                                    className={`border-b border-sky-500 transition cursor-pointer ${isSelected ? "bg-sky-400" : "hover:bg-sky-300"
                                        }`}
                                >
                                    <td className="p-3 flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={() => handleSelect(employee.id)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="w-4 h-4"
                                        />
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

export default EmployeeSelection;