"use client";
import React, { useRef, useEffect, useState } from "react";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { apiCaller } from "@/lib/auth";

interface PayrollData {
    employee: {
        id: string;
        first_name: string;
        last_name: string;
        department: string;
        position: string;
    };
    hra: string;
    special_allowance: string;
    total_earnings: string;
    total_deductions: string;
    in_hand_salary: string;
    pay_date: string;
    gross_salary: string;
    arrears_amount: string;
    expense_reimbursement: string;
    pf_contribution: string;
    conveyance: string;
    days_worked: string;
    basic_salary: string;

}

const PaySlip: React.FC = () => {
    const payslipRef = useRef<HTMLDivElement | null>(null);
    const [payrollData, setPayrollData] = useState<PayrollData | null>(null);

    useEffect(() => {
        apiCaller.get("api/payroll_app/payrolls/")
            .then((response) => {
                setPayrollData(response.data[0]);
            })
            .catch((error) => {
                console.error("Error fetching payroll data:", error);
            });
    }, []);

    // const handleDownload = () => {
    //     const element = payslipRef.current;
    //     if (element) {
    //         html2canvas(element, { scale: 2 }).then((canvas) => {
    //             const imgData = canvas.toDataURL("image/jpeg", 1.0);
    //             const pdf = new jsPDF("p", "mm", "a4");
    //             const imgWidth = 210;
    //             const pageHeight = 295;
    //             const imgHeight = (canvas.height * imgWidth) / canvas.width;
    //             let heightLeft = imgHeight;
    //             let position = 0;

    //             pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    //             heightLeft -= pageHeight;

    //             while (heightLeft >= 0) {
    //                 position = heightLeft - imgHeight;
    //                 pdf.addPage();
    //                 pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    //                 heightLeft -= pageHeight;
    //             }

    //             pdf.save("payslip.pdf");
    //         });
    //     }
    // };

    if (!payrollData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg border rounded-lg mt-8">
            <div ref={payslipRef} className="p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Company Name</h2>
                        <p className="text-gray-500">Address, City, State</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm font-semibold text-gray-500">PaySlip for the month</p>
                        <p className="text-lg font-bold">{payrollData.pay_date}</p>
                    </div>
                </div>

                <hr className="my-4" />

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold text-xl">Employee Pay Summary</h3>
                        <p className="mt-5 flex gap-5">
                            <strong>Name:</strong>
                            <p>{payrollData.employee.first_name} {payrollData.employee.last_name}</p>
                        </p>
                        <p className="mt-2 flex gap-5">
                            <strong>Employee ID:</strong>
                            <p>{payrollData.employee.id}</p>
                        </p>
                        <p className="mt-2 flex gap-5">
                            <strong>Department:</strong>
                            <p>{payrollData.employee.department}</p>
                        </p>
                        <p className="mt-2 flex gap-5">
                            <strong>Position:</strong>
                            <p>{payrollData.employee.position}</p>
                        </p>
                        <p className="mt-2 flex gap-5">
                            <strong>Pay Date:</strong>
                            <p>{payrollData.pay_date}</p>
                        </p>
                    </div>
                    <div className="p-4 border rounded-lg text-center bg-gray-50 shadow-sm">
                        <h3 className="font-bold text-lg">Rs {payrollData.in_hand_salary}</h3>
                        <p className="text-gray-500">Employee Net Pay</p>
                        <div className="flex justify-between mt-4">
                            <p className="text-sm">Paid Days:{payrollData.days_worked}</p>
                            <p className="text-sm">LOP Days: 0</p>
                        </div>
                    </div>
                </div>

                <hr className="my-4" />

                <div className="mt-6">
                    <Table className="table-auto w-full border-collapse">
                        <TableHeader>
                            <TableRow className="bg-gray-200">
                                <TableHead className="bg-black text-white">Earnings</TableHead>
                                <TableHead className="bg-black text-white">Amount</TableHead>
                                <TableHead className="bg-black text-white">Deductions</TableHead>
                                <TableHead className="bg-black text-white">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="border px-4 py-2">Basic Salary</TableCell>
                                <TableCell className="border px-4 py-2">Rs {payrollData.basic_salary}</TableCell>
                                <TableCell className="border px-4 py-2">EPF Contribution</TableCell>
                                <TableCell className="border px-4 py-2">Rs {payrollData.pf_contribution}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="border px-4 py-2">HRA</TableCell>
                                <TableCell className="border px-4 py-2">Rs {payrollData.hra}</TableCell>
                                <TableCell className="border px-4 py-2">Insurance</TableCell>
                                <TableCell className="border px-4 py-2">Rs -</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="border px-4 py-2">Special Allowance</TableCell>
                                <TableCell className="border px-4 py-2">Rs {payrollData.special_allowance}</TableCell>
                                <TableCell className="border px-4 py-2">TDS</TableCell>
                                <TableCell className="border px-4 py-2">Rs -</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="border px-4 py-2">Conveyance</TableCell>
                                <TableCell className="border px-4 py-2">Rs{payrollData.conveyance}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <hr className="my-4" />

                <div className="mt-6">
                    <Table className="table-auto w-full border-collapse">
                        <TableHeader>
                            <TableRow className="bg-gray-200">
                                <TableHead className="bg-black text-white">Bonus / Reimbursements</TableHead>
                                <TableHead className="bg-black text-white">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="border px-4 py-2">Arrears</TableCell>
                                <TableCell className="border px-4 py-2">Rs {payrollData.arrears_amount}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="border px-4 py-2">Expense Reimbursement</TableCell>
                                <TableCell className="border px-4 py-2">Rs {payrollData.expense_reimbursement}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

                <hr className="my-4" />

                <div className="text-center mt-8">
                    <h3 className="font-bold text-xl">
                        Employee Net Pay: Rs {payrollData.in_hand_salary}
                    </h3>
                    <p className="text-gray-500">
                        (Rupees {payrollData.in_hand_salary} only)
                    </p>
                </div>

                <div className="text-right mt-4">
                    <p className="text-gray-500">HR Department</p>
                </div>
            </div>

            {/* <div className="text-center mt-6">
                <button
                    onClick={handleDownload}
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Download PDF
                </button>
            </div> */}
        </div>
    );
};

export default PaySlip;
