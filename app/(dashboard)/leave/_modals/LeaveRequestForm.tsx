import React, { useState } from 'react';

const LeaveRequestForm = () => {
  const [leaveReason, setLeaveReason] = useState('');

  const handleSubmit = (action: 'APPROVE' | 'DENY') => {
    // Handle form submission
    console.log(`Leave request ${action.toLowerCase()}d with reason: ${leaveReason}`);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">Name</h2>
            <p className="text-gray-600">Department</p>
          </div>
          <div className="flex items-center">
            <span className="mr-2">sahil@1234</span>
            <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
              <img src="/api/placeholder/40/40" alt="User" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-2">Leave Reason</h3>
        <textarea
          className="w-full h-32 p-2 border border-gray-300 rounded-md resize-none mb-4"
          value={leaveReason}
          onChange={(e) => setLeaveReason(e.target.value)}
          placeholder="Enter your leave reason here..."
        />
        
        <div className="flex justify-between">
          <button
            onClick={() => handleSubmit('DENY')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            DENY
          </button>
          <button
            onClick={() => handleSubmit('APPROVE')}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            APPROVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestForm;