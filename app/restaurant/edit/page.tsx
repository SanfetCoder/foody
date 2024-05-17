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

const EditUserPage = () => {
  const { userInfo, isLoading } = useUserInfo();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  React.useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleUpdate = () => {
    console.log("Updating user information:", { name, email });
  };

  if (isLoading) return <CircularProgress />;

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Edit User Information
          </Typography>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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