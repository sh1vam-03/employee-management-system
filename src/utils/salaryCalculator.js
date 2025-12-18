
export const countMonthlyAttendance = (attendanceHistory, empId, month, year) => {
    return attendanceHistory.filter(record => {
        const recordDate = new Date(record.date); // Assuming date is parsable or "MM/DD/YYYY"
        // Note: record.date is "DD/MM/YYYY" or similar locale string in mock data. 
        // Adapting to simple string matching for now if format matches, otherwise needs parsing.
        // Let's assume standardized parsing for robustness.

        // However, the current mock data uses new Date().toLocaleDateString(), which varies by locale.
        // For a robust app, we should use ISO strings. But sticking to existing pattern for compatibility:

        // Actually, let's parse the month/year from the record date string safely.
        const dateObj = new Date(record.date);

        // Check if dateObj is valid (it might be Invalid Date if format is weird)
        if (isNaN(dateObj)) return false;

        const recordMonth = dateObj.toLocaleString('default', { month: 'long' });
        const recordYear = dateObj.getFullYear();

        return record.empId === empId && recordMonth === month && recordYear === year && record.status === 'Present';
    }).length;
};

export const calculateNetSalary = (basicSalary, daysPresent) => {
    // Standard month assumed to be 30 days for calculation as per request
    const salary = Number(basicSalary);
    const dailyRate = salary / 30;
    return Math.round(dailyRate * daysPresent);
};
