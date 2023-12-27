'use client';

import { NextPage } from 'next';
import { Box, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { PatentTable } from './_components/PatentTable';
import { Analytics } from './_components/Analytics';
import { useDebounce } from 'src/utils/useDebounce';

/**
 * Main page of the Application
 * @page Home
 */
const Home: NextPage = () => {
  const [searchVal, setSearchVal] = useState('');
  const trimmedSearchVal = searchVal?.trim();

  const debouncedInputValue = useDebounce(trimmedSearchVal, 1000);

  return (
    <Stack spacing={2} padding={2}>
      <Stack>
        <Box mb={6}>
          <TextField
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            sx={{ maxWidth: 400 }}
            size="small"
          />
        </Box>

        <Analytics searchVal={debouncedInputValue} />

        <PatentTable searchVal={debouncedInputValue} />
      </Stack>
    </Stack>
  );
};

export default Home;
