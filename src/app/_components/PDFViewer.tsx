'use client';

import { useState } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import { Button } from '@mui/material';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// PDF.jsのワーカーの設定
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  file: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ file }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1); // 現在のページ番号

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    if (numPages === null) return; // numPagesがnullなら何もしない
    setPageNumber((prevPageNumber) =>
      prevPageNumber < numPages ? prevPageNumber + 1 : prevPageNumber,
    );
  };

  const previousPage = () => {
    if (numPages === null) return; // numPagesがnullなら何もしない
    setPageNumber((prevPageNumber) =>
      prevPageNumber > 1 ? prevPageNumber - 1 : prevPageNumber,
    );
  };

  return (
    <>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={{ cMapUrl: '/cmaps/', cMapPacked: true }}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <Button
          onClick={previousPage}
          disabled={pageNumber <= 1}
          variant='outlined'
          sx={{ mr: 4 }}
        >
          前のページ
        </Button>
        ページ {pageNumber} / {numPages}
        <Button
          onClick={nextPage}
          disabled={pageNumber >= (numPages ?? 0)}
          variant='outlined'
          sx={{ ml: 4 }}
        >
          次のページ
        </Button>
      </div>
    </>
  );
};

export default PDFViewer;
