import { useLocation } from 'react-router-dom';

function useLocationState<T>() {
  const location = useLocation();
  return location.state as T;
}

export default useLocationState;
