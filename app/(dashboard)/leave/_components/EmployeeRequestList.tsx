import React from 'react';

const EmployeeRequestList = () => {
  const rows = 11; // Number of rows in the list

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee request List 20</h1>
        <div className="space-x-2">
          <button className="bg-[#666666] text-white px-4 py-2 rounded-lg">Select Date</button>
          <button className="bg-[#666666] text-white px-4 py-2 rounded-lg">New Leave Request</button>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2 mb-5">
        {['Name', 'Employee ID', 'Department', 'Leave Type', 'Number of Days', 'Reason of Leave'].map((header) => (
          <div key={header} className="bg-[#C8C8C8] rounded-lg px-2 py-1.5 font-semibold text-center">
            {header}
          </div>
        ))}
      </div>


      {[...Array(rows)].map((_, index) => (
        <div key={index} className="grid grid-cols-6 gap-2 mb-5">
          {[...Array(5)].map((_, cellIndex) => (
            <input
              key={cellIndex}
              type="text"
              className="border rounded-sm border-gray-300 p-1 w-full"
            />
          ))}
          <div className="relative">
            <input
              type="text"
              className="border rounded-sm border-gray-300 p-1 w-full"
              placeholder="Reason"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 px-2 rounded">
              ≡
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeRequestList;