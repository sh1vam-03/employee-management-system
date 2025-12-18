import { createContext, useContext, useState, useEffect } from 'react';
import { initialAttendanceHistory } from '../data/mockData';
import { useAuth } from './AuthContext';

export const AttendanceContext = createContext();

export function useAttendance() {
    return useContext(AttendanceContext);
}

export function AttendanceProvider({ children }) {
    const { currentUser } = useAuth();
    const [attendanceHistory, setAttendanceHistory] = useState(initialAttendanceHistory);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = () => {
            try {
                const stored = localStorage.getItem('attendanceHistory');
                if (stored) setAttendanceHistory(JSON.parse(stored));
            } catch (e) {
                console.error("Attendance load failed", e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    useEffect(() => {
        if (!loading) localStorage.setItem('attendanceHistory', JSON.stringify(attendanceHistory));
    }, [attendanceHistory, loading]);

    const markAttendance = (status) => {
        if (!currentUser) return;
        const timestamp = new Date().toLocaleTimeString();
        const today = new Date().toLocaleDateString();

        const todayRecord = attendanceHistory.find(r => r.empId === currentUser.id && r.date === today);

        if (status === 'Check In') {
            if (todayRecord && !todayRecord.checkOut) {
                alert('You are already checked in for today!');
                return;
            }
            if (todayRecord && todayRecord.checkOut) {
                alert('You have already completed your shift for today!');
                return;
            }

            setAttendanceHistory(prev => [
                ...prev,
                { id: Date.now(), empId: currentUser.id, date: today, checkIn: timestamp, checkOut: null, status: 'Present' }
            ]);
            alert(`Successfully Checked In at ${timestamp}`);

        } else if (status === 'Check Out') {
            if (!todayRecord || todayRecord.checkOut) {
                alert('You must Check In first!');
                return;
            }

            setAttendanceHistory(prev =>
                prev.map(record =>
                    (record.empId === currentUser.id && record.date === today && !record.checkOut)
                        ? { ...record, checkOut: timestamp }
                        : record
                )
            );
            alert(`Successfully Checked Out at ${timestamp}`);
        }
    };

    const getTodayStatus = () => {
        if (!currentUser) return 'Not Started';
        const today = new Date().toLocaleDateString();
        const record = attendanceHistory.find(r => r.empId === currentUser.id && r.date === today);

        if (!record) return 'Not Started';
        if (!record.checkOut) return 'Checked In';
        return 'Completed';
    };

    const calculatePresentDays = (empId, month, year) => {
        return attendanceHistory.filter(record => {
            const dateObj = new Date(record.date);
            if (isNaN(dateObj)) return false;

            const recordMonth = dateObj.toLocaleString('default', { month: 'long' });
            const recordYear = dateObj.getFullYear();

            return record.empId === empId &&
                recordMonth === month &&
                recordYear === year &&
                record.status === 'Present';
        }).length;
    };

    const value = {
        attendanceHistory,
        markAttendance,
        currentAttendanceStatus: getTodayStatus(),
        calculatePresentDays
    };

    return (
        <AttendanceContext.Provider value={value}>
            {children}
        </AttendanceContext.Provider>
    );
}
