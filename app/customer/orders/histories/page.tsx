import { ORDER_STATUS } from "@/enums/order.enum";
import { getHistoriesWithMenus } from "@/libs/histories.service";
import { fetchOrder } from "@/libs/order.service";
import { Button, Typography, Grid } from "@mui/material";
import React from "react";
import HistoryCard from "./HistoryCard";
import Link from "next/link";

export const revalidate = 0;

const Page = async ({
  searchParams,
}: {
  searchParams: { orderId: string; restaurantId: string };
}) => {
  const { orderId, restaurantId } = searchParams;
  if (!(orderId || restaurantId)) return <h1>The link is not valid</h1>;
  const order = await fetchOrder(orderId);
  const histories = await getHistoriesWithMenus(orderId);
  if (order.status !== ORDER_STATUS.inProgress)
    return <h1>The order is already complete</h1>;

    console.log(histories)
  return (
    <div>
      <div className="flex justify-between items-center bg-gray-800 text-white py-4 px-6">
        <Link

          href={`/customer/orders?orderId=${orderId}&restaurantId=${restaurantId}`}
        >
          Back
        </Link>
        <Typography variant="h5">Histories</Typography>
      </div>

      <Grid container spacing={2} className="p-4">
        {histories.map((history, index) => (
          <Grid item xs={12} key={index}>
            <HistoryCard history={history} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Page;
