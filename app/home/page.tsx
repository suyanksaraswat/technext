'use client';

import { Metadata, NextPage } from 'next';
import { Pagination, Stack, TextField, Typography } from '@mui/material';
import { AppLink } from 'src/components';
import { apiFetchPatents } from 'src/utils/api-endpoints';
import { useEffect, useState } from 'react';
import { PatentTable } from './_components/PatentTable';
import { useDebounce } from 'src/utils/useDebounce';

/**
 * Main page of the Application
 * @page Home
 */
const Home: NextPage = () => {
  const [searchVal, setSearchVal] = useState('');
  const [loading, setLoading] = useState(false);
  const trimmedSearchVal = searchVal?.trim();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState<null | number>(null);
  const itemsPerPage = 10;

  const debouncedInputValue = useDebounce(trimmedSearchVal, 1000);

  const [data, setData] = useState<Patent[]>([]);

  const fetchData = async (query: string, itemsPerPage: number, currentPage: number) => {
    setLoading(true);

    try {
      const res = await apiFetchPatents(query, itemsPerPage, currentPage);

      console.log('## res-', res);
      setData(res?.data);
      setTotalItems(res?.count);
      setLoading(false);
    } catch (e) {
      console.log('e-', e);
      setLoading(false);
    }
  };

  const handlePageChange = (event: any, newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    fetchData(debouncedInputValue, itemsPerPage, currentPage);
  }, [currentPage, debouncedInputValue]);

  return (
    <Stack spacing={2} padding={2}>
      <Stack>
        {/* {JSON.stringify(res?.data)} */}
        {/* <Typography variant="h3">About application</Typography>
        <Typography variant="body1">
          This application is a mix of{' '}
          <AppLink href="https://nextjs.org/docs/api-reference/create-next-app">Create Next App</AppLink> and{' '}
          <AppLink href="https://mui.com/">MUI</AppLink> with set of reusable components and utilities to build
          professional <AppLink href="https://nextjs.org/">NextJS</AppLink> application faster.
        </Typography> */}

        <TextField
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          sx={{ maxWidth: 400 }}
          size="small"
        />

        {loading ? (
          <>Loading...</>
        ) : debouncedInputValue ? (
          <>
            <PatentTable data={data} />

            {totalItems && (
              <Pagination count={Math.ceil(totalItems / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
            )}
          </>
        ) : (
          'Try searching something!'
        )}
      </Stack>
    </Stack>
  );
};

export default Home;
