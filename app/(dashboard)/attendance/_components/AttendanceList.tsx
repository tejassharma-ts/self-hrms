import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { apiCaller } from '@/lib/auth';

interface AttendanceData {
  employees: {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    position: string,
    status: string,
    check_in_time: string | null,
    check_out_time: string | null,
    department: string,
    profile_picture: string,
  }[],
  total_employee: number;
}


const AttendanceList: React.FC = () => {
    const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await apiCaller.get<AttendanceData>('/api/companies-app/company/attendance/status/');
                setAttendanceData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching attendance data:', error);
                setError('Failed to fetch attendance data. Please try again later.');
                setLoading(false);
            }
        };

        fetchAttendanceData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Attendance List</h1>
            <p className="text-sm text-gray-500 mb-4">Date- {new Date().toLocaleDateString()}</p>
            
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-gray-400">Employee ID</TableHead>
                        <TableHead className="text-gray-400">Name</TableHead>
                        <TableHead className="text-gray-400">Department</TableHead>
                        <TableHead className="text-gray-400">Log In Time</TableHead>
                        <TableHead className="text-gray-400">Log Out Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {attendanceData?.employees.map(employee => (
                        <TableRow key={employee.id}>
                            <TableCell>{employee.id}</TableCell>
                            <TableCell>{`${employee.first_name} ${employee.last_name}`}</TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell className="text-green-500">{employee.check_in_time || '-'}</TableCell>
                            <TableCell className="text-red-500">{employee.check_out_time || '-'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </div>
    );
};

export default AttendanceList;
