import { useEffect } from 'react';

function useDidMount(fn: any) {
  return useEffect(fn, []);
}

export default useDidMount;
