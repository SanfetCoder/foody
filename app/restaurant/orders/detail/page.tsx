"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchOrder, fetchOrders, updateOrder } from "@/libs/order.service";
import {
  getHistories,
  getHistoriesWithMenus,
  updateHistory,
} from "@/libs/histories.service";
import { KITCHEN_STATUS } from "@/enums/history.enum";
import toast from "react-hot-toast";

const OrderDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { data: order, isPending: isLoadingOrder } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: async () => {
      if (!orderId) return;
      return await fetchOrder(orderId);
    },
    enabled: !!orderId,
  });

  const { data: histories, isPending: isLoadingHistories } = useQuery({
    queryKey: ["historiesWithMenus", orderId],
    queryFn: async () => {
      if (!orderId) return;
      return await getHistoriesWithMenus(orderId);
    },
    enabled: !!orderId,
  });

  if (!orderId) return <div>Please enter order id</div>;
  if (isLoadingOrder || isLoadingHistories) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;
  if (!histories) return <div>History not found</div>;

  const { tableNo, createdAt, totalPrice, id } = order;

  async function handleServe(historyId: string) {
    try {
      toast.loading("Serving...");
      await updateHistory(historyId, { status: KITCHEN_STATUS.served });
      toast.dismiss();
      toast.success("Served");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async function handleCancel(historyId: string, price : number) {
    try {
      if (!orderId) throw new Error("Please enter order id");
      toast.loading("Canceling...");
      await updateHistory(historyId, { status: KITCHEN_STATUS.canceled });

      // update the price of order
      const currentOrderInfo = await fetchOrder(orderId);
      await updateOrder(orderId, {
        totalPrice: currentOrderInfo.totalPrice - price,
      });
      toast.dismiss();
      toast.success("Canceled");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const generateQRPayment = () => {
    // Generate QR code for payment
    // ...
  };

  return (
    <div>
      <div className="flex justify-between items-center bg-gray-800 text-white py-4 px-6">
        <Button
          variant="text"
          color="inherit"
          onClick={() => router.push("/restaurant/orders")}
        >
          Back
        </Button>
        <Typography variant="h5">Order Detail</Typography>
      </div>

      <div className="p-4">
        <Typography variant="h6" gutterBottom>
          Order ID: {id}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Table No: {tableNo}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {/* Pax: {pax} */}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Created At: {new Date(createdAt).toLocaleDateString()}
        </Typography>
      </div>

      <Grid container spacing={2} className="p-4">
        {histories.map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card className="flex justify-between">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.menus.name}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Quantity: {item.amount}
                </Typography>
                <Chip
                  label={item.status}
                  color={
                    item.status === KITCHEN_STATUS.preparing
                      ? "warning"
                      : item.status === KITCHEN_STATUS.canceled
                      ? "error"
                      : "success"
                  }
                />
              </CardContent>
              <CardContent className="flex flex-col gap-y-5">
                {item.status === KITCHEN_STATUS.preparing ? (
                  <Button
                    onClick={() => handleServe(item.id)}
                    variant="contained"
                    color="success"
                  >
                    Serve
                  </Button>
                ) : null}

                {item.status === KITCHEN_STATUS.preparing ? (
                  <Button
                    onClick={() => handleCancel(item.id, item.menus.price * item.amount)}
                    variant="contained"
                    color="error"
                  >
                    Cancel
                  </Button>
                ) : null}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div className="p-4 flex justify-between items-center">
        <Typography variant="h6">Total Price: {totalPrice} Baht</Typography>
        <Button variant="contained" color="primary" onClick={generateQRPayment}>
          Generate QR Payment
        </Button>
      </div>
    </div>
  );
};

export default OrderDetailPage;
