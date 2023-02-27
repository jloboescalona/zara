import { useNavigate, useParams } from 'react-router-dom';

import { useEffect } from 'react';
import {useGetPoscastsBySelector} from 'client/App/hooks/useGetPoscastsBySelector'

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