import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/reports';

function Reports() {
  const [reportType, setReportType] = useState('daily');
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    fetchReport();
  }, [reportType]);

  const fetchReport = async () => {
    try {
      const response = await axios.get(`${API_URL}/${reportType}`);
      setReportData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Reports</h1>
      
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setReportType('daily')}
          className={`px-6 py-2 rounded-lg transition ${reportType === 'daily' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Daily Report
        </button>
        <button
          onClick={() => setReportType('weekly')}
          className={`px-6 py-2 rounded-lg transition ${reportType === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Weekly Report
        </button>
        <button
          onClick={() => setReportType('monthly')}
          className={`px-6 py-2 rounded-lg transition ${reportType === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          Monthly Report
        </button>
      </div>
      
      {reportData && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium">Total Customers</h3>
              <p className="text-3xl font-bold text-blue-600">{reportData.customers}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
              <p className="text-3xl font-bold text-green-600">{reportData.products}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium">Total Sales</h3>
              <p className="text-3xl font-bold text-purple-600">{reportData.sales}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-gray-500 text-sm font-medium">Total Amount</h3>
              <p className="text-3xl font-bold text-orange-600">${parseFloat(reportData.totalAmount).toFixed(2)}</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Sales Details</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Invoice</th>
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">Customer</th>
                    <th className="text-left py-2">Product</th>
                    <th className="text-left py-2">Payment</th>
                    <th className="text-right py-2">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.saleDetails.map((sale) => (
                    <tr key={sale.invoiceNumber} className="border-b hover:bg-gray-50">
                      <td className="py-2">{sale.invoiceNumber}</td>
                      <td className="py-2">{sale.salesDate}</td>
                      <td className="py-2">{sale.firstName} {sale.lastName}</td>
                      <td className="py-2">{sale.productName}</td>
                      <td className="py-2">{sale.paymentMethod}</td>
                      <td className="py-2 text-right">${parseFloat(sale.totalAmountPaid).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;
