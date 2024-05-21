import React, { FC, useState } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Menu } from '@/models/menu.model';
import { getPublicUrl } from '@/libs/storage.service';

const MenuCard : FC<{
  food : Menu,
  onAddToCart : any
}> = ({ food, onAddToCart }) => {
  const [amount, setAmount] = useState(1);
  const menuImage = getPublicUrl("menus", `${food.id}/image.png`);

  const handleIncrement = () => {
    setAmount(amount + 1);
  };

  const handleDecrement = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <img
            src={menuImage}
            alt={food.name}
            style={{ width: '100%', height: 'auto' }}
          />
          <Typography variant="h6" gutterBottom>
            {food.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {food.price} Baht
          </Typography>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="outlined" onClick={handleDecrement}>
                -
              </Button>
              <Typography variant="body1" className="mx-2">
                {amount}
              </Typography>
              <Button variant="outlined" onClick={handleIncrement}>
                +
              </Button>
            </div>
            <Button
              variant="contained"
              color="primary"
              onClick={()=>{
                onAddToCart(food, amount)
                setAmount(1)
              }}
            >
              Add to Cart
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MenuCard;
