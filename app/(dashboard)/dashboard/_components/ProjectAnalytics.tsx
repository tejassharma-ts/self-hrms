import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import BarChartComponent from './BarChartComponent';
import AddNewProject from '../_modals/AddNewProject';

const ProjectAnalytics = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <Card className="w-full h-[407px] max-w-3xl">
        <CardContent className="p-6">
          <BarChartComponent />
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" className="w-fit px-8 rounded-full text-sm" onClick={toggleModal}>
            <PlusCircle className="mr-2 h-3 w-3" />
            Add new Event
          </Button>
        </CardFooter>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={toggleModal}
            >
              <X className="h-5 w-5" />
            </button>
            <AddNewProject />
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectAnalytics;
