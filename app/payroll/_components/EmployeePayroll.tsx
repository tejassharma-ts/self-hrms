"use client";
import React, { useState } from "react";
import { Icons } from "@/components/Icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Employee {
  name: string;
  title: string;
  department: string;
  image: string;
}

const employeeData: Employee[] = [
  { name: "John", title: "Designer", department: "Design", image: "/path/to/image2.jpg" },
  { name: "John", title: "Designer", department: "Design", image: "/path/to/image2.jpg" },
  { name: "John", title: "Designer", department: "Design", image: "/path/to/image2.jpg" },
  { name: "Jane", title: "Programmer", department: "Design", image: "/path/to/image3.jpg" },
  { name: "Orianna", title: "Programmer", department: "Marketing", image: "/path/to/image1.jpg" },
  { name: "Smith", title: "Programmer", department: "Marketing", image: "/path/to/image4.jpg" },
  { name: "Smith", title: "Programmer", department: "Marketing", image: "/path/to/image5.jpg" },
  { name: "Smith", title: "Programmer", department: "Marketing", image: "/path/to/image5.jpg" },
];

const designFilterOptions = ["Designer", "Programmer"];
const EmployeePayroll: React.FC = () => {
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const marketingEmployees = employeeData.filter((emp) => emp.department === "Marketing");
  const designEmployees = employeeData.filter((emp) => emp.department === "Design");

  const handleMenuClick = (index: number) => {
    setActiveCardIndex(activeCardIndex === index ? null : index);
  };
  const router = useRouter();
  const handleBackClick = () => {
    router.push("/payroll");
  };

  return (
    <div className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <Button className={"flex gap-x-2"} variant={"ghost"} onClick={handleBackClick}>
            <ArrowLeft className={"h-5 w-5"} />
            back to payroll
          </Button>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="mb-4">Department</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {designFilterOptions.map((option) => (
                <DropdownMenuItem key={option}>{option}</DropdownMenuItem>
              ))}
              <DropdownMenuItem>Clear Filter</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <h2 className="mb-4 text-xl font-semibold">Marketing</h2>
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {marketingEmployees.map((employee, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
            <img
              src={employee.image}
              alt={employee.name}
              className="h-24 w-24 rounded-full object-cover"
            />
            <h3 className="mt-4 text-lg font-medium">{employee.name}</h3>
            <p className="text-gray-500">{employee.title}</p>

            <Button className="mt-4 rounded-full bg-black px-6 py-2 text-sm text-white">
              Payroll History
            </Button>

            <div className="absolute right-2 top-2">
              <Icons.option
                className="cursor-pointer text-gray-600"
                onClick={() => handleMenuClick(index)}
                size={20}
              />
            </div>

            {activeCardIndex === index && (
              <div className="absolute right-8 top-8 rounded-lg border bg-white p-2 shadow-lg">
                <ul>
                  <li className="cursor-pointer px-4 py-1 hover:bg-gray-100">Add Bonus</li>
                  <li className="cursor-pointer px-4 py-1 text-gray-400 hover:bg-gray-100">
                    Add Deduction
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-xl font-semibold">Design</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {designEmployees.map((employee, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
            <img
              src={employee.image}
              alt={employee.name}
              className="h-24 w-24 rounded-full object-cover"
            />
            <h3 className="mt-4 text-lg font-medium">{employee.name}</h3>
            <p className="text-gray-500">{employee.title}</p>

            <Button className="mt-4 rounded-full bg-black px-6 py-2 text-sm text-white">
              Payroll History
            </Button>

            <div className="absolute right-2 top-2">
              <Icons.option
                className="cursor-pointer text-gray-600"
                onClick={() => handleMenuClick(index + marketingEmployees.length)}
                size={20}
              />
            </div>

            {activeCardIndex === index + marketingEmployees.length && (
              <div className="absolute right-8 top-8 rounded-lg border bg-white p-2 shadow-lg">
                <ul>
                  <li className="cursor-pointer px-4 py-1 hover:bg-gray-100">Add Bonus</li>
                  <li className="cursor-pointer px-4 py-1 text-gray-400 hover:bg-gray-100">
                    Add Deduction
                  </li>
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeePayroll;
