import "@/styles/globals.css";
import { EmployeeProvider } from "../context/EmployeeContext";
import { AuthProvider } from "../context/AuthContext";
import { AttendanceProvider } from "../context/AttendanceContext";
import { TaskProvider } from "../context/TaskContext";

export default function App({ Component, pageProps }) {
  return (
    <EmployeeProvider>
      <AuthProvider>
        <AttendanceProvider>
          <TaskProvider>
            <Component {...pageProps} />
          </TaskProvider>
        </AttendanceProvider>
      </AuthProvider>
    </EmployeeProvider>
  );
}
