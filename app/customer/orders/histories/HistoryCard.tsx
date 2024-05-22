import React, { FC } from "react";
import { Card, CardContent, Typography, Chip } from "@mui/material";
import { KITCHEN_STATUS } from "@/enums/history.enum";

const HistoryCard: FC<{
  history: any;
}> = ({ history }) => {
  const { createdAt, amount, menus, status, price } = history;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {menus.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Amount : {amount}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Total price : {(menus.price * amount).toFixed(2)} Baht
        </Typography>
        <Chip
          label={status}
          color={
            status === KITCHEN_STATUS.preparing
              ? "warning"
              : status === KITCHEN_STATUS.canceled
              ? "error"
              : "success"
          }
        />
        <Typography variant="body1" gutterBottom>
          Created At: {new Date(createdAt).toLocaleDateString()}{" "}
          {new Date(createdAt).toLocaleTimeString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
