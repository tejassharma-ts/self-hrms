"use client";
import React, { useState, useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/Icons";
import { Input } from "postcss";
import { InputOTP } from "@/components/ui/input-otp";

interface CircularProgressBarProps {
  percentage: number;
  label: string;
}

interface ProfileCarouselProps {
  profiles: any;
  selectedProfile: any;
  setSelectedProfile: any;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ percentage, label }) => {
  return (
    <div className="flex h-16 w-16 flex-col items-center justify-center">
      <div className="h-14 w-14">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            textSize: "14px",
            pathColor: "#0A0B0A",
            textColor: "#0A0B0A",
            trailColor: "#e5e7eb",
          })}
          strokeWidth={10}
        />
      </div>
      <div className="mt-1 text-[9px] font-bold text-[#0A0B0A]">{label}</div>
    </div>
  );
};

interface ProfileCardProps {
  name: any;
  department: any;
  monthly_percentage: any;
  yearly_percentage: any;
  profile_picture: any;
  isSelected: any;
  onClick: any;
  today_status: any;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  name,
  department,
  monthly_percentage,
  yearly_percentage,
  profile_picture,
  isSelected,
  onClick,
  today_status,
}) => {
  return (
    <Card
      className={`mx-1  w-52 cursor-pointer overflow-hidden rounded-lg shadow-sm ${isSelected ? "bg-gradient-to-b from-[#1A1A1A] to-[#000000ab] text-white" : "bg-white text-black"}`}
      onClick={onClick}>
      <CardHeader className="flex flex-col items-center p-3">
        <Avatar className="h-14 w-14">
          <AvatarImage src={profile_picture || ""} alt={name} />
          <AvatarFallback>
            {name
              ? name
                .split(" ")
                .map((n: string) => n.charAt(0))
                .join("")
              : ""}
          </AvatarFallback>
        </Avatar>
        <h2 className="mt-1 text-sm font-semibold">{name}</h2>
        <p className="text-[10px] text-gray-500">{department}</p>
      </CardHeader>
      <CardContent className="p-3">
        <div className="flex justify-between">
          <CircularProgressBar percentage={monthly_percentage} label="Monthly" />
          <CircularProgressBar percentage={yearly_percentage} label="Yearly" />
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center p-3">
        <button
          className={`rounded-full px-4 py-2 text-xs hover:bg-gray-700 ${isSelected ? "bg-[#5A5555]" : "bg-gradient-to-b from-[#1A1A1A] to-[#000000ab] text-white"}`}>
          {today_status}
        </button>
      </CardFooter>
    </Card>
  );
};

const ProfileCarousel: React.FC<ProfileCarouselProps> = ({
  profiles,
  selectedProfile,
  setSelectedProfile,
}) => {
  const [filter, setFilter] = useState("all");
  const [department, setDepartment] = useState("all");

  const { filteredProfiles, uniqueDepartments } = useMemo(() => {
    const filtered = profiles.filter(
      (profile: any) =>
        (filter === "all" || profile.department === filter) &&
        (department === "all" || profile.department === department),
    );
    const departments = Array.from(new Set(profiles.map((p: any) => p.department)));
    return { filteredProfiles: filtered, uniqueDepartments: departments };
  }, [profiles, filter, department]);

  if (!profiles || profiles.length === 0) {
    return (
      <div className="p-4 text-center">
        <p>No profiles available.</p>
      </div>
    );
  }

  function onSelectProfile(profile: any) {
    if (selectedProfile && selectedProfile.id === profile.id) {
      return setSelectedProfile(null);
    }
    setSelectedProfile(profile);
  }



  // for  ssearch button
  const [open, setOpen] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
  };
  return (
    <div className="">
      <div className="mb-4 flex gap-4">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-fit gap-2 rounded-full bg-black text-white">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {uniqueDepartments?.map((dept: any) => (
              <SelectItem key={dept} value={dept}>
                {dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="hidden lg:flex flex-row gap-5 bg-white rounded-full">
          <div className="flex items-center">
            {!isSearchActive ? (
              <div
                className="h-10 w-10 bg-yell bg-yell-hover rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
                onClick={handleSearchClick}
              >
                <Icons.Search className="text-[#3E100B] size-4" />
              </div>
            ) : (
              <div className="flex items-center transition-all duration-300 ease-in-out border rounded-full h-10 w-60 px-4">
                <Icons.Search className="text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="ml-2 h-full w-full text-gray-400 text-sm outline-none border-none placeholder:text-gray-400"
                  style={{
                    opacity: isSearchActive ? 1 : 0,
                  }}
                />
                <Icons.close
                  className="text-gray-400 h-5 w-5 ml-3 cursor-pointer"
                  onClick={handleSearchClick}
                />
              </div>
            )}
          </div>
        </div>



      </div>
      <div className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {filteredProfiles.map((profile: any, index: number) => (
              <CarouselItem key={index} className="sm:basis-1/3 md:basis-1/4 lg:basis-1/5">
                <ProfileCard
                  {...profile}
                  isSelected={selectedProfile?.id === profile.id}
                  onClick={() => onSelectProfile(profile)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="pointer-events-none absolute bottom-1/2 left-0 right-0 top-1/2 -mt-8 flex items-center justify-between px-4">
            <CarouselPrevious className="pointer-events-auto relative left-0" />
            <CarouselNext className="pointer-events-auto relative right-0" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default ProfileCarousel;
