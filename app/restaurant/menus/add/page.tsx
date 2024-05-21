"use client";
import React, { useState } from "react";
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
import { createMenu } from "@/libs/menus.service";
import { redirect, useParams, useSearchParams } from "next/navigation";

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

const AddMenuPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [menuImage, setMenuImage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const restaurant_id = searchParams.get("restaurant_id");

  if (!restaurant_id) redirect("/restaurant");

  const handleSubmit = async () => {
    try {
      // validate form
      if (!name || !price || !name || !menuImage) {
        throw new Error("Please fill in all fields");
      }
      
      // add menu to database
      await createMenu(restaurant_id,{ name, price, type})

      // update menu image in storage

      toast.success("Menu added successfully");

    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-5 w-1/2 mx-auto flex flex-col items-center gap-y-5">
      <Link href="/restaurant" className="mr-auto">
        <Button variant="contained" color="primary">
          Back
        </Button>
      </Link>
      <Image
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
        <Grid item xs={12} sm={6}>
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
            Add Menu
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddMenuPage;
