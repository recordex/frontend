'use client';

import AppBar from '@/app/_components/AppBar';
import { Container } from '@mui/system';
import RecordFileInput from '@/app/_components/RecordFileInput';

const RecordPage = () => {
  return (
    <div>
      <AppBar />
      <Container maxWidth='lg'>
        <RecordFileInput />
      </Container>
    </div>
  );
};

export default RecordPage;
