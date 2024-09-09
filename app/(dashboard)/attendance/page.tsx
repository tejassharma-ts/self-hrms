'use client'
import React, { useEffect, useState } from 'react'
import ProfileCarousel from './_components/ProfileCarousel'
import AttendanceList from './_components/AttendanceList'
import ProjectTimeline from './_components/ProjectTimeline';
import AttendanceDashboard from './_components/AttendanceDashboard';
import { api } from '@/api/api';

interface Project {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    status: string;
}

interface Attendance {
    date: string;
    check_in_time: string | null;
    check_out_time: string | null;
    status: string;
}

interface Profile {
    id: string;
    name: string;
    monthlyPercentage: number;
    yearlyPercentage: number;
    profile_picture: string;
    department: string;
}

const Page = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const currentDate = new Date();
                const response = await api.get('/api/companies-app/attendance-percentage/', {
                    params: {
                        month: currentDate.getMonth() + 1,
                        year: currentDate.getFullYear(),
                    }
                });
                
                const fetchedProfiles = response.data.employee_stats.map((employee: any) => ({
                    id: employee.id,
                    name: employee.name,
                    monthlyPercentage: employee.monthly_percentage,
                    yearlyPercentage: employee.yearly_percentage,
                    profile_picture: employee.profile_picture,
                    department: employee.department,
                }));
                
                setProfiles(fetchedProfiles);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching profiles:', error);
                setError('Failed to fetch profiles. Please try again later.');
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    useEffect(() => {
        if (selectedProfile) {
            const fetchAttendance = async () => {
                try {
                    const currentDate = new Date();
                    const formattedDate = currentDate.toISOString().split('T')[0]; // This gives YYYY-MM-DD
                    
                    const response = await api.get('/api/companies-app/employee/attendance/', {
                        params: {
                            employee_id: selectedProfile.id,
                            date: formattedDate,
                        },
                    });
                    const formattedAttendance = response.data.attendances.map((attendance: any) => ({
                        date: attendance.date,
                        check_in_time: attendance.check_in_time,
                        check_out_time: attendance.check_out_time,
                        status: attendance.status,
                    }));
                    setAttendanceData(formattedAttendance);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching attendance:', error);
                    setError('Failed to fetch attendance. Please try again later.');
                    setLoading(false);
                }
            };

            fetchAttendance();
        }
    }, [selectedProfile]);

    return (
        <div className='px-5 space-y-6'>
            <ProfileCarousel profiles={profiles} selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile} />
            {selectedProfile ?
                <div className='flex flex-row gap-10'>
                    <AttendanceDashboard employee={selectedProfile} attendances={attendanceData} />
                    <ProjectTimeline />
                </div>
                :
                loading ? (
                    <div>Loading attendance data...</div>
                ) 
                    :<AttendanceList />
            }
        </div>
    )
}

export default Page;