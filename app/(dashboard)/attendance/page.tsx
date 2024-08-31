'use client'
import React, { useEffect, useState } from 'react'
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

const page = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)

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


    return (
        <div className='px-5 space-y-6' >
            <ProfileCarousel profiles={profiles} selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile} />
            {selectedProfile ?
                <div className='flex flex-row gap-10' >
                    <AttendanceDashboard />
                    <ProjectTimeline />
                </div>
                :
                <AttendanceList />
            }
        </div>
    )
}

export default page