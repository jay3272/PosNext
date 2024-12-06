import React from 'react';
import { Container, Typography, Box, Grid, Button, Card, CardContent, CardMedia } from '@mui/material';

const menu = [
  { id: 1, name: "漢堡", price: 180, image: '/images/hamburger.jpg' },
  { id: 2, name: "鰻魚飯", price: 200, image: '/images/fish.jpg' },
  { id: 3, name: "豬排飯", price: 220, image: '/images/pork.jpg' },
];

const Home: React.FC = () => (
  <div>
    {/* 首頁介紹區 */}
    <Box sx={{ bgcolor: 'primary.main', color: 'white', padding: '4rem 0', textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        歡迎來到 Jay 餐廳
      </Typography>
      <Typography variant="h5" paragraph>
        我們提供精緻美食，讓您每一口都充滿驚喜，快來體驗我們的特色菜單吧！
      </Typography>
      <Button variant="contained" color="secondary" href="/menu" sx={{ marginTop: 2, marginRight: 2 }}>
        查看菜單
      </Button>
      <Button variant="contained" color="info" href="/orders" sx={{ marginTop: 2 }}>
        管理訂單
      </Button>
      <Button variant="contained" color="info" href="/test" sx={{ marginTop: 2 }}>
        測試功能
      </Button>
    </Box>

    {/* 餐點菜單區 */}
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        我們的菜單
      </Typography>
      <Grid container spacing={4}>
        {menu.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  ${item.price.toFixed(0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>

    {/* 熱門餐點 */}
    <Box sx={{ bgcolor: 'background.paper', padding: '2rem 0', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        熱門餐點
      </Typography>
      <Typography variant="h6" paragraph>
        註冊會員即可享受 10% 回饋，還有更多優惠卷！
      </Typography>
      <Button variant="contained" color="primary" href="/signup">
        立即註冊
      </Button>
    </Box>
  </div>
);

export default Home;
