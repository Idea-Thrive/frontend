import { shallowEqual, useSelector } from 'react-redux';

function useStateToProps(selection: any, equality = shallowEqual): any {
  return useSelector(selection, equality);
}

export default useStateToProps;
