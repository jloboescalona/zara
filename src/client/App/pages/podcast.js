import { alpha, styled } from '@mui/material/styles';
import {
  useGetPodcastData,
  useGetPodcastGenericData,
  useRedirectToHome
} from 'client/App/hooks';

import Box from '@mui/material/Box';
import EpisodeTable from 'client/App/components/table';
import Grid from '@mui/material/Grid';
import Sidebar from 'client/App/components/sidebar';
import { useParams } from 'react-router-dom';

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

const Podcast = () => {
  useRedirectToHome()
  const genericPodcastData = useGetPodcastGenericData()
  const { podcastId } = useParams()

  const {episodes, track} = useGetPodcastData()

  if (!track?.length || !episodes?.length){
    return ""
  }

  return (
  <section className="Podcast">
    <StyledGrid container>
      <Grid item xs={12} md={3}>
        <Sidebar data={{...track?.[0], description: genericPodcastData?.[0].summary?.label }}/>
      </Grid>
      <StyledGridDetail item xs={12} md={9}>
        <StyledBox>
          <b>{`Episodes: ${episodes.length || 0}`}</b>
        </StyledBox>
        <EpisodeTable data={episodes} podcastId={podcastId}/>
      </StyledGridDetail>
    </StyledGrid>
  </section>
)}

export default Podcast