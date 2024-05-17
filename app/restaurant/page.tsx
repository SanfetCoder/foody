"use client";
import React from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getPublicUrl } from "@/libs/storage.service";
import Image from "next/image";

const RestaurantDetailPage = () => {
  const { user, loading } = useUser();

  const { data: userProfileImage, isPending } = useQuery({
    queryKey: [user],
    queryFn: () => {
      if (!user) return null;
      return getPublicUrl("restaurants", `${user?.id}/image.png`);
    },
  });
  if (loading || isPending) return null;

  return (
    <div className="flex justify-center items-center h-screen">
      <Card>
        <CardContent className="flex flex-col gap-y-3">
          {userProfileImage && (
            <Image
              src={userProfileImage}
              width={300}
              height={300}
              alt="User profile image"
              className="w-[100px] h-[100px] object-cover rounded-full mx-auto"
            />
          )}
          <Typography variant="h5" component="div">
            {user?.email}
          </Typography>
          <Typography variant="body2">Email: {user?.email}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantDetailPage;