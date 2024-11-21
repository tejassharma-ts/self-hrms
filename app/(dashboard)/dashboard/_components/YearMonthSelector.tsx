"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function YearMonthSelector({
  selectedYear,
  selectedMonth,
  setSelectedMonth,
  setSelectedYear,
}: {
  selectedYear: any;
  selectedMonth: any;
  setSelectedYear: any;
  setSelectedMonth: any;
}) {
  const currentDate = new Date();

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  return (
    <div className="flex gap-4">
      <Select
        value={selectedYear.toString()}
        onValueChange={(value) => setSelectedYear(Number(value))}>
        <SelectTrigger className="order-1 border-none text-black font-semibold text-[0.9rem] px-0">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedMonth.toString()}
        onValueChange={(value) => setSelectedMonth(Number(value))}>
        <SelectTrigger className="border-none text-black font-semibold text-[0.9rem] px-0">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem key={month.value} value={month.value.toString()}>
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
