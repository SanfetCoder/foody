"use client";
import React, { FC, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Badge,
  Drawer,
} from "@mui/material";
import { Menu } from "@/models/menu.model";
import { Order } from "@/models/order.model";
import { MdHistory } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { getPublicUrl } from "@/libs/storage.service";
import toast from "react-hot-toast";
import { createHistories } from "@/libs/histories.service";
import { v4 } from "uuid";

const Main: FC<{
  menus: Menu[];
  order: Order;
}> = ({ menus, order }) => {
  const { tableNo } = order;
  const [cart, setCart] = useState<Menu[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  const toggleCartDrawer = () => {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  };

  const addToCart = (food: Menu) => {
    setCart((prev) => [...prev, food]);
  };

  const handleConfirmOrder = async (menus: Menu[]) => {
    try {
      toast.loading("Confirming order...");
      const histories = menus.map((menu) => {
        return {
          id: v4(),
          menuId: menu.id,
          createdAt: new Date(),
          amount: 1,
          restaurantId: order.restaurantId,
          orderId: order.id,
        };
      });
      toast.dismiss();

      await createHistories(histories);
      toast.success("Order confirmed");
      setCart([]);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full">
      <Drawer anchor="right" open={isCartDrawerOpen} onClose={toggleCartDrawer}>
        <div className="w-[250px] p-3 h-full flex flex-col">
          <Typography variant="h5" gutterBottom>
            Your cart
          </Typography>
          <ul className="flex flex-col">
            {cart.map((menu: Menu) => {
              return (
                <Card key={menu.id} className="mb-4">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {menu.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {menu.price} Baht
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </ul>
          <Button
            disabled={cart.length === 0}
            onClick={() => handleConfirmOrder(cart)}
            variant="contained"
            color="success"
            className="w-full mt-auto"
          >
            Confirm
          </Button>
        </div>
      </Drawer>
      <nav className="flex justify-between items-center bg-gray-800 text-white py-4 px-6 w-full">
        <MdHistory size={20} />
        <Typography variant="h5">Table {tableNo}</Typography>
        <Badge
          onClick={toggleCartDrawer}
          badgeContent={cart.length}
          color="primary"
        >
          <FaShoppingCart size={20} />
        </Badge>
      </nav>
      <h1 className="p-4 font-semibold">Menus</h1>
      <Grid container spacing={2} className="p-4">
        {menus.map((food) => {
          const menuImage = getPublicUrl("menus", `${food.id}/image.png`);
          return (
            <Grid item xs={12} sm={6} md={4} key={food.id}>
              <Card>
                <CardContent>
                  <img
                    src={menuImage}
                    alt={food.name}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {food.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {food.price} Baht
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart(food)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Main;
