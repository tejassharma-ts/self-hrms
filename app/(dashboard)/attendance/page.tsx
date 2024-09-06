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

const Page = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [attendanceData, setAttendanceData] = useState<AttendanceData | null>(null);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await api.get('/api/companies-app/attendance-percentage/', {
                    params: {
                        month: 9,
                        year: 2024,
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
        const fetchProjects = async () => {
            try {
                const response = await api.get('/api/project_management/projects-of-employee/', {
                    params: {
                        employee_id: 'f0d7f832-84a5-4163-b554-5052e6e0927e',
                        month: 8,
                        year: 2024,
                    },
                });
                setProjects(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching projects:', error);
                setError('Failed to fetch projects. Please try again later.');
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className='px-5 space-y-6'>
            <ProfileCarousel profiles={profiles} selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile} />
            {selectedProfile ?
                <div className='flex flex-row gap-10'>
                    <AttendanceDashboard />
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
