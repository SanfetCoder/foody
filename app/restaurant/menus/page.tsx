"use client"
import React from "react";
import { Button, Card, CardContent, Typography, Grid } from "@mui/material";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchMenus } from "@/libs/menus.service";
import { useUserInfo } from "@/hooks/useUserInfo";
import { redirect } from "next/navigation";

const MenusPage = () => {
  const {userInfo, isLoading : isLoadingUser} = useUserInfo();
  const {data : menus, isPending : isLoadingMenus} = useQuery({
    queryKey : ["menus", userInfo],
    queryFn : async () => {
      if (!userInfo) return
      const response = await fetchMenus(userInfo.id);
      console.log(response)
      return response
    },
    enabled : !!userInfo
  })

  if (isLoadingMenus || isLoadingUser) return <h1>loading...</h1>
  if (!userInfo) redirect("/restaurant")
  return (
    <div className="p-5">
      <Link href={"/restaurant"}>
        <Button variant="contained" color="primary">
          Back
        </Button>
      </Link>
      <Typography variant="h4" align="center" gutterBottom>
        Food Categories
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {/* Food category options */}
        <Grid item>
          <Button variant="outlined">Category 1</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined">Category 2</Button>
        </Grid>
        {/* Add more category options as needed */}
      </Grid>
      <Grid container spacing={2}>
        {/* Food cards */}
        {menus?.map((menu) => (
          <Grid item key={menu.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {menu.name}
                </Typography>
                <Typography variant="body1">Price: {menu.price}</Typography>
                <Typography variant="body2">
                  Category: {menu.category}
                </Typography>
                <img
                  src={menu.image}
                  alt={menu.name}
                  style={{ width: "100%", height: "auto" }}
                />
                <Button variant="outlined" color="primary">
                  Edit
                </Button>
                <Button variant="outlined" color="secondary">
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {/* Add menu button */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">
                Add Menu
              </Typography>
              <Link href={`/restaurant/menus/add?restaurant_id=${userInfo?.id}`}>
                <Button variant="contained" color="primary">
                  Add Menu
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MenusPage;
