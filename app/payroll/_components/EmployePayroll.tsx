"use client";
import React, { useState, useEffect } from 'react';
import { Icons } from '@/components/Icons';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { api } from '@/api/api'; // Adjust this path as per your project structure

interface Employee {
    name: string;
    title: string;
    department: string;
    image: string;
}

const dummyEmployeeData: Employee[] = [
    { name: 'John', title: 'Designer', department: 'Design', image: '/path/to/image2.jpg' },
    { name: 'Jane', title: 'Programmer', department: 'Design', image: '/path/to/image3.jpg' },
    { name: 'Orianna', title: 'Programmer', department: 'Marketing', image: '/path/to/image1.jpg' },
    { name: 'Smith', title: 'Programmer', department: 'Marketing', image: '/path/to/image4.jpg' },
];

const designFilterOptions = ['Designer', 'Programmer'];

const EmployePayroll: React.FC = () => {
    const [employeeData, setEmployeeData] = useState<Employee[]>([]);
    const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get("api/students/fee-structures/", {
                    // headers: {
                    //     'Authorization': 'Bearer  ',
                    //     'Content-Type': 'application/json',
                    // }
                });
                setEmployeeData(data[0].employees);
            } catch (error) {
                setEmployeeData(dummyEmployeeData);
            }
        };

        fetchData();
    }, []);

    const marketingEmployees = employeeData.filter(emp => emp.department === 'Marketing');
    const designEmployees = employeeData.filter(emp => emp.department === 'Design');

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
                        {designFilterOptions.map(option => (
                            <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
                        ))}
                        <DropdownMenuItem>Clear Filter</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <h2 className="text-xl font-semibold mb-4">Marketing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {marketingEmployees.map((employee, index) => (
                    <div key={index} className="relative bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                        <img
                            src={employee.image}
                            alt={employee.name}
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <h3 className="mt-4 text-lg font-medium">{employee.name}</h3>
                        <p className="text-gray-500">{employee.title}</p>

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
                                    <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer">Add Bonus</li>
                                    <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer text-gray-400">Add Deduction</li>
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <h2 className="text-xl font-semibold mb-4">Design</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {designEmployees.map((employee, index) => (
                    <div key={index} className="relative bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
                        <img
                            src={employee.image}
                            alt={employee.name}
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <h3 className="mt-4 text-lg font-medium">{employee.name}</h3>
                        <p className="text-gray-500">{employee.title}</p>

                        <Button className="mt-4 py-2 px-6 bg-black text-white rounded-full text-sm">
                            Payroll History
                        </Button>

                        <div className="absolute top-2 right-2">
                            <Icons.option
                                className="cursor-pointer text-gray-600"
                                onClick={() => handleMenuClick(index + marketingEmployees.length)}
                                size={20}
                            />
                        </div>

                        {activeCardIndex === index + marketingEmployees.length && (
                            <div className="absolute top-8 right-8 bg-white border rounded-lg shadow-lg p-2">
                                <ul>
                                    <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer">Add Bonus</li>
                                    <li className="py-1 px-4 hover:bg-gray-100 cursor-pointer text-gray-400">Add Deduction</li>
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmployePayroll;
