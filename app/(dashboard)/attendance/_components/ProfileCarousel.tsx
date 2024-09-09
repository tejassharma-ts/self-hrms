'use client'
import React, { useState, useMemo } from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CircularProgressBarProps {
    percentage: number;
    label: string;
}


interface ProfileCarouselProps {
    profiles: Profile[];
    selectedProfile: Profile | null;
    setSelectedProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage, label }) => {
    return (
        <div className="w-16 h-16 flex flex-col items-center justify-center">
            <div className="w-14 h-14">
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        textSize: '14px',
                        pathColor: '#0A0B0A',
                        textColor: '#0A0B0A',
                        trailColor: '#e5e7eb',
                    })}
                    strokeWidth={10}
                />
            </div>
            <div className="text-[9px] text-[#0A0B0A] font-bold mt-1">{label}</div>
        </div>
    );
};

interface ProfileCardProps extends Profile {
    isSelected: boolean;
    onClick: () => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, department, monthlyPercentage, yearlyPercentage, profile_picture, isSelected, onClick }) => {
    return (
        <Card
            className={`w-48 shadow-lg rounded-lg overflow-hidden mx-1 cursor-pointer ${isSelected ? 'bg-[#2B2928] text-white' : 'bg-white text-black'}`}
            onClick={onClick}
        >
            <CardHeader className="flex flex-col items-center p-3">
                <Avatar className="w-14 h-14">
                    <AvatarImage src={profile_picture || ''} alt={name} />
                    <AvatarFallback>{name ? name.split(' ').map(n => n.charAt(0)).join('') : ''}</AvatarFallback>
                </Avatar>
                <h2 className="mt-1 text-sm font-semibold">{name}</h2>
                <p className="text-[10px] text-gray-500">{department}</p>
            </CardHeader>
            <CardContent className="p-3">
                <div className="flex justify-between">
                    <CircularProgressBar percentage={monthlyPercentage} label="Monthly" />
                    <CircularProgressBar percentage={yearlyPercentage} label="Yearly" />
                </div>
            </CardContent>
            <CardFooter className="p-3 flex justify-center items-center">
                <button className={`px-4 py-2 rounded-full hover:bg-gray-700 text-xs ${isSelected ? 'bg-[#5A5555]' : 'bg-black text-white'}`}>
                    CHECKED IN
                </button>
            </CardFooter>
        </Card>
    );
};

const ProfileCarousel: React.FC<ProfileCarouselProps> = ({ profiles, selectedProfile, setSelectedProfile }) => {
    const [filter, setFilter] = useState('all');
    const [department, setDepartment] = useState('all');
    const [api, setApi] = React.useState<CarouselApi>();

    const { filteredProfiles, uniqueDepartments } = useMemo(() => {
        const filtered = profiles.filter(profile => 
            (filter === 'all' || profile.department === filter) &&
            (department === 'all' || profile.department === department)
        );
        const departments = Array.from(new Set(profiles.map(p => p.department)));
        return { filteredProfiles: filtered, uniqueDepartments: departments };
    }, [profiles, filter, department]);

    if (!profiles || profiles.length === 0) {
        return (
            <div className="text-center p-4">
                <p>No profiles available.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto">
            <div className="flex gap-4 mb-4">
                <Select onValueChange={setFilter}>
                    <SelectTrigger className="rounded-full bg-black text-white w-fit gap-2">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        {uniqueDepartments.map(dept => (
                            <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="relative">
                <Carousel className="w-full" setApi={setApi}>
                    <CarouselContent>
                        {filteredProfiles.map((profile, index) => (
                            <CarouselItem key={index} className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                                <ProfileCard
                                    {...profile}
                                    isSelected={selectedProfile?.id === profile.id}
                                    onClick={() => setSelectedProfile(profile)}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute top-1/2 bottom-1/2 left-0 right-0 flex justify-between items-center px-4 -mt-8 pointer-events-none">
                        <CarouselPrevious className="relative left-0 pointer-events-auto" />
                        <CarouselNext className="relative right-0 pointer-events-auto" />
                    </div>
                </Carousel>
            </div>
        </div>
    );
};

export default ProfileCarousel;
