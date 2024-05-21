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
import { getPublicUrl, uploadImage } from "@/libs/storage.service";

const EditUserPage = () => {
  const { userInfo, isLoading } = useUserInfo();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  
  React.useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setAddress(userInfo.address);
      setProfileImage(getPublicUrl("restaurants", `${userInfo.id}/image.png`));
    }
  }, [userInfo]);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
    }
  };

  const handleUpdate = async () => {
    try {
      if (!userInfo?.id) return;

      await updateRestaurantInfo(userInfo?.id, name, address);

      // update user profile image in storage
      if (profileImageFile) {
        await uploadImage("restaurants", `${userInfo.id}/image.png`, profileImageFile)
      }

      toast.success("Updated successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardContent>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
          {profileImage && (
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
          )}
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
