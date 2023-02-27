import { alpha, styled } from '@mui/material/styles';
import { parseDate, parseDuration } from 'client/App/utils';

import { Box } from '@mui/system';
import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";

const StyledTableContainer = styled(TableContainer)(({theme}) => ({
  '&': {
    boxShadow: `0px 2px 1px -1px ${alpha(theme.palette.success.main, 0.20)},0px 1px 1px 0px ${alpha(theme.palette.success.main, 0.14)}, 0px 1px 3px 0px ${alpha(theme.palette.success.main, 0.12)}`,
    marginTop: '20px'
  },
}))

const StyledTableRow = styled(TableRow)(() => ({
  '&': {
    cursor: 'pointer'
  },
}))

const EpisodeRow = ({data = {}, podcastId = '', navigate}) => {
  return (
    <StyledTableRow onClick={()=>{navigate(`/podcast/${podcastId}/episode/${data?.trackId}`)}} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {data?.trackName}
        </TableCell>
        <TableCell align="right">{parseDate(data?.releaseDate)}</TableCell>
        <TableCell align="right">{parseDuration(data?.trackTimeMillis)}</TableCell>
    </StyledTableRow>
  )
}

const EpisodeTable = ({data = [], podcastId=''}) => {
  let navigate = useNavigate();

  return (
  <StyledTableContainer component={Box}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell><b>Title</b></TableCell>
          <TableCell align="right"><b>Date</b></TableCell>
          <TableCell align="right"><b>Duration</b></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, i) => (
          <EpisodeRow key={`podcast-${i}`} data={row} podcastId={podcastId} navigate={navigate}/>
        ))}
      </TableBody>
    </Table>
  </StyledTableContainer>
)}

export default EpisodeTable