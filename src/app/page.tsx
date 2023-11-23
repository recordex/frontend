'use client';

import { Box, Stack } from '@mui/material';
import AppBar from './_components/AppBar';
import LoggedInOnly from './_components/LoggedInOnly';
import useEvents from './files/_hooks/useEvents';
import FileList from './files/FileList';
import RecentlyRecordedFIleList from './_components/RecentlyRecordedFIleList';
import InfoCard from './_components/Analytics';

const HomePage = () => {
  const { events, isLoading, error } = useEvents();

  return (
    <div>
      <LoggedInOnly>
        <AppBar></AppBar>
        <Box sx={{ px: 8 }}>
          <Stack direction='row' spacing={4} sx={{ mb: 4 }}>
            <RecentlyRecordedFIleList />
            <InfoCard
              title='アナリティクス'
              totalFileCount={34}
              totalVersionCount={1000}
            />
          </Stack>
          <FileList files={events} error={error} isLoading={isLoading} />
        </Box>
      </LoggedInOnly>
    </div>
  );
};

export default HomePage;
