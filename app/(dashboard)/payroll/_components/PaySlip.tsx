'use client'
import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { apiCaller } from "@/lib/auth";
import { Payroll } from "@/types/types";
import { toast } from "@/hooks/use-toast";

interface PaySlipProps {
    payrollData: Payroll;
    onSlipSent: () => void;
}

const PaySlip: React.FC<PaySlipProps> = ({ payrollData, onSlipSent }) => {
    const payslipRef = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSendPaySlip = () => {
        if (payslipRef.current) {
            setIsLoading(true);
            toast({
                title: "Processing",
                description: "Generating and sending the payslip...",
                variant: "default",
            });

            const element = payslipRef.current;
            html2canvas(element, { scale: 2 }).then((canvas) => {
                const imgData = canvas.toDataURL("image/jpeg", 1.0);
                const pdf = new jsPDF("p", "mm", "a4");
                const imgWidth = 210;
                const pageHeight = 295;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                const pdfBlob = pdf.output("blob");
                const formData = new FormData();
                formData.append('employee', payrollData.employee.id);
                formData.append('salary_structure', payrollData.salary_structure);
                formData.append('slip_sent_status', 'true');
                formData.append('slip', pdfBlob, 'payroll-slip.pdf');

                apiCaller.post("api/payroll_app/create-salary-slip/", formData)
                    .then((_response) => {
                        toast({
                            title: "Success",
                            description: "Payslip sent successfully.",
                            variant: "success",
                        });
                        formData.set('slip_sent_status', 'true');
                        onSlipSent();
                    })
                    .catch((error) => {
                        toast({
                            title: "Error",
                            description: "Failed to send payslip. Please try again.",
                            variant: "destructive",
                        });
                        console.error("Error posting PDF:", error);
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
            });
        } else {
            toast({
                title: "Error",
                description: "Payslip generation failed. No data available.",
                variant: "destructive",
            });
        }
    };

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
                            <p className="text-sm">Paid Days: {payrollData.days_worked}</p>
                            <p className="text-sm">LOP Days: 0</p>
                        </div>
                    </div>
                </div>

                <hr className="my-4" />

                <div className="mt-6">
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr className="bg-black py-5">
                                <th className=" text-white">Earnings</th>
                                <th className=" text-white">Amount</th>
                                <th className=" text-white">Deductions</th>
                                <th className=" text-white">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Basic Salary</td>
                                <td className="border px-4 py-2">Rs {payrollData.basic_salary}</td>
                                <td className="border px-4 py-2">EPF Contribution</td>
                                <td className="border px-4 py-2">Rs {payrollData.pf_contribution}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">HRA</td>
                                <td className="border px-4 py-2">Rs {payrollData.hra}</td>
                                <td className="border px-4 py-2">Insurance</td>
                                <td className="border px-4 py-2">Rs -</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Special Allowance</td>
                                <td className="border px-4 py-2">Rs {payrollData.special_allowance}</td>
                                <td className="border px-4 py-2">TDS</td>
                                <td className="border px-4 py-2">Rs -</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Conveyance</td>
                                <td className="border px-4 py-2">Rs {payrollData.conveyance}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr className="my-4" />

                <div className="mt-6">
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="bg-black text-white">Bonus / Reimbursements</th>
                                <th className="bg-black text-white">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border px-4 py-2">Arrears</td>
                                <td className="border px-4 py-2">Rs {payrollData.arrears_amount}</td>
                            </tr>
                            <tr>
                                <td className="border px-4 py-2">Expense Reimbursement</td>
                                <td className="border px-4 py-2">Rs {payrollData.expense_reimbursement}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <button
                className={`mt-6 px-4 py-2 rounded ${isLoading ? "bg-gray-400" : "bg-blue-500 text-white"}`}
                onClick={handleSendPaySlip}
                disabled={isLoading}  // Disable button during loading
            >
                {isLoading ? "Sending..." : "Send to Employee"}
            </button>
        </div>
    );
};

export default PaySlip;
