// OrderCard.jsx
import { Order } from '@/models/order.model';
import React from 'react';

const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Order #{order.id}</h3>
        <span className={`px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>
      <p className="text-gray-600">Table No: {order.tableNo}</p>
      <p className="text-gray-600">Total Price: {order.totalPrice.toFixed(2)} Baht</p>
      <p className="text-gray-600">Created At: {new Date(order.createdAt).toLocaleString()}</p>
      <p className="text-gray-600">Updated At: {new Date(order.updatedAt).toLocaleString()}</p>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-400 text-white';
    case 'completed':
      return 'bg-green-400 text-white';
    case 'cancelled':
      return 'bg-red-400 text-white';
    default:
      return 'bg-gray-400 text-gray-800';
  }
};

export default OrderCard;
