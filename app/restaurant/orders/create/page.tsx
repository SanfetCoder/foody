"use client"
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import QRCode from 'qrcode.react';
import { useUser } from '@/hooks/useUser';
import toast from 'react-hot-toast';
import { createOrder } from '@/libs/order.service';
import {v4} from "uuid"
import { ORDER_STATUS } from '@/enums/order.enum';

const CreateOrderPage = () => {
  const [tableNumber, setTableNumber] = useState('');
  const [pax, setPax] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const {user, loading} = useUser();

  const generateQRCode = async () => {
    if (!user){
      toast.error('Please login before creating an order');
      return;
    }

    const createdOrder = await createOrder({
      id : v4(),
      restaurantId : user.id,
      tableNo : tableNumber,
      createdAt : new Date(),
      updatedAt : new Date(),
      totalPrice : 0,
      status : ORDER_STATUS.inProgress
    })

    // Generate a unique URL for ordering based on table number and pax
    const uniqueUrl = `${process.env.NEXT_PUBLIC_QR_ORDER_URL!}/customer/orders?orderId=${createdOrder.id}&restaurantId=${user.id}`;
    setQrCodeUrl(uniqueUrl);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="p-5 w-1/2 mx-auto flex flex-col items-center">
      <Typography className='mr-auto' variant="h4" gutterBottom>
        Create Order
      </Typography>
      <TextField
        label="Table Number"
        value={tableNumber}
        onChange={(e) => setTableNumber(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Pax (Number of Customers)"
        value={pax}
        onChange={(e) => setPax(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={generateQRCode}
        className="mt-4"
      >
        Generate QR Code
      </Button>
      {qrCodeUrl && (
        <div className="mt-4">
          <Typography variant="h6" gutterBottom>
            QR Code for Ordering
          </Typography>
          <QRCode value={qrCodeUrl} size={200} />
        </div>
      )}
    </div>
  );
};

export default CreateOrderPage;
