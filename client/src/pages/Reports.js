import React, { useState, useEffect } from 'react';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    // Fetch user reports
    const fetchReports = async () => {
      // Mock data
      setReports([
        { id: 1, type: 'Application Report', date: '2023-10-01', status: 'Viewed' },
        { id: 2, type: 'Interview Feedback', date: '2023-09-28', status: 'Pending' },
      ]);
    };
    fetchReports();
  }, []);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">My Reports</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Report Type</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Status</th>
              <th className="text-left py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id} className="border-b">
                <td className="py-2">{report.type}</td>
                <td className="py-2">{report.date}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded ${report.status === 'Viewed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                    {report.status}
                  </span>
                </td>
                <td className="py-2">
                  <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
