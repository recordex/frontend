import {
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { mainTheme } from '@/themes/main';
import FileUploadButton from '@/app/_components/FileUpload';
import { useState } from 'react';
import useUser from '@/app/_hooks/useUser';
import { useRouter } from 'next/navigation';
import { createRecord } from '@/app/files/record/_hooks/createRecord';

const RecordFileInput = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [blob, setBlob] = useState<File>();

  const { token } = useUser();

  const router = useRouter();

  const onRecordClick = async () => {
    if (!token || !blob) {
      return;
    }
    console.log(blob);
    setIsLoading(true);
    const response = await createRecord(token, blob);
    console.log(response);
    setIsLoading(false);
    router.push('/');
  };

  return (
    <Paper elevation={0}>
      {isLoading && (
        <Box>
          <LinearProgress />
        </Box>
      )}
      <Box p={4}>
        <Typography variant='h2' sx={{ mb: 4 }}>
          記録の作成
        </Typography>
        <Box sx={{ width: '100%', p: 1, boxSizing: 'border-box' }}>
          <Typography variant='h3' gutterBottom>
            ファイルの選択
          </Typography>
          <Stack
            sx={{
              background: mainTheme.palette.primary.light,
              height: 400,
              justifyContent: 'center',
            }}
          >
            <FileUploadButton
              label='ここからファイルを選択してください'
              file={blob}
              setFile={(blob) => setBlob(blob)}
            />
          </Stack>
          <Box m={1}>
            <Typography>・1度に記録できるファイルは1つのみです</Typography>
          </Box>
        </Box>
        <Stack direction='row' justifyContent='space-between'>
          <Button
            variant='contained'
            color='secondary'
            sx={{ mt: 4 }}
            onClick={onRecordClick}
            disabled={!blob}
          >
            記録する
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default RecordFileInput;
