import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';

const TestPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  // 新增測試訂單，將資料傳送到後端
  const addTestOrder = async () => {
    const testOrder = {
      totalAmount: 570.0,
      cart: [
        { id: 1, name: '紅燒牛肉麵', price: 520.0, quantity: 1 },
        { id: 2, name: '滷蛋', price: 50.0, quantity: 1 },
      ],
    };

    setLoading(true);
    const response = await fetch('/api/testorder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testOrder),
    });

    const result = await response.json();
    setLoading(false);
    if (result.success) {
      alert('成功新增測試訂單！');
    } else {
      alert('新增訂單失敗！');
    }
  };

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        測試資料庫操作
      </Typography>

      <Button variant="contained" color="primary" onClick={addTestOrder} sx={{ marginBottom: 2 }}>
        新增測試訂單
      </Button>

      {loading && <Typography>載入中...</Typography>}
    </Container>
  );
};

export default TestPage;
