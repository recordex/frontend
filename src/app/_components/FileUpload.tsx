import { Button, Stack, Typography, useTheme } from '@mui/material'; // useThemeをインポート
import { useRef } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'; // アイコンをインポート

type Props = {
  label: string;
  file: File | undefined;
  setFile: (file: File) => void;
};

const FileUploadButton = ({ file, label, setFile }: Props) => {
  const theme = useTheme(); // テーマを使用
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        startIcon={<FileUploadIcon />}
        onClick={() => inputRef.current?.click()}
        sx={{ height: '100%' }}
      >
        {label}
      </Button>
      <input
        ref={inputRef}
        type='file'
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
      {file && (
        <Stack alignItems='center' spacing={1} mt={3} mb={3}>
          <CheckCircleOutlineIcon color='success' />
          <Typography
            variant='subtitle1'
            style={{ color: theme.palette.primary.main }}
          >
            ファイルが選択されました
          </Typography>
          <Typography
            variant='subtitle1'
            style={{ color: theme.palette.primary.main }}
          >
            {file.name}
          </Typography>
        </Stack>
      )}
    </>
  );
};

export default FileUploadButton;
