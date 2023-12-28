'use client';

import { NextPage } from 'next';
import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { apiFetchDownloadPatents } from 'src/utils/api-endpoints';

/**
 * Main page of the Application
 * @page Home
 */
const Download: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState<DownloadData[]>([]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await apiFetchDownloadPatents();

      setData(res?.data);
      setLoading(false);
    } catch (e) {
      console.log('e-', e);
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const headers = Object.keys(data[0]);
    const csvContent =
      headers.join(',') +
      '\n' +
      data.map((row) => headers.map((header) => row[header as keyof typeof row]).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'output.csv';
    link.click();
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log('### data-', data);

  return loading ? (
    <>Loading...</>
  ) : (
    <Stack spacing={2} padding={2}>
      <Box my={2}>
        <Button variant="contained" onClick={downloadCSV}>
          Download
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">distinct_idx_count</TableCell>
              <TableCell align="left">distinct_idx_2_count</TableCell>
              <TableCell align="left">distinct_patent_id_count</TableCell>
              <TableCell align="left">distinct_phase_count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row, i) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row?.date || '-'}
                </TableCell>
                <TableCell align="left">{row?.distinct_idx_count}</TableCell>
                <TableCell align="left">{row?.distinct_idx_2_count}</TableCell>
                <TableCell align="left">{row?.distinct_patent_id_count}</TableCell>
                <TableCell align="left">{row?.distinct_phase_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Download;
