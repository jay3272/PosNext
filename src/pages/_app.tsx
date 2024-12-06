import { AppProps } from 'next/app';  // 引入 AppProps 類型
import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button, Stack } from '@mui/material';
import Link from 'next/link'; // 引入 Link 用於頁面導航

const Header: React.FC = () => (
  <AppBar position="sticky">
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Jay餐廳網站
      </Typography>
      {/* Navbar with links */}
      <Stack direction="row" spacing={2}>
        <Button color="inherit" component={Link} href="/">首頁</Button>
        <Button color="inherit" component={Link} href="/menu">菜單</Button>
        <Button color="inherit" component={Link} href="/about">關於我們</Button>
        <Button color="inherit" component={Link} href="/contact">聯繫我們</Button>
      </Stack>
    </Toolbar>
  </AppBar>
);

const Footer: React.FC = () => (
  <Box component="footer" sx={{ bgcolor: 'background.paper', padding: '1rem' }}>
    <Typography variant="body2" align="center">
      Copyright © 2024 Jay Wu. All rights reserved.
    </Typography>
  </Box>
);

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Header />
    <Container>
      <Component {...pageProps} />
    </Container>
    <Footer />
  </>
);

export default MyApp;
