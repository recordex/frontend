// pages/index.js
import { Paper, Typography } from '@mui/material';
import FileMetadata from './FileMetadata';
import { Stack } from '@mui/system';
import { mainTheme } from '@/themes/main';

export default function RecentlyRecordedFIleList() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        mb: 4,
        background: mainTheme.palette.secondary.light,
        width: '400px',
      }}
    >
      <div>
        <Typography variant='h2' gutterBottom>
          最近記録したファイル
        </Typography>
        <Stack spacing={2}>
          <FileMetadata name='testfile' timestamp={new Date(2023, 11, 1)} />
          <FileMetadata name='sample.txt' timestamp={new Date(2023, 11, 2)} />
        </Stack>
      </div>
    </Paper>
  );
}
