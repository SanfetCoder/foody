"use client"
import React, { useState, useEffect } from "react";
import OrderCard from "./OrderCard";
import { Order } from "@/models/order.model";
import { fetchOrders } from "@/libs/order.service";
import { useUser } from "@/hooks/useUser";

const OrderHistoryPage: React.FC = () => {
  const { user } = useUser();
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (!user) return;
        const history = await fetchOrders(user.id);
        setOrderHistory(history);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchHistory();
  }, [user]);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Order History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {orderHistory.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryPage;
