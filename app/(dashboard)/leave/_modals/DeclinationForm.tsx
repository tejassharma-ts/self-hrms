import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-day-picker';

interface DeclinationFormProps {
  onDecline: (reason: string) => void;
}

const DeclinationForm: React.FC<DeclinationFormProps> = ({ onDecline }) => {
  const [reason, setReason] = useState('');

  const handleDecline = async() => {
    try {
        const response = await axios.post("/api/companies-app/leave/approve/", {
          leave_ids: 'leaveIds',
          status: "Rejected",
          rejection_reason:reason
        });
  
        alert("Leave approved successfully!");
      } catch (error) {
        console.error("Error approving leave:", error);
        alert("Failed to approve leave.");
      }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">
          Add Reason for Declination
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            Add Reason for Richard:
          </label>
          <Textarea
            id="reason"
            name="reason"
            rows={4}
            value={reason}
            onChange={(e:any) => setReason(e.target.value)}
            placeholder="Enter your reason here..."
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          onClick={handleDecline}
          disabled={reason.trim() === ''}
        >
          Send Declination
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DeclinationForm;
