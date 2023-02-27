import { useGetPostcastByIDQuery } from 'client/App/api';
import { useParams } from 'react-router-dom';

export const useGetPodcastData = () => {
  const { podcastId } = useParams()
  const { data } = useGetPostcastByIDQuery(podcastId)

  const results = data?.results

  return {
    track: results?.filter((item)=>item?.wrapperType === 'track'),
    episodes: results?.filter((item)=>item?.wrapperType === 'podcastEpisode')
  }
}