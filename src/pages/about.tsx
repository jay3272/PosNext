import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About: React.FC = () => (
  <Container>
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        關於我們
      </Typography>
      <Typography variant="body1" paragraph>
        歡迎來到我們的餐廳網站！我們提供新鮮、美味的餐點，並且致力於為您帶來最佳的用餐體驗。我們的餐廳位於市中心，提供各式各樣的美食，從經典漢堡到精緻的豬排飯，滿足您不同的口味需求。
      </Typography>
      <Typography variant="body1" paragraph>
        我們的目標是提供一個舒適的用餐環境，無論您是和家人、朋友還是同事來聚餐，都能感受到賓至如歸的服務。來自世界各地的食材，搭配經典和創新的料理方法，讓每一餐都充滿驚喜。
      </Typography>
      <Typography variant="body1" paragraph>
        歡迎光臨我們的餐廳，期待為您服務！
      </Typography>
    </Box>
  </Container>
);

export default About;
