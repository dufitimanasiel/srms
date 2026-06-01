import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/sales';
const CUSTOMERS_URL = 'http://localhost:5000/api/customers';
const PRODUCTS_URL = 'http://localhost:5000/api/products';

function SalesForm() {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [salesDate, setSalesDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [totalAmountPaid, setTotalAmountPaid] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');
  const [productCode, setProductCode] = useState('');
  const [sales, setSales] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSales();
    fetchCustomers();
    fetchProducts();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get(API_URL);
      setSales(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(CUSTOMERS_URL);
      setCustomers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(PRODUCTS_URL);
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API_URL}/${editing}`, {
          salesDate,
          paymentMethod,
          totalAmountPaid: parseFloat(totalAmountPaid),
          customerNumber,
          productCode
        });
        setMessage('Sale updated successfully!');
        setEditing(null);
      } else {
        await axios.post(API_URL, {
          invoiceNumber,
          salesDate,
          paymentMethod,
          totalAmountPaid: parseFloat(totalAmountPaid),
          customerNumber,
          productCode
        });
        setMessage('Sale added successfully!');
      }
      resetForm();
      fetchSales();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error processing sale');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleEdit = (sale) => {
    setEditing(sale.invoiceNumber);
    setInvoiceNumber(sale.invoiceNumber);
    setSalesDate(sale.salesDate);
    setPaymentMethod(sale.paymentMethod);
    setTotalAmountPaid(sale.totalAmountPaid);
    setCustomerNumber(sale.customerNumber);
    setProductCode(sale.productCode);
  };

  const handleDelete = async (invoiceNumber) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      try {
        await axios.delete(`${API_URL}/${invoiceNumber}`);
        setMessage('Sale deleted successfully!');
        fetchSales();
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        setMessage('Error deleting sale');
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const resetForm = () => {
    setInvoiceNumber('');
    setSalesDate(new Date().toISOString().split('T')[0]);
    setPaymentMethod('');
    setTotalAmountPaid('');
    setCustomerNumber('');
    setProductCode('');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Sales Management</h1>
      
      {message && (
        <div className={`p-4 rounded mb-6 ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit Sale' : 'Add New Sale'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Invoice Number</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                disabled={editing !== null}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Sales Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={salesDate}
                onChange={(e) => setSalesDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Payment Method</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
              >
                <option value="">Select payment method</option>
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Total Amount Paid</label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={totalAmountPaid}
                onChange={(e) => setTotalAmountPaid(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Customer</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={customerNumber}
                onChange={(e) => setCustomerNumber(e.target.value)}
              >
                <option value="">Select customer</option>
                {customers.map((customer) => (
                  <option key={customer.customerNumber} value={customer.customerNumber}>
                    {customer.customerNumber} - {customer.firstName} {customer.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Product</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
              >
                <option value="">Select product</option>
                {products.map((product) => (
                  <option key={product.productCode} value={product.productCode}>
                    {product.productCode} - {product.productName}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                {editing ? 'Update Sale' : 'Add Sale'}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditing(null);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Sales List</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Invoice</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-right py-2">Amount</th>
                  <th className="text-center py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.invoiceNumber} className="border-b hover:bg-gray-50">
                    <td className="py-2">{sale.invoiceNumber}</td>
                    <td className="py-2">{sale.salesDate}</td>
                    <td className="py-2 text-right">${parseFloat(sale.totalAmountPaid).toFixed(2)}</td>
                    <td className="py-2 text-center">
                      <button
                        onClick={() => handleEdit(sale)}
                        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sale.invoiceNumber)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalesForm;
