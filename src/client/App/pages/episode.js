import { alpha, styled } from '@mui/material/styles';
import {
  useGetEpisodeBySelector,
  useGetPodcastData,
  useGetPodcastGenericData,
  useRedirectToHome
} from 'client/App/hooks';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import React from 'react'
import Sidebar from 'client/App/components/sidebar';
import Typography from '@mui/material/Typography';

const StyledBox = styled(Box)(({theme}) => ({
  '&': {
    boxShadow: `0px 2px 1px -1px ${alpha(theme.palette.success.main, 0.20)},0px 1px 1px 0px ${alpha(theme.palette.success.main, 0.14)}, 0px 1px 3px 0px ${alpha(theme.palette.success.main, 0.12)}`,
    padding: '20px 10px',
  },
}))

const StyledGrid = styled(Grid)(({container}) => {
  if(container){
    return {
      marginTop: '20px',
    }
  }
})

const StyledGridDetail = styled(Grid)(({item}) => {
  if(item){
    return {
      paddingLeft: '20px',
    }
  }
})

const Episode = () => {
  useRedirectToHome()
  const genericPodcastData = useGetPodcastGenericData()
  const episodeData = useGetEpisodeBySelector()

  const {track} = useGetPodcastData()

  if (!track?.length || !episodeData.length){
    return ""
  }

  return (
    <section className="Episode">
      <StyledGrid container>
        <Grid item xs={12} md={3}>
          <Sidebar data={{...track?.[0], description: genericPodcastData?.[0].summary?.label }}/>
        </Grid>
        <StyledGridDetail item xs={12} md={9}>
          <StyledBox>
            <Typography gutterBottom variant="h6" component="div">
              {episodeData?.[0]?.trackName || ''}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {episodeData?.[0]?.description || ''}
            </Typography>
            <hr/>
            <audio controls autoPlay>
              <source src={episodeData?.[0]?.episodeUrl} type="audio/mpeg"/>
            </audio>
          </StyledBox>
        </StyledGridDetail>
      </StyledGrid>
    </section>
  )
}

export default Episode