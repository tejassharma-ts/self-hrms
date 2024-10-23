import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bonusTableHead } from "@/app/(dashboard)/my-team/constants";
import { Bonuses } from "@/types/types";

export const BonusTable = ({ bonuses }: { bonuses: Bonuses }) => {
  return (
    <div className="w-full rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {bonusTableHead.map((eachBonusRow, index) => (
              <TableHead key={index}>{eachBonusRow}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bonuses.bonuses.map((bonus, index) => (
            <TableRow key={index}>
              <TableCell className="whitespace-nowrap">{bonus.employee}</TableCell>
              <TableCell className="whitespace-nowrap">
                {Array.isArray(bonus.bonus_types)
                  ? bonus.bonus_types
                      .map((type) =>
                        typeof type === "object" && type !== null
                          ? type.name || JSON.stringify(type)
                          : type,
                      )
                      .join(", ")
                  : "N/A"}
              </TableCell>
              <TableCell className="whitespace-nowrap">{bonus.amount}</TableCell>
              <TableCell className="whitespace-nowrap">{bonus.reason}</TableCell>
              <TableCell className="whitespace-nowrap">{bonus.date_awarded}</TableCell>
              <TableCell className="whitespace-nowrap">{bonus.company}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
