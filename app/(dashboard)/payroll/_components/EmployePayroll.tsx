"use client"
import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import AddBonus from './AddBonus';
import AddDeduction from './AddDeduction';
import { Icons } from '@/components/Icons';
import { apiCaller } from '@/lib/auth';
import { EmployeePayrollApiResponse } from '@/types/types'

interface Employee {
    id: string;
    employee: {
        id: string;
        first_name: string;
        last_name: string;
        profile_picture: string;
        department: string;
        position: string;
    };
    pay_date: string;
    total_earnings: string;
    final_salary: string;
}


const EmployePayroll: React.FC = () => {
    const [employeeData, setEmployeeData] = useState<Employee[]>([]);
    const [filteredData, setFilteredData] = useState<Employee[]>([]);
    const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [departments, setDepartments] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await apiCaller.get<EmployeePayrollApiResponse[]>("api/payroll_app/payrolls/");

                console.log('response of api:', data);

                // Store the full API response
                setEmployeeData(data);
                setFilteredData(data);

                // Extract unique departments
                const Departments = Array.from(new Set(data.map((item: any) => item.employee.department)));
                setDepartments(Departments);
            } catch (error) {
                console.error('Error fetching data:', error);
                setEmployeeData([]);
                setFilteredData([]);
                setDepartments([]);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (selectedDepartment === '') {
            setFilteredData(employeeData);
        } else {
            setFilteredData(employeeData.filter(emp => emp.employee.department === selectedDepartment));
        }
    }, [selectedDepartment, employeeData]);

    const handleMenuClick = (index: number) => {
        setActiveCardIndex(activeCardIndex === index ? null : index);
    };

    return (
        <div className="p-6">
            <div className="flex justify-end">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="mb-4">Department</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {departments.map(option => (
                            <DropdownMenuItem
                                key={option}
                                onClick={() => setSelectedDepartment(option)}
                            >
                                {option}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem onClick={() => setSelectedDepartment('')}>
                            Clear Filter
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <h2 className="text-xl font-semibold mb-4">{selectedDepartment || 'All Departments'}</h2>

            {filteredData.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {filteredData.map((employee, index) => (
                        <div key={index} className="relative bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                            <img
                                src={employee.employee.profile_picture || '/path/to/default-image.jpg'}
                                alt={employee.employee.first_name}
                                className="w-24 h-24 rounded-full object-cover"
                            />
                            <h3 className="mt-4 text-lg font-medium">{`${employee.employee.first_name} ${employee.employee.last_name}`}</h3>
                            <p className="text-gray-500">{employee.employee.position}</p>

                            <Button className="mt-4 py-2 px-6 bg-black text-white rounded-full text-sm">
                                Payroll History
                            </Button>

                            <div className="absolute top-2 right-2">
                                <Icons.option
                                    className="cursor-pointer text-gray-600"
                                    onClick={() => handleMenuClick(index)}
                                    size={20}
                                />
                            </div>

                            {activeCardIndex === index && (
                                <div className="absolute top-8 right-8 bg-white border rounded-lg shadow-lg p-2">
                                    <ul>
                                        <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer">
                                            <AddBonus employeeID={employee.employee.id} />
                                        </li>
                                        <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer text-gray-400">
                                            <AddDeduction employeeID={employee.employee.id} />
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No data available</p>
            )}
        </div>
    );
};

export default EmployePayroll;
