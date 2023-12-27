import { Box, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { apiFetchPatents } from 'src/utils/api-endpoints';
import { useDebounce } from 'src/utils/useDebounce';

interface Props {
  searchVal: string;
}

export const PatentTable = ({ searchVal }: Props) => {
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState<null | number>(null);
  const itemsPerPage = 10;

  const [data, setData] = useState<Patent[]>([]);

  const fetchData = async (query: string, itemsPerPage: number, currentPage: number) => {
    setLoading(true);

    try {
      const res = await apiFetchPatents(query, itemsPerPage, currentPage);

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
    fetchData(searchVal, itemsPerPage, currentPage);
  }, [currentPage, searchVal]);

  return loading ? (
    <Box>Loading...</Box>
  ) : (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Idx</TableCell>
              <TableCell align="left">Idx 2</TableCell>
              <TableCell align="left">Patent Id</TableCell>
              <TableCell align="left">Patent Text</TableCell>
              <TableCell align="left">Phase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row?.idx}
                </TableCell>
                <TableCell align="left">{row?.idx_2}</TableCell>
                <TableCell align="left">{row?.patent_id}</TableCell>
                <TableCell align="left">{row?.patent_text}</TableCell>
                <TableCell align="left">{row?.phase}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {totalItems && (
        <Pagination count={Math.ceil(totalItems / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
      )}
    </>
  );
};
