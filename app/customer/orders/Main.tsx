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
import { History } from "@/models/history.model";
import MenuCard from "./MenuCard";
import { useRouter } from "next/navigation";
import { ORDER_STATUS } from "@/enums/order.enum";
import { KITCHEN_STATUS } from "@/enums/history.enum";

const Main: FC<{
  menus: Menu[];
  order: Order;
}> = ({ menus, order }) => {
  const { tableNo } = order;
  const [cart, setCart] = useState<History[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const router = useRouter();
  const toggleCartDrawer = () => {
    setIsCartDrawerOpen(!isCartDrawerOpen);
  };

  const addToCart = (food: Menu, amount: number) => {
    setCart((prev) => [
      ...prev,
      {
        id: v4(),
        menuId: food.id,
        createdAt: new Date(),
        amount,
        restaurantId: order.restaurantId,
        orderId: order.id,
        status : KITCHEN_STATUS.preparing
      },
    ]);
  };

  const deleteFromCart = (index: number) => {
    setCart((prev) => {
      const newCart = [...prev];
      newCart.splice(index, 1);
      return newCart;
    });
  }

  const handleConfirmOrder = async (histories: History[]) => {
    try {
      toast.loading("Confirming order...");
      await createHistories(histories);
      toast.dismiss();
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
            {cart.map((history: History) => {
              const menu = menus.find((m) => m.id === history.menuId);
              return (
                <Card key={history.id} className="mb-4">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {menu!.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {menu!.price} Baht
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      amount : {history!.amount.toString()}
                    </Typography>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        deleteFromCart(cart.indexOf(history))
                        toast.success("Deleted")
                      }}
                    >
                      Delete
                    </Button>
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
        <MdHistory onClick={()=>router.push(`/customer/orders/histories?orderId=${order.id}&restaurantId=${order.restaurantId}`)} size={20} />
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
          return <MenuCard onAddToCart={addToCart} key={food.id} food={food} />;
        })}
      </Grid>
    </div>
  );
};

export default Main;
