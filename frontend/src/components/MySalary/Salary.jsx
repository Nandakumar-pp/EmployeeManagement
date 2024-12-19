import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Salary = () => {
  const [salaries, setSalaries] = useState([]);
  const [filteredSalaries, setFilteredSalaries] = useState([]);
  const { id } = useParams();
  let sno = 1;

  // Fetch salaries from the server
  const fetchSalaries = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log(response.data);  // Check response data in console
      if (response.data.success) {
        setSalaries(response.data.salary);
        setFilteredSalaries(response.data.salary);
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSalaries();
    console.log(salaries)
  }, []);

  // Filter salaries based on employeeId
  const filterSalaries = (e) => {
    const q = e.target.value;
    const filteredRecords = salaries.filter((salary) =>
      salary.payDate.toLocaleLowerCase().includes(q.toLocaleLowerCase())
    );
    setFilteredSalaries(filteredRecords);
  };

  return (
    <>
      {filteredSalaries === null ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto p-5">
          <div className="text-center">
            <h2 className="text-2xl font-sevillana">Salary History</h2>
          </div>
          <div className="flex justify-end my-3">
            <input
              type="text"
              placeholder="Search By Pay Date"
              className="border px-2 rounded-md py-0.5 border-gray-300"
              onChange={filterSalaries}
            />
          </div>

          {filteredSalaries.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border border-gray-200">
                <tr>
                  <th className="px-6 py-3">S No</th>
                  <th className="px-6 py-3">Employee Id</th>
                  <th className="px-6 py-3">Basic Salary</th>
                  <th className="px-6 py-3">Allowances</th>
                  <th className="px-6 py-3">Deductions</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Pay Date</th>
                  <th className="px-6 py-3">Receipt</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalaries.map((salary) => (
                  <tr
                    key={salary._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-3">{sno++}</td>
                    <td className="px-6 py-3">{salary.employeeId.employeeId}</td>
                    <td className="px-6 py-3">{salary.basicSalary}</td>
                    <td className="px-6 py-3">{salary.allowances}</td>
                    <td className="px-6 py-3">{salary.deductions}</td>
                    <td className="px-6 py-3">{salary.netsalary}</td>
                    <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                    <td className="px-6 py-3">
  {salary.receipt ? (
    <a
      href={`http://localhost:5000/${salary.receipt}`}  // Construct the URL to the file
      download  // Forces download when clicked
      className="text-blue-500 hover:text-blue-700"
    >
      {salary.receipt}
    </a>
  ) : (
    <span>No Receipt</span>
  )}
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div><center>No Records</center></div>
          )}
        </div>
      )}
    </>
  );
};

export default Salary;
