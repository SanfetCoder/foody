"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useUserInfo } from "@/hooks/useUserInfo";
import toast from "react-hot-toast";
import { updateRestaurantInfo } from "@/libs/restaurants.service";

const EditUserPage = () => {
  const { userInfo, isLoading } = useUserInfo();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  React.useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setAddress(userInfo.address);
    }
  }, [userInfo]);

  const handleUpdate = async () => {
    try {
      if (!userInfo?.id) return

      await updateRestaurantInfo(userInfo?.id, name, address);

      toast.success("Updated successfully");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardContent>
          <Typography className="text-center" variant="h5" component="div">
            Edit your restaurant
          </Typography>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditUserPage;
