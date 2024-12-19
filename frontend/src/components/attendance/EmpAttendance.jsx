import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import { format } from 'date-fns';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const EmpAttendance = () => {
    const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date()); // Current date
  const [attendance, setAttendance] = useState({}); // Store attendance data
  const employeeId=1; // Assuming the employee ID is already known or passed as a prop

  // Handle attendance change (Present, Absent, or Leave)
  const handleAttendanceChange = async (date, status) => {
    setAttendance({
      ...attendance,
      [format(date, 'yyyy-MM-dd')]: status,
    });

    if (status === 'Leave') {
      // Send the leave data to the backend when the status is 'Leave'
      try {
        await axios.post('http://localhost:5000/attendance/add', {
          employeeId:id,
          leaveDate: format(date, 'yyyy-MM-dd'),
        });
        console.log('Leave saved successfully');
      } catch (error) {
        console.error('Error saving leave:', error);
      }
    }
  };

  // Render attendance status for the selected date
  const renderAttendance = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return attendance[formattedDate] || 'Select'; // Default is "Select"
  };

  // Mark dates with 'Leave' in red on the calendar
  const tileClassName = ({ date, view }) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    if (attendance[formattedDate] === 'Leave') {
      return 'leave-day'; // Add class for leave days
    }
    return '';
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Employee Attendance Calendar</h1>

      {/* Flexbox container for the calendar and attendance form */}
      <div style={styles.mainContent}>
        {/* Calendar Component */}
        <div style={styles.calendarWrapper}>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={tileClassName} // Apply custom class for leave days
          />
        </div>

        {/* Display the selected date and allow the user to select attendance */}
        <div style={styles.attendanceContainer}>
          <h2>Selected Date: {format(selectedDate, 'MMMM dd, yyyy')}</h2>
          <div style={styles.attendanceForm}>
            <div style={styles.dayNumber}>{format(selectedDate, 'd')}</div>
            <select
              style={styles.attendanceSelect}
              value={renderAttendance(selectedDate)}
              onChange={(e) => handleAttendanceChange(selectedDate, e.target.value)}
            >
              <option value="Select">Select</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inject custom styles for option text color */}
      <style>{`
        select option {
          color: black; /* Set the text color of options to black */
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '30px auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    color: '#004d40', // Teal-800 color
    fontSize: '2rem',
    marginBottom: '20px',
  },
  mainContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '40px',
    marginTop: '20px',
  },
  calendarWrapper: {
    width: '60%',
  },
  attendanceContainer: {
    width: '35%',
    textAlign: 'center',
    backgroundColor: '#00796b', // Teal-700 background
    color: '#fff', // White text color
    padding: '20px',
    borderRadius: '8px',
  },
  attendanceForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  dayNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  attendanceSelect: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    backgroundColor: '#fff',
    transition: 'border 0.3s ease',
  },
  attendanceSelectHover: {
    borderColor: '#004d40',
  },
  attendanceSummary: {
    marginTop: '20px',
  },
};

export default EmpAttendance;
