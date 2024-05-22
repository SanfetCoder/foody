"use client";
import React, { useMemo } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useUser } from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { getPublicUrl } from "@/libs/storage.service";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "@/libs/auth.service";
import toast from "react-hot-toast";
import { useUserInfo } from "@/hooks/useUserInfo";

const RestaurantDetailPage = () => {
  const { userInfo, isLoading : loading } = useUserInfo();
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
  }, [userInfo])

  const { data: userProfileImage, isPending } = useQuery({
    queryKey: [userInfo],
    queryFn: () => {
      if (!userInfo) return null;
      return getPublicUrl("restaurants", `${userInfo?.id}/image.png`);
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
            {userInfo?.name}
          </Typography>
          <Typography variant="body2">Email: {userInfo?.email}</Typography>
          <Button onClick={()=>{
            signOut();

            toast.success("Sign out successfully");

            setTimeout(() => {
              router.push("/ho");
            }
            , 1000);
          }} variant="contained" color="error">
            Sign Out
          </Button>
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