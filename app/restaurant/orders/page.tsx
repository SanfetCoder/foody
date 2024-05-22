"use client";
import React, { useState } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/libs/order.service";
import { useUser } from "@/hooks/useUser";
import { ORDER_STATUS } from "@/enums/order.enum";

const RestaurantOrdersPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useUser();
  const { data: orders, isPending: isLoadingOrders } = useQuery({
    queryKey: [user],
    queryFn: async () => {
      if (!user?.id) return;
      const response = await fetchOrders(user?.id);
      return response;
    },
    enabled: !!user,
  });
  const inProgressOrders = orders?.filter(
    (order) => order.status === ORDER_STATUS.inProgress
  );

  if (isLoadingOrders || loading) return <h1>Loading...</h1>;
  if (!user?.id) redirect("/restaurant");

  return (
    <div className="h-lvh w-full flex flex-col items-center gap-y-5 pb-20">
      <nav className="flex justify-between items-center bg-gray-800 text-white py-4 px-6 w-full">
        <Button
          variant="text"
          color="inherit"
          onClick={() => router.push("/restaurant")}
        >
          Back
        </Button>
        <Typography variant="h5">Orders</Typography>
        <Button
          variant="text"
          color="inherit"
          onClick={() => router.push("/restaurant/orders/history")}
        >
          History
        </Button>
      </nav>

      <Accordion className="w-full">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="ongoing-orders-content"
          id="ongoing-orders-header"
        >
          <Typography>Ongoing Orders</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {inProgressOrders ? (
            inProgressOrders.length > 0 ? (
              inProgressOrders?.map((order) => (
                <Card key={order.id} className="mb-4">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Table {order.tableNo}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {/* {order.menuCount} menus, {order.paxCount} pax */}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Total: {order.totalPrice} Baht
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Placed at: {new Date(order.createdAt).toLocaleString()}
                    </Typography>
                    <Button variant="contained" color="success">Payment</Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              <h1 className="mx-auto text-gray-300">
                You do not have any ongoing orders
              </h1>
            )
          ) : (
            <Typography>No orders</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push("/restaurant/orders/create")}
        className="w-[200px] mx-auto mt-auto"
      >
        Create Order
      </Button>
    </div>
  );
};

export default RestaurantOrdersPage;
