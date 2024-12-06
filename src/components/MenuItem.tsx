import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

interface MenuItemProps {
  id: number;
  name: string;
  price: number;
  image: string;
  onAddToCart: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ id, name, price, image, onAddToCart }) => (
  <Card sx={{ maxWidth: 345 }}>
    <CardMedia component="img" height="140" image={image} alt={name} />
    <CardContent>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body2" color="textSecondary">
        ${price.toFixed(2)}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        商品ID: {id}
      </Typography>
      <Button variant="contained" color="primary" onClick={onAddToCart} sx={{ marginTop: 2 }}>
        加入購物車
      </Button>
    </CardContent>
  </Card>
);

export default MenuItem;
