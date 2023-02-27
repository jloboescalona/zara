import { api } from 'client/App/api';
import { useSelector } from 'react-redux';

export const useGetPoscastsBySelector = () => {
  const { data } = useSelector(api.endpoints.getPodcasts.select())
  
  return data
}