import { ORDER_STATUS } from "@/enums/order.enum";
import { fetchOrder } from "@/libs/order.service";
import React from "react";

export const revalidate = 10;

const Page = async ({ searchParams }: { searchParams: { orderId: string } }) => {
  const { orderId } = searchParams;
  if (!orderId) return <h1>The link is not valid</h1>
  const {status} = await fetchOrder(orderId);
  // check the status of the order by using order id
  if (status !== ORDER_STATUS.inProgress) return <h1>The order is already complete</h1>
  return <div>Orders</div>;
};

export default Page;
