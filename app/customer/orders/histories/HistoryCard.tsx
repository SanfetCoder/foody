import React, { FC } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const HistoryCard: FC<{
  history: any;
}> = ({ history }) => {
  const { createdAt, amount, menus, status } = history;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {menus.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Amount: {amount}
        </Typography>
        <Typography className="font-semibold" variant="body1" gutterBottom>
          {status}
        </Typography>
        <Typography variant="body1" gutterBottom>
          Created At: {new Date(createdAt).toLocaleDateString()}{" "}
          {new Date(createdAt).toLocaleTimeString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
