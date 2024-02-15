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
import {
  createRecord,
  PostRecordResponse,
} from '@/app/files/record/_hooks/createRecord';
import PDFViewer from '@/app/_components/PDFViewer';
import Carousel from '@/app/_components/Carousel';

const RecordFileInput = () => {
  const [activeStep, setActiveStep] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [blob, setBlob] = useState<File>();

  const { token } = useUser();

  const router = useRouter();

  const onCheckDiffPDF = async () => {
    if (!token || !blob) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveStep(activeStep + 1);
    }, 2000);
  };

  const onRecordClick = async () => {
    if (!token || !blob) {
      return;
    }
    console.log(blob);
    setIsLoading(true);
    let response: PostRecordResponse;
    try {
      response = await createRecord(token, blob);
      console.log(response);
    } catch (e) {
      setIsLoading(false);
      console.error(e);
      return;
    }
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
        <Stack direction='row' justifyContent='space-between' mb={4}>
          <div>
            {activeStep !== 0 && (
              <Button
                variant='contained'
                sx={{ mt: 4 }}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                前へ
              </Button>
            )}
          </div>
          <div>
            {activeStep !== 1 && (
              <Button
                variant='contained'
                sx={{ mt: 4 }}
                onClick={onCheckDiffPDF}
                disabled={!blob}
              >
                差分を確認する
              </Button>
            )}
            {activeStep === 1 && (
              <Button
                variant='contained'
                color='secondary'
                sx={{ mt: 4 }}
                onClick={onRecordClick}
              >
                記録する
              </Button>
            )}
          </div>
        </Stack>
        <Carousel pageIndex={activeStep}>
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
          <Box sx={{ width: '100%', p: 1, boxSizing: 'border-box' }}>
            <PDFViewer file='https://storage.googleapis.com/recordex/diff.pdf' />
          </Box>
        </Carousel>
      </Box>
    </Paper>
  );
};

export default RecordFileInput;
