// import React from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Payroll } from "@/app/(dashboard)/payroll/history/page";
// import PaySlip from "./PaySlip";

// const tableHeadValues: string[] = [
//   "Name",
//   "ID",
//   "HRA",
//   "Allowance",
//   "Bonus",
//   "Special Allowance",
//   "ESIC",
//   "EPF",
//   "LTA",
//   "CTC",
//   "Net Pay",
//   "Pay Slip",
// ];

// export const PayrollOverviewTable = ({
//   payrollData,
// }: {
//   payrollData: Payroll[];
// }): React.ReactNode => {
//   return (
//     <div className="w-full rounded-md border">
//       <Table className="w-full overflow-x-scroll">
//         <TableHeader>
//           <TableRow className="bg-black text-white hover:bg-black">
//             {tableHeadValues.map((value, index) => (
//               <TableHead key={index} className="whitespace-nowrap px-4 py-2 text-white">
//                 {value}
//               </TableHead>
//             ))}
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {payrollData.map((eachPayroll: Payroll) => (
//             <TableRow key={eachPayroll.id}>
//               <TableCell className="whitespace-nowrap px-4 py-2">
//                 {eachPayroll.employee.first_name} {eachPayroll.employee.last_name}
//               </TableCell>
//               <TableCell className="whitespace-nowrap px-4 py-2">{eachPayroll.id}</TableCell>
//               <TableCell className="whitespace-nowrap px-4 py-2">Rs {eachPayroll.hra}</TableCell>
//               <TableCell className="whitespace-nowrap px-4 py-2">
//                 Rs {eachPayroll.allowances}
//               </TableCell>
//               <TableCell className="whitespace-nowrap px-4 py-2">
//                 Rs {eachPayroll.bonus ? eachPayroll.bonus : "0.00"}
//               </TableCell>
//               <TableCell className="whitespace-nowrap px-4 py-2">
//                 Rs {eachPayroll.special_allowance}
//               </TableCell>
//               <TableCell className="whitespace-nowrap px-4 py-2">
//                 Rs {eachPayroll.esi_contribution}
//               </TableCell>
//               <TableCell className="whitespace-nowrap px-4 py-2">
//                 Rs {eachPayroll.expense_reimbursement ? eachPayroll.expense_reimbursement : "0.00"}
//               </TableCell>
//               <TableCell className="whitespace-nowrap px-4 py-2">
//                 Rs {eachPayroll.arrears_amount}
//               </TableCell>
//               <TableCell className="whitespace-nowrap px-4 py-2">
//                 Rs {eachPayroll.gross_salary}
//               </TableCell>
//               <TableCell className="whitespace-nowrap px-4 py-2">
//                 Rs {eachPayroll.in_hand_salary}
//               </TableCell>
//               <TableCell className="whitespace-nowrap px-4 py-2">
//                 <button

//                   className={
//                     "flex w-full cursor-pointer items-center gap-x-1 rounded-full border border-gray-300 bg-transparent px-2 py-1"
//                   }>
//                   <span>Send </span>
//                   <svg
//                     width="14"
//                     height="15"
//                     viewBox="0 0 14 15"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg">
//                     <path
//                       d="M11.9485 5.4776V10.8242C11.9485 12.2219 10.8065 13.364 9.40874 13.364H4.59055C3.19283 13.364 2.05078 12.2219 2.05078 10.8242V5.4776C2.05078 4.50601 2.59624 3.65942 3.39737 3.23329C3.67578 3.08556 4.02237 3.28442 4.02237 3.60261C4.02237 4.50601 4.76101 5.24465 5.66442 5.24465H8.33487C9.23828 5.24465 9.97692 4.50601 9.97692 3.60261C9.97692 3.28442 10.3178 3.08556 10.6019 3.23329C11.4031 3.65942 11.9485 4.50601 11.9485 5.4776Z"
//                       fill="#0A112F"
//                     />
//                     <path
//                       d="M9.11924 3.06545L9.11923 3.06545V3.06818V3.60227C9.11923 4.03628 8.76915 4.38636 8.33514 4.38636H5.659C5.22499 4.38636 4.87491 4.03628 4.87491 3.60227V3.06818C4.87491 2.63613 5.22871 2.28409 5.66468 2.28409H8.33514C8.77167 2.28409 9.12337 2.63606 9.11924 3.06545Z"
//                       fill="#0A112F"
//                       stroke="#FAFAFA"
//                       stroke-width="0.568182"
//                     />
//                     <path
//                       d="M8.70369 9.82608C8.70369 9.01283 8.02515 8.77965 7.2911 8.6484L6.90203 8.58183C6.3267 8.48629 6.28231 8.34533 6.28231 8.15663C6.28231 7.91177 6.54354 7.76543 6.98114 7.76543C7.49936 7.76543 7.63214 7.98532 7.68723 8.15049L7.69248 8.16422C7.75766 8.30825 7.90911 8.39416 8.0981 8.39416C8.14703 8.39416 8.19102 8.38785 8.22392 8.38223C8.42673 8.34814 8.56798 8.21177 8.56798 8.05027C8.56798 8.01021 8.55941 7.97049 8.54215 7.93188C8.43823 7.64961 8.14622 7.20531 7.33711 7.10389V6.61979C7.33711 6.21658 6.58945 6.21658 6.58945 6.61979V7.10679C5.7203 7.22168 5.40024 7.72111 5.40024 8.15646C5.40024 8.94857 6.05327 9.1694 6.69115 9.28054L7.112 9.35605C7.71135 9.459 7.81699 9.59102 7.81699 9.83017C7.81699 10.1224 7.52448 10.2966 7.03411 10.2966C6.39754 10.2966 6.26778 10.0545 6.18101 9.7827C6.13025 9.63227 5.96932 9.53537 5.77085 9.53537C5.72756 9.53537 5.69285 9.54023 5.65098 9.54628L5.63837 9.54832C5.43314 9.58949 5.29541 9.72602 5.29541 9.88787C5.29541 9.91864 5.30187 9.9448 5.30711 9.96594L5.31357 9.99015C5.4059 10.2538 5.60971 10.8295 6.62627 10.9579V11.4646C6.62627 11.6663 6.81415 11.7719 7.00001 11.7719C7.18586 11.7719 7.37394 11.6663 7.37394 11.4646V10.9668C8.18114 10.878 8.7045 10.4424 8.7045 9.82617"
//                       fill="white"
//                     />
//                   </svg>
//                 </button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <PaySlip />
//     </div>
//   );
// };





'use client'

import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import PaySlip from "./PaySlip";
import { Payroll } from "@/types/types";

const tableHeadValues: string[] = [
  "Name", "ID", "HRA", "Allowance", "Bonus", "Special Allowance", "ESIC", "EPF", "LTA", "CTC", "Net Pay", "Pay Slip",
];

export const PayrollOverviewTable = ({ payrollData }: { payrollData: Payroll[] }) => {
  const [selectedPayroll, setSelectedPayroll] = useState<Payroll | null>(null);
  const [isPaySlipVisible, setIsPaySlipVisible] = useState<boolean>(false);

  const handleGeneratePaySlip = (payroll: Payroll) => {
    setSelectedPayroll(payroll);
    setIsPaySlipVisible(true);
  };

  const handleSlipSent = () => {
    setIsPaySlipVisible(false);
    setSelectedPayroll(null);
  };

  return (
    <div className="w-full rounded-md border">

      <Table className="w-full overflow-x-scroll">
        <TableHeader>
          <TableRow className="bg-black text-white hover:bg-black">
            {tableHeadValues.map((value, index) => (
              <TableHead key={index} className="whitespace-nowrap px-4 py-2 text-white">
                {value}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {payrollData.map((eachPayroll: Payroll) => (
            <TableRow key={eachPayroll.id}>
              <TableCell className="whitespace-nowrap px-4 py-2">
                {eachPayroll.employee.first_name} {eachPayroll.employee.last_name}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">{eachPayroll.employee.id}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">Rs {eachPayroll.hra}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">Rs {eachPayroll.allowances}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">Rs {eachPayroll.bonus || "0.00"}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">Rs {eachPayroll.special_allowance}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">Rs {eachPayroll.esi_contribution}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">Rs {eachPayroll.expense_reimbursement || "0.00"}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">Rs {eachPayroll.arrears_amount}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">Rs {eachPayroll.gross_salary}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">Rs {eachPayroll.in_hand_salary}</TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                <button
                  className="flex w-full cursor-pointer items-center gap-x-1 rounded-full border border-gray-300 bg-transparent px-2 py-1"
                  onClick={() => handleGeneratePaySlip(eachPayroll)}
                >
                  <span>Send</span>
                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <svg
                      width="14"
                      height="15"
                      viewBox="0 0 14 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.9485 5.4776V10.8242C11.9485 12.2219 10.8065 13.364 9.40874 13.364H4.59055C3.19283 13.364 2.05078 12.2219 2.05078 10.8242V5.4776C2.05078 4.50601 2.59624 3.65942 3.39737 3.23329C3.67578 3.08556 4.02237 3.28442 4.02237 3.60261C4.02237 4.50601 4.76101 5.24465 5.66442 5.24465H8.33487C9.23828 5.24465 9.97692 4.50601 9.97692 3.60261C9.97692 3.28442 10.3178 3.08556 10.6019 3.23329C11.4031 3.65942 11.9485 4.50601 11.9485 5.4776Z"
                        fill="#0A112F"
                      />
                      <path
                        d="M9.11924 3.06545L9.11923 3.06545V3.06818V3.60227C9.11923 4.03628 8.76915 4.38636 8.33514 4.38636H5.659C5.22499 4.38636 4.87491 4.03628 4.87491 3.60227V3.06818C4.87491 2.63613 5.22871 2.28409 5.66468 2.28409H8.33514C8.77167 2.28409 9.12337 2.63606 9.11924 3.06545Z"
                        fill="#0A112F"
                        stroke="#FAFAFA"
                        stroke-width="0.568182"
                      />
                      <path
                        d="M8.70369 9.82608C8.70369 9.01283 8.02515 8.77965 7.2911 8.6484L6.90203 8.58183C6.3267 8.48629 6.28231 8.34533 6.28231 8.15663C6.28231 7.91177 6.54354 7.76543 6.98114 7.76543C7.49936 7.76543 7.63214 7.98532 7.68723 8.15049L7.69248 8.16422C7.75766 8.30825 7.90911 8.39416 8.0981 8.39416C8.14703 8.39416 8.19102 8.38785 8.22392 8.38223C8.42673 8.34814 8.56798 8.21177 8.56798 8.05027C8.56798 8.01021 8.55941 7.97049 8.54215 7.93188C8.43823 7.64961 8.14622 7.20531 7.33711 7.10389V6.61979C7.33711 6.21658 6.58945 6.21658 6.58945 6.61979V7.10679C5.7203 7.22168 5.40024 7.72111 5.40024 8.15646C5.40024 8.94857 6.05327 9.1694 6.69115 9.28054L7.112 9.35605C7.71135 9.459 7.81699 9.59102 7.81699 9.83017C7.81699 10.1224 7.52448 10.2966 7.03411 10.2966C6.39754 10.2966 6.26778 10.0545 6.18101 9.7827C6.13025 9.63227 5.96932 9.53537 5.77085 9.53537C5.72756 9.53537 5.69285 9.54023 5.65098 9.54628L5.63837 9.54832C5.43314 9.58949 5.29541 9.72602 5.29541 9.88787C5.29541 9.91864 5.30187 9.9448 5.30711 9.96594L5.31357 9.99015C5.4059 10.2538 5.60971 10.8295 6.62627 10.9579V11.4646C6.62627 11.6663 6.81415 11.7719 7.00001 11.7719C7.18586 11.7719 7.37394 11.6663 7.37394 11.4646V10.9668C8.18114 10.878 8.7045 10.4424 8.7045 9.82617"
                        fill="white"
                      />
                    </svg>                  </svg>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>



      {isPaySlipVisible && selectedPayroll && (
        <PaySlip payrollData={selectedPayroll} onSlipSent={handleSlipSent} />
      )}
    </div>
  );
};
