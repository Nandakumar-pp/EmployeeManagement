import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddSalary = () => {
  const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    netsalary: 0,
    payDate: null,
    receipt: null,
  });
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    employeeId: '',
    role: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          const employeeData = response.data.employee;
          setEmployee({
            name: employeeData.userId.name,
            email: employeeData.userId.email,
            employeeId: employeeData.employeeId,
            role: employeeData.userId.role,
          });

          setSalary(prevState => ({
            ...prevState,
            employeeId: employeeData._id,
            basicSalary: 0,
            allowances: 0,
            deductions: 0,
            netsalary: 0,
            receipt: null,
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'receipt') {
      setSalary(prevData => ({ ...prevData, [name]: files[0] }));
    } else {
      setSalary(prevData => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('employeeId', salary.employeeId);
    formData.append('basicSalary', salary.basicSalary);
    formData.append('allowances', salary.allowances);
    formData.append('deductions', salary.deductions);
    formData.append('payDate', salary.payDate);
    formData.append('netsalary', salary.netsalary);
    if (salary.receipt) {
      formData.append('receipt', salary.receipt);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/salary/add', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        navigate('/admin-dashboard/salary');
      }
    } catch (error) {
      console.error(error);
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  // Calculate the net salary dynamically based on basicSalary, allowances, and deductions
  useEffect(() => {
    setSalary(prevState => ({
      ...prevState,
      netsalary: parseInt(prevState.basicSalary) + parseInt(prevState.allowances) - parseInt(prevState.deductions),
    }));
  }, [salary.basicSalary, salary.allowances, salary.deductions]);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-Sevillana mb-6">Add Salary</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Employee ID (read-only) */}
          <div>
            <label className="block text-sm font-sevillana text-gray-700">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={employee.employeeId}
              onChange={handleChange}
              placeholder="Employee ID"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              readOnly
            />
          </div>

          {/* Basic Salary */}
          <div>
            <label className="block text-sm font-sevillana text-gray-700">Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              value={salary.basicSalary}
              onChange={handleChange}
              placeholder="Basic Salary"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Allowances */}
          <div>
            <label className="block text-sm font-sevillana text-gray-700">Allowances</label>
            <input
              type="number"
              name="allowances"
              value={salary.allowances}
              onChange={handleChange}
              placeholder="Allowances"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Deductions */}
          <div>
            <label className="block text-sm font-sevillana text-gray-700">Deductions</label>
            <input
              type="number"
              name="deductions"
              value={salary.deductions}
              onChange={handleChange}
              placeholder="Deductions"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Pay Date */}
          <div>
            <label className="block text-sm font-sevillana text-gray-700">Pay Date</label>
            <input
              type="date"
              name="payDate"
              value={salary.payDate}
              onChange={handleChange}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Net Salary */}
          <div>
            <label className="block text-sm font-sevillana text-gray-700">Net Salary</label>
            <input
              type="number"
              name="netsalary"
              value={salary.netsalary}
              readOnly
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Receipt */}
          <div>
            <label className="block text-sm font-sevillana text-gray-700">Receipt</label>
            <input
              type="file"
              name="receipt"
              onChange={handleChange}
              accept=".pdf, image/*"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-teal-700 hover:bg-teal-800 text-white font-bold py-2 px-4 rounded"
        >
          Add Salary
        </button>
      </form>
    </div>
  );
};

export default AddSalary;
