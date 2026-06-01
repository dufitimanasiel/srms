import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products';

function ProductForm() {
  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [quantitySold, setQuantitySold] = useState('0');
  const [unitPrice, setUnitPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, { productCode, productName, quantitySold: parseInt(quantitySold), unitPrice: parseFloat(unitPrice) });
      setMessage('Product added successfully!');
      setProductCode('');
      setProductName('');
      setQuantitySold('0');
      setUnitPrice('');
      fetchProducts();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error adding product');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Product Management</h1>
      
      {message && (
        <div className={`p-4 rounded mb-6 ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product Code</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={productCode}
                onChange={(e) => setProductCode(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Quantity Sold</label>
              <input
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={quantitySold}
                onChange={(e) => setQuantitySold(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Unit Price</label>
              <input
                type="number"
                step="0.01"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Add Product
            </button>
          </form>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Product List</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Code</th>
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Qty Sold</th>
                  <th className="text-right py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.productCode} className="border-b hover:bg-gray-50">
                    <td className="py-2">{product.productCode}</td>
                    <td className="py-2">{product.productName}</td>
                    <td className="py-2">{product.quantitySold}</td>
                    <td className="py-2 text-right">${parseFloat(product.unitPrice).toFixed(2)}</td>
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

export default ProductForm;
