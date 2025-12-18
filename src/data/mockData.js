
export const initialEmployees = [
    { id: "EMP001", name: 'Rahul Sharma', department: 'IT', role: "Admin", salary: 10000, nfc: "EMP001" },
    { id: "EMP002", name: 'Ravi Kumar', department: 'IT', role: "HR", salary: 70000, nfc: "EMP002" },
    { id: "EMP003", name: 'Rohit Gupta', department: 'IT', role: "Employee", salary: 60000, nfc: "EMP003" },
];

export const initialAttendanceHistory = [
    { id: 1, empId: "EMP003", date: new Date().toLocaleDateString(), checkIn: "09:00 AM", checkOut: null, status: "Present" } // Mock today's entry
];

export const initialTasks = [
    { id: 1, title: "Update Navbar Logic", assignedTo: "EMP003", assignedBy: "EMP001", status: "Open", dueDate: "2025-12-20" },
    { id: 2, title: "Review Payroll Specs", assignedTo: "EMP002", assignedBy: "EMP001", status: "In Progress", dueDate: "2025-12-22" }
];

export const initialPayrolls = [];
