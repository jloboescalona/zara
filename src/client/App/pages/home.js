import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import PodCastCard from 'client/App/components/card';
import React from 'react'
import { styled } from '@mui/material/styles';
import { useGetPodcastsQuery } from 'client/App/api';
import { useState } from 'react';

const StyledBox = styled(Box)(() => ({
  '&': {
    display: 'flex',
    justifyContent: "flex-end",
    marginTop: "20px"
  },
  '& > input': {
    marginLeft: '10px'
  }
}))

const Rows = ({data = [], filter="", handleChange= ()=>undefined}) => {
  let filteredData = data

  if(filter){
    filteredData = data?.filter(entry=>{
      return entry?.['im:name']?.label?.toLowerCase?.()?.includes(filter) || entry?.['im:artist']?.label?.toLowerCase?.()?.includes(filter)
    })
  }

  return (
    <>
      <StyledBox>
        <Chip color="primary" label={filteredData?.length || 0} /> <input onChange={handleChange} />
      </StyledBox>
      <Grid container>
        {
          filteredData.map((item, i) => (
            <Grid item xs={12} md={4} key={`postcast-${i}`}>
              <PodCastCard data={item}/>
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}

const Home = () => {
  const {data} = useGetPodcastsQuery()
  const [filter, setFilter] = useState();

  const handleChange = (event) => {
    setFilter(event.target.value)
  }
  
  return (
    <section className="Home">
      <Rows data={data?.feed?.entry} filter={filter} handleChange={handleChange} />
    </section>
  )
}

export default Home