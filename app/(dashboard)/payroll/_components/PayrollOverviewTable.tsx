"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiCaller } from "@/lib/auth";
import { Payroll } from "@/types/types";
import { toast } from "@/hooks/use-toast";
import { Document, Page, Text, StyleSheet, View, pdf } from "@react-pdf/renderer";
import { formatDate } from "date-fns";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/Icons";
import { formatCurrency } from "@/lib/utils";

const tableHeadValues: string[] = [
  "Name",
  "ID",
  "HRA",
  "Allowance",
  "Bonus",
  "Special Allowance",
  "ESIC",
  "EPF",
  "LTA",
  "CTC",
  "Net Pay",
  "Pay Slip",
];

const styles = StyleSheet.create({
  container: {
    margin: "auto",
    padding: 10,
    maxWidth: "210mm",
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  companyInfo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  textGray: {
    color: "#808080",
  },
  boldText: {
    fontWeight: "bold",
  },
  employeeSummary: {
    marginTop: 20,
  },
  table: {
    table: "table",
    width: "auto",
    borderCollapse: "collapse",
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    padding: 8,
    border: "1px solid #000",
  },
  tableHeader: {
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export const PayrollOverviewTable = ({ payrollData }: { payrollData: Payroll[] }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleGeneratePaySlip = async (payroll: Payroll) => {
    setIsLoading(true);
    let pdfBlob;
    try {
      pdfBlob = await pdf(<MyDoc selectedPayroll={payroll} />).toBlob();
    } catch (err) {
      toast({
        description: "Something went very wrong while creating pdf",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("employee", payroll.employee.id);
    formData.append("pay_date", formatDate(new Date(), "dd-MM-yyyy"));
    formData.append("salary_structure", payroll.salary_structure);
    formData.append("slip_sent_status", "true");
    formData.append("slip", pdfBlob, "payroll-slip.pdf");

    try {
      await apiCaller.post("api/payroll_app/create-salary-slip/", formData);
      toast({
        title: "Success",
        description: "Payslip sent successfully.",
        variant: "default",
      });
      router.refresh();
    } catch (err) {
      toast({
        description: "Something went very wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-md border">
      <Table className="w-full overflow-x-scroll">
        <TableHeader>
          <TableRow className="bg-black text-white hover:bg-black">
            {tableHeadValues.map((value, index) => (
              <TableHead key={index} className="whitespace-nowrap px-4 py-2 text-white">
                {value === "Special Allowance" ? "Other Allowance" : value}
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
              <TableCell className="whitespace-nowrap px-4 py-2">
                {eachPayroll.employee.id}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                {" "}
                {formatCurrency(parseInt(eachPayroll?.hra)) || "N/A"}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                {formatCurrency(parseInt(eachPayroll?.allowances)) || "N/A"}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                {formatCurrency(eachPayroll?.bonus) || "N/A"}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                {formatCurrency(parseInt(eachPayroll?.special_allowance)) || "N/A"}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                {formatCurrency(parseInt(eachPayroll?.esi_contribution)) || "N/A"}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                {formatCurrency(parseInt(eachPayroll?.expense_reimbursement)) || "N/A"}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                {formatCurrency(parseInt(eachPayroll?.arrears_amount)) || "N/A"}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                {formatCurrency(parseInt(eachPayroll?.gross_salary)) || "N/A"}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                {formatCurrency(parseInt(eachPayroll?.in_hand_salary)) || "N/A"}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-2">
                <Button
                  variant="ghost"
                  disabled={eachPayroll.slip_sent_status}
                  onClick={() => handleGeneratePaySlip(eachPayroll)}>
                  {eachPayroll.slip_sent_status ? (
                    <span>Sent</span>
                  ) : (
                    <>
                      {isLoading && <Icons.loader />}
                      Send
                    </>
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

function MyDoc({ selectedPayroll }: { selectedPayroll: Payroll }) {
  return (
    <Document>
      <Page size="A4" style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.companyInfo}>Company Name</Text>
            <Text style={styles.textGray}>Address, City, State</Text>
          </View>
          <View>
            <Text style={[styles.textGray, { fontSize: 12 }]}>PaySlip for the month</Text>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{selectedPayroll.pay_date}</Text>
          </View>
        </View>

        <View style={styles.employeeSummary}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Employee Pay Summary</Text>
          <Text>
            <Text style={styles.boldText}>Name: </Text>
            {selectedPayroll.employee.first_name} {selectedPayroll.employee.last_name}
          </Text>
          <Text>
            <Text style={styles.boldText}>Employee ID: </Text>
            {selectedPayroll.employee.id}
          </Text>
          <Text>
            <Text style={styles.boldText}>Department: </Text>
            {selectedPayroll.employee.department}
          </Text>
          <Text>
            <Text style={styles.boldText}>Position: </Text>
            {selectedPayroll.employee.position}
          </Text>
          <Text>
            <Text style={styles.boldText}>Pay Date: </Text>
            {selectedPayroll.pay_date}
          </Text>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", textAlign: "center" }}>
            Rs {selectedPayroll.in_hand_salary}
          </Text>
          <Text style={styles.textGray}>Employee Net Pay</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
            <Text>Paid Days: {selectedPayroll.days_worked}</Text>
            <Text>LOP Days: 0</Text>
          </View>
        </View>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.tableHeader]}>Earnings</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Amount</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Deductions</Text>
            <Text style={[styles.tableCell, styles.tableHeader]}>Amount</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Basic Salary</Text>
            <Text style={styles.tableCell}>Rs {selectedPayroll.basic_salary}</Text>
            <Text style={styles.tableCell}>EPF Contribution</Text>
            <Text style={styles.tableCell}>Rs {selectedPayroll.pf_contribution}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>HRA</Text>
            <Text style={styles.tableCell}>Rs {selectedPayroll.hra}</Text>
            <Text style={styles.tableCell}>Insurance</Text>
            <Text style={styles.tableCell}>Rs -</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Special Allowance</Text>
            <Text style={styles.tableCell}>Rs {selectedPayroll.special_allowance}</Text>
            <Text style={styles.tableCell}>TDS</Text>
            <Text style={styles.tableCell}>Rs -</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Conveyance</Text>
            <Text style={styles.tableCell}>Rs {selectedPayroll.conveyance}</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Bonus / Reimbursements</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Arrears</Text>
              <Text style={styles.tableCell}>Rs {selectedPayroll.arrears_amount}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Expense Reimbursement</Text>
              <Text style={styles.tableCell}>Rs {selectedPayroll.expense_reimbursement}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
