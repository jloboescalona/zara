import {useGetPoscastsBySelector} from 'client/App/hooks/useGetPoscastsBySelector'
import { useParams } from 'react-router-dom';

export const useGetPodcastGenericData = () => {
  const { podcastId } = useParams()
  const data = useGetPoscastsBySelector()

  return Array.isArray(data?.feed?.entry) && data?.feed?.entry.filter((entry)=>entry?.id?.attributes?.['im:id'] === podcastId)
}