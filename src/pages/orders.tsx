import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CircularProgress } from '@mui/material';

type Order = {
  id: number;
  totalAmount: string;
  items: string; // 以逗號分隔的商品清單，例如 "漢堡 (x2), 鰻魚飯 (x1)"
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders', { method: 'GET' });
        if (!response.ok) {
          throw new Error('無法取得訂單資料');
        }
        const data = await response.json();
        setOrders(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message || '發生未知錯誤');
          } else {
            setError('發生未知錯誤');
          }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        訂單管理
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      ) : orders.length === 0 ? (
        <Typography variant="body1">目前沒有訂單。</Typography>
      ) : (
        <Grid container spacing={4}>
          {orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">訂單 #{order.id}</Typography>                  
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    總金額: ${order.totalAmount}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 1 }}>
                    商品列表:
                  </Typography>
                  <ul>
                    {order.items.split(', ').map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Orders;
