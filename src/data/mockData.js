export const initialEmployees = [
    { id: "AD001", name: 'Rahul Sharma', department: 'IT', role: "Admin" },
    { id: "HR002", name: 'Ravi Kumar', department: 'HR', role: "HR" },
    { id: "EMP003", name: 'Rohit Gupta', department: 'Development', role: "Employee", salary: 6000, nfc: "NFC003" },
    { id: "EMP004", name: 'Priya Singh', department: 'Marketing', role: "Employee", salary: 15000, nfc: "NFC004" },
    { id: "EMP005", name: 'Amit Patel', department: 'Sales', role: "Employee", salary: 12000, nfc: "NFC005" },
    { id: "EMP006", name: 'Sneha Reddy', department: 'Design', role: "Employee", salary: 10000, nfc: "NFC006" },
];



// Helper to generate a range of attendance records
const generateAttendance = (empId, daysPresent) => {
    const records = [];
    const today = new Date();
    // Start from yesterday to leave today clear
    for (let i = 1; i <= daysPresent; i++) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        // Use YYYY-MM-DD format for consistent parsing
        records.push({
            id: `${empId}-${i}`,
            empId: empId,
            date: d.toISOString().split('T')[0],
            checkIn: "09:00:00 AM",
            checkOut: "06:00:00 PM",
            status: "Present"
        });
    }
    return records;
};

export const initialAttendanceHistory = [
    ...generateAttendance("EMP003", 7), // 7 Days Present
    ...generateAttendance("EMP004", 5), // 5 Days Present
    ...generateAttendance("EMP005", 15), // 15 Days Present
    ...generateAttendance("EMP006", 11), // 11 Days Present
];

export const initialTasks = [
    { id: 1, title: "Update Navbar Logic", assignedTo: "EMP003", assignedBy: "EMP001", status: "Open", dueDate: "2025-12-20" },
    { id: 2, title: "Review Payroll Specs", assignedTo: "EMP002", assignedBy: "EMP001", status: "In Progress", dueDate: "2025-12-22" }
];

export const initialPayrolls = [];
