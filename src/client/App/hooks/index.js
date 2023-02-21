import { api, useGetPostcastByIDQuery } from 'client/App/api';
import { useNavigate, useParams } from 'react-router-dom';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useGetPodcastData = () => {
  const { podcastId } = useParams()
  const { data } = useGetPostcastByIDQuery(podcastId)

  const results = data?.results

  return {
    track: results?.filter((item)=>item?.wrapperType === 'track'),
    episodes: results?.filter((item)=>item?.wrapperType === 'podcastEpisode')
  }
}

export const useGetPoscastsBySelector = () => {
  const { data } = useSelector(api.endpoints.getPodcasts.select())
  
  return data
}

export const useGetEpisodeBySelector = () => {
  const { podcastId, episodeId } = useParams()

  const {data} = useSelector(
    api.endpoints.getPostcastByID.select(podcastId)
  )

  return data?.results?.filter((episode) => episode?.trackId === +episodeId)
}

export const useGetPodcastGenericData = () => {
  const { podcastId } = useParams()
  const data = useGetPoscastsBySelector()

  return Array.isArray(data?.feed?.entry) && data?.feed?.entry.filter((entry)=>entry?.id?.attributes?.['im:id'] === podcastId)
}

export const useRedirectToHome = (path='/')=> {
  const navigate = useNavigate();
  const { podcastId } = useParams()
  const data  = useGetPoscastsBySelector()
  useEffect(() => {
    const existData = Array.isArray(data?.feed?.entry) && data?.feed?.entry.some((entry)=>entry?.id?.attributes?.['im:id'] === podcastId)

    if(!existData) {
      navigate(path)
    }
  }, [podcastId, data]);
}
