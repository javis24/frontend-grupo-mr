import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const response = await axios.get("https://backend-grupo-mr-production-2c03.up.railway.app/products");
    setProducts(response.data);
  };

  const deleteProduct = async (productId) => {
    await axios.delete(`https://backend-grupo-mr-production-2c03.up.railway.app/products/${productId}`);
    getProducts();
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <h2 className="text-xl mb-4">List of Products</h2>
      <Link to="/products/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block transition duration-300">
        Add New
      </Link>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">No</th>
            <th className="px-4 py-2 border-b">Product Name</th>
            <th className="px-4 py-2 border-b">Price</th>
            <th className="px-4 py-2 border-b">Created By</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.uuid}>
              <td className="px-4 py-2 border-b text-center">{index + 1}</td>
              <td className="px-4 py-2 border-b">{product.name}</td>
              <td className="px-4 py-2 border-b">{product.price}</td>
              <td className="px-4 py-2 border-b">{product.user.name}</td>
              <td className="px-4 py-2 border-b text-center space-x-2">
                <Link
                  to={`/products/edit/${product.uuid}`}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded transition duration-300"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteProduct(product.uuid)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
