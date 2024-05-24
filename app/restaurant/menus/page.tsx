"use client";
import React from "react";
import { Button, Card, CardContent, Typography, Grid } from "@mui/material";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  deleteMenu,
  fetchMenuCategories,
  fetchMenus,
} from "@/libs/menus.service";
import { useUserInfo } from "@/hooks/useUserInfo";
import { redirect, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getPublicUrl } from "@/libs/storage.service";

const MenusPage = () => {
  const { userInfo, isLoading: isLoadingUser } = useUserInfo();
  const router = useRouter();
  const { data: menus, isPending: isLoadingMenus } = useQuery({
    queryKey: ["menus", userInfo],
    queryFn: async () => {
      if (!userInfo) return;
      const response = await fetchMenus(userInfo.id);
      return response;
    },
    enabled: !!userInfo,
  });
  const [selectedCategory, setSelectedCategory] = React.useState<string>("");
  const filteredMenus = menus?.filter((menu) => (menu.category === selectedCategory) || (!selectedCategory));

  const { data: menuCategories, isPending: isLoadingCategories } = useQuery({
    queryKey: ["menuCategories", userInfo],
    queryFn: async () => {
      if (!userInfo) return;
      const response = await fetchMenuCategories(userInfo.id);
      return response;
    },
    enabled: !!userInfo,
  });

  if (isLoadingMenus || isLoadingUser || isLoadingCategories) return <h1>loading...</h1>;

  if (!userInfo) redirect("/restaurant");

  async function handleDeleteMenu(menuId: string) {
    try {
      await deleteMenu(menuId);

      toast.success("Menu deleted successfully");

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error: any) {
      toast.error(error.message);
    }
  }

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
          <Grid item >
            <Button onClick={()=>setSelectedCategory("")} variant={`${selectedCategory === "" ? "contained" : "outlined"}`} color="primary">
              All
            </Button>
          </Grid>
        {/* Food category options */}
        {menuCategories?.map((category) => (
          <Grid item key={category}>
            <Button onClick={()=>setSelectedCategory(category)} variant={`${selectedCategory === category ? "contained" : "outlined"}`} color="primary">
              {category}
            </Button>
          </Grid>
        ))}
        {/* Add more category options as needed */}
      </Grid>
      <Grid container spacing={2}>
        {/* Food cards */}
        {filteredMenus?.map((menu) => {
          const menuImage = getPublicUrl("menus", `${menu.id}/image.png`)
          return (
          <Grid item key={menu.id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {menu.name}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {menu.description}
                </Typography>
                <Typography variant="body1">Price: {menu.price}</Typography>
                <Typography variant="body2">
                  Category: {menu.category}
                </Typography>
                <img
                  src={menuImage}
                  alt={menu.name}
                  className="w-[150px] h-[150px] object-cover rounded-full"
                />
                <Button
                  onClick={() =>
                    router.push(`/restaurant/menus/edit?menu_id=${menu.id}`)
                  }
                  variant="outlined"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteMenu(menu.id)}
                  variant="outlined"
                  color="secondary"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )})}
        {/* Add menu button */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">
                Add Menu
              </Typography>
              <Link
                href={`/restaurant/menus/add?restaurant_id=${userInfo?.id}`}
              >
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
