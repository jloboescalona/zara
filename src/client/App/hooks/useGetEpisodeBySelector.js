import { api } from 'client/App/api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const useGetEpisodeBySelector = () => {
  const { podcastId, episodeId } = useParams()

  const {data} = useSelector(
    api.endpoints.getPostcastByID.select(podcastId)
  )

  return data?.results?.filter((episode) => episode?.trackId === +episodeId)
}
