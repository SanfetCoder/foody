"use client";
import React, { useMemo } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getPublicUrl } from "@/libs/storage.service";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RestaurantDetailPage = () => {
  const { user, loading } = useUser();
  const router = useRouter();
  const options = useMemo(()=>{
    return [
      {
        title : "menus",
        link : "/restaurant/menus"
      },
      {
        title : "payments",
        link : "/restaurant/payments"
      },
      {
        title : "orders",
        link : "/restaurant/orders"
      }
    ]
  }, [])

  const { data: userProfileImage, isPending } = useQuery({
    queryKey: [user],
    queryFn: () => {
      if (!user) return null;
      return getPublicUrl("restaurants", `${user?.id}/image.png`);
    },
  });
  if (loading || isPending) return null;

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Card className="cursor-pointer" onClick={()=>router.push("/restaurant/edit")}>
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
      <ul className="flex gap-x-5 my-5">
        {options.map((option) => (
          <li key={option.title}>
            <Button variant="contained" color="primary" href={option.link}>
              {option.title}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantDetailPage;