import { ORDER_STATUS } from "@/enums/order.enum";
import { fetchOrder } from "@/libs/order.service";
import React from "react";
import { fetchMenus } from "@/libs/menus.service";
import Main from "./Main";

export const revalidate = 10;

const Page = async ({
  searchParams,
}: {
  searchParams: { orderId: string; restaurantId: string };
}) => {
  const { orderId, restaurantId } = searchParams;
  if (!(orderId || restaurantId)) return <h1>The link is not valid</h1>;
  const order = await fetchOrder(orderId);
  // check the status of the order by using order id
  if (order.status !== ORDER_STATUS.inProgress)
    return <h1>The order is already complete</h1>;
  const menus = await fetchMenus(restaurantId);

  return <Main menus={menus} order={order} />;
};

export default Page;
