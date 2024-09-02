'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProfileCarousel from './_components/ProfileCarousel'
import AttendanceList from './_components/AttendanceList'
import ProjectTimeline from './_components/ProjectTimeline';
import AttendanceDashboard from './_components/AttendanceDashboard';

interface Profile {
    name: string;
    role: string;
    monthlyPercentage: number;
    yearlyPercentage: number;
    image: string;
    department: string;
}

interface Employee {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  profile_picture: string;
}

interface AttendanceData {
  present_employees: Employee[];
  not_yet_marked_employees: Employee[];
  absent_employees: Employee[];
  present_count: number;
  not_yet_marked_count: number;
  absent_count: number;
  total_employee: number;
  status: number;
}

const Page = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('https://randomuser.me/api/?results=10');
                const data = await response.json();
                const fetchedProfiles = data.results.map((user: any, index: number) => ({
                    name: `${user.name.first} ${user.name.last}`,
                    role: ['Design', 'Development', 'Marketing', 'Sales', 'HR'][index % 5],
                    monthlyPercentage: Math.floor(Math.random() * 31) + 70, // 70-100
                    yearlyPercentage: Math.floor(Math.random() * 21) + 80, // 80-100
                    image: user.picture.large
                }));
                setProfiles(fetchedProfiles);
            } catch (error) {
                console.error('Error fetching profiles:', error);
                setProfiles([]);
            }
        };

        fetchProfiles();
    }, []);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get<AttendanceData>('api/companies-app/company/attendance/');
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

    return (
        <div className='px-5 space-y-6' >
            <ProfileCarousel profiles={profiles} selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile} />
            {selectedProfile ?
                <div className='flex flex-row gap-10' >
                    <AttendanceDashboard />
                    <ProjectTimeline/>
                </div>
                :
                loading ? (
                    <div>Loading attendance data...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : attendanceData ? (
                    <AttendanceList attendanceData={attendanceData} />
                ) : (
                    <div>No attendance data available.</div>
                )
            }
        </div>
    )
}

export default Page