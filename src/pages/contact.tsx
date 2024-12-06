import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 這裡可以處理提交的邏輯，如發送聯絡表單的內容
    console.log({ name, email, message });
    alert('感謝您的聯絡，會儘快回覆您！');
  };

  return (
    <Container>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          聯絡我們
        </Typography>
        <Typography variant="body1" paragraph>
          如果您有任何問題，請隨時通過以下表單聯絡我們，我們會儘快回覆您！
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="姓名"
            variant="outlined"
            fullWidth
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="電子郵件"
            variant="outlined"
            fullWidth
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="訊息"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            送出
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Contact;
