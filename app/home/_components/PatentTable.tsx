import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface Props {
  data: Patent[];
}

export const PatentTable = ({ data }: Props) => {
  return (
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
  );
};
