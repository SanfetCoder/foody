"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { fetchMenu, updateMenu } from "@/libs/menus.service";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getPublicUrl, uploadBase64Url } from "@/libs/storage.service";
import { isImageExist } from "@/libs/utils";
import { get } from "http";

const foodTypes = [
  "Pizza",
  "Pasta",
  "Salad",
  "Burger",
  "Sushi",
  "Steak",
  "Seafood",
  "Dessert",
  "Appetizer",
  "Soup",
  "Sandwich",
  "Wrap",
  "Taco",
  "Burrito",
  "Quesadilla",
  "Curry",
  "Noodle",
  "Rice",
  "Vegetarian",
  "Vegan",
];

const EditMenuPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("");
  const [menuImage, setMenuImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const searchParams = useSearchParams();
  const menuId = searchParams.get("menu_id");
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [hasUserInputMenuImage, setHasUserInputMenuImage] = useState(false);

  const { data: menu, isPending: isLoadingMenu } = useQuery({
    queryKey: ["menu", menuId],
    queryFn: async () => {
      if (!menuId) return;
      return fetchMenu(menuId);
    },
    enabled: !!menuId,
  });
  const router = useRouter();
  if (!menuId) redirect("/restaurant/menus");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        if (isLoadingMenu || !menu) return;
        setName(menu.name);
        setPrice(menu.price);
        setType(menu.category);
        setDescription(menu.description);
        if (await isImageExist(getPublicUrl("menus", `${menu.id}/image.png`))) {
          setMenuImage(getPublicUrl("menus", `${menu.id}/image.png`));
        }
      } catch (error) {
        toast.error("Error fetching menu data");
      }
    };

    fetchMenu();
  }, [menu]);

  if (isLoadingMenu) return <h1>Loading...</h1>;

  const handleSubmit = async () => {
    try {
      // validate form
      if (!name || !price || !type || !menuImage) {
        throw new Error("Please fill in all fields");
      }

      // update menu in database
      await updateMenu(menuId, { name, price, category: type });

      // update menu image in storage
      // parse base64 image from menuImage
      const parsedImage = hasUserInputMenuImage
        ? menuImage.split(",")[1]
        : menuImage;

      await uploadBase64Url("menus", parsedImage, `${menuId}/image.png`);

      toast.success("Menu updated successfully");

      setTimeout(() => {
        router.push("/restaurant/menus");
      }, 1000);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-5 w-1/2 mx-auto flex flex-col items-center gap-y-5">
      <Link href="/restaurant/menus" className="mr-auto">
        <Button variant="contained" color="primary">
          Back
        </Button>
      </Link>
      {isLoadingImage && <Typography>Loading image...</Typography>}
      <Image
        onLoadingComplete={() => setIsLoadingImage(false)}
        onLoad={() => setIsLoadingImage(true)}
        src={menuImage || "https://via.placeholder.com/200x200"}
        alt="Menu"
        width={200}
        height={200}
        className="rounded-full w-[200px] h-[200px] object-cover"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              setMenuImage(reader.result as string);
              setHasUserInputMenuImage(true);
            };
          }
        }}
      />

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Menu Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            value={price}
            onChange={(e: any) => setPrice(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Select
            label="Food Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            fullWidth
          >
            <MenuItem value="">Select Food Type</MenuItem>
            {foodTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Update Menu
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default EditMenuPage;
