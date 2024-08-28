import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const employees = [
  {
    name: "Esthera Jackson",
    role: "Designer",
    duration: "4 days",
    leaveType: "Sick Leave",
    leaveEnd: "14/06/21",
    time: "Full Day",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "John Doe",
    role: "Developer",
    duration: "2 days",
    leaveType: "Vacation",
    leaveEnd: "12/06/21",
    time: "Half Day",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Jane Smith",
    role: "Project Manager",
    duration: "3 days",
    leaveType: "Personal Leave",
    leaveEnd: "16/06/21",
    time: "Full Day",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Michael Brown",
    role: "QA Engineer",
    duration: "1 day",
    leaveType: "Sick Leave",
    leaveEnd: "11/06/21",
    time: "Full Day",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  // Add more employee data here if needed
];

export default function EmployeesOnLeave() {
  return (
    <div className="p-6 h-[300px] bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Employees On Leave</h2>
        <a href="#" className="text-sm text-black">
          View more
        </a>
      </div>
      <div className="overflow-x-auto">
        <div className="max-h-56 overflow-y-auto">
          <table className="min-w-full bg-white">
            <thead className="sticky z-50 top-0 bg-white">
              <tr>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Name</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Duration</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Leave Type</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Leave End</th>
                <th className="py-2 px-4 text-left text-sm font-medium text-gray-500">Time</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4 flex items-center">
                    <Avatar className="mr-2">
                      <AvatarImage src={employee.avatar} alt={`${employee.name} Avatar`} />
                      <AvatarFallback>{employee.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.role}</div>
                    </div>
                  </td>
                  <td className="py-2 px-4 text-sm text-gray-900">{employee.duration}</td>
                  <td className="py-2 px-4 text-sm text-gray-900">{employee.leaveType}</td>
                  <td className="py-2 px-4 text-sm text-gray-900">{employee.leaveEnd}</td>
                  <td className="py-2 px-4 text-sm text-gray-900">{employee.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
