// components/InfoCard.tsx
import React from 'react';
import { CardContent, Paper, Typography } from '@mui/material';

interface InfoCardProps {
  title: string;
  totalFileCount: number;
  totalVersionCount: number;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  totalFileCount,
  totalVersionCount,
}) => {
  return (
    <Paper elevation={0} sx={{ minWidth: 275, padding: 2 }}>
      <CardContent>
        <Typography variant='h3' component='div' sx={{ mb: 4 }}>
          {title}
        </Typography>
        <Typography variant='h3' color='textSecondary' gutterBottom>
          ファイル数
        </Typography>
        <Typography variant='h1' color='secondary' gutterBottom>
          {totalFileCount}個
        </Typography>
        <Typography variant='h3' color='textSecondary' gutterBottom>
          総バージョン数
        </Typography>
        <Typography variant='h1' color='secondary'>
          {totalVersionCount.toLocaleString()}
        </Typography>
      </CardContent>
    </Paper>
  );
};

export default InfoCard;
