import { formatDate } from '@/lib/formatDate';
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowParams,
  GridValueGetterParams,
} from '@mui/x-data-grid';
import EventStatusChop from './_components/EventStatusChip';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import {GOOGLE_CLOUD_STORAGE_ENDPOINT} from "@/app/constants";

type FileListProps = {
  files: SafaEvent[] | undefined;
  error: Error | undefined;
  isLoading: boolean;
};

const FileList = ({ files, error, isLoading }: FileListProps) => {
  const handleRowClick = (params: GridRowParams) => {
    // 外部 URL に対しては router.push より window.location の方が適している
    // 参照: https://nextjs-ja-translation-docs.vercel.app/docs/api-reference/next/router
    // 参照: https://developer.mozilla.org/ja/docs/Web/API/Window/location
    window.location.assign(`${GOOGLE_CLOUD_STORAGE_ENDPOINT}/${params.id}`);
  };

  const columns: GridColDef[] = [
    // ethereum のトランザクションステータス
    // ガス不足やスマートコントラクトのエラー、署名が無効等の不正なトランザクションのときは failed になる
    {
      field: 'fileName',
      headerName: 'ファイル名',
      width: 350,
      renderCell: (params: GridRenderCellParams) => (
        <EventStatusChop
          label={params.row.fileName.label}
          color={params.row.fileName.color}
        />
      ),
    },
    {
      field: 'recordedAt',
      headerName: '記録日時',
      width: 180,
      valueGetter: (params: GridValueGetterParams) =>
        formatDate(params.row.recordedAt),
    },
  ];

  return (
    <Paper elevation={0}>
      {isLoading && (
        <Box>
          <LinearProgress />
        </Box>
      )}
      <Box sx={{ p: 4 }}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='h2' sx={{ mb: 4 }}>
            ファイル一覧
          </Typography>
          <Link href='/files/record'>
            <Button variant='contained' startIcon={<AddIcon />}>
              記録を作成する
            </Button>
          </Link>
        </Stack>
        {error && (
          <Alert severity='error' sx={{ mb: 4 }}>
            <AlertTitle>データを取得できませんでした</AlertTitle>
            {error.message}
          </Alert>
        )}
        <DataGrid
          rows={files || []}
          columns={columns}
          onRowClick={handleRowClick}
          sx={{
            border: 'none',
            '&:hover': {
              cursor: 'pointer',
            },
            // 横線を消す
            '& .MuiDataGrid-cell': {
              border: 'none',
            },
            fontSize: '1rem',
            // ヘッダーの文字色
            '& .MuiDataGrid-columnHeaderTitle': {
              color: 'gray',
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default FileList;
