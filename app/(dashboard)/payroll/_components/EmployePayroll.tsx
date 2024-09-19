"use client";
import React, { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AddBonus from "./AddBonus";
import AddDeduction from "./AddDeduction";
import { Icons } from "@/components/Icons";
import { apiCaller } from "@/lib/auth";
import { EmployeePayrollApiResponse } from "@/types/types";
import { getFullName } from "@/lib/utils";

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
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [departments, setDepartments] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiCaller.get<EmployeePayrollApiResponse[]>(
          "api/payroll_app/payrolls/",
        );

        console.log("response of api:", data);

        // Store the full API response
        setEmployeeData(data);
        setFilteredData(data);

        // Extract unique departments
        const Departments = Array.from(new Set(data.map((item: any) => item.employee.department)));
        setDepartments(Departments);
      } catch (error) {
        console.error("Error fetching data:", error);
        setEmployeeData([]);
        setFilteredData([]);
        setDepartments([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDepartment === "") {
      setFilteredData(employeeData);
    } else {
      setFilteredData(employeeData.filter((emp) => emp.employee.department === selectedDepartment));
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
            {departments.map((option) => (
              <DropdownMenuItem key={option} onClick={() => setSelectedDepartment(option)}>
                {option}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={() => setSelectedDepartment("")}>
              Clear Filter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h2 className="mb-4 text-xl font-semibold">{selectedDepartment || "All Departments"}</h2>

      {filteredData.length > 0 ? (
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredData.map((employee, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
              <img
                src={employee.employee.profile_picture || "/path/to/default-image.jpg"}
                alt={employee.employee.first_name}
                className="h-24 w-24 rounded-full object-cover"
              />
              <h3 className="mt-4 text-lg font-medium">{`${employee.employee.first_name} ${employee.employee.last_name}`}</h3>
              <p className="text-gray-500">{employee.employee.position}</p>

              <Button className="mt-4 rounded-full bg-black px-6 py-2 text-sm text-white">
                Payroll History
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger className="absolute right-2 top-2">
                  <Icons.option />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <AddBonus
                    employeeID={employee.employee.id}
                    employeeName={getFullName(
                      employee.employee.first_name,
                      employee.employee.last_name,
                    )}
                  />
                  <DropdownMenuSeparator />
                  <AddDeduction employeeID={employee.employee.id} />
                </DropdownMenuContent>
              </DropdownMenu>
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
