import { FC } from 'react';
import { getQueryParam } from 'utils/query-param';

interface IdeaDetailsProp {
  location: any;
}

const IdeaDetails: FC<IdeaDetailsProp> = () => {
  const id = getQueryParam('id');
  return <>{id}</>;
};

export default IdeaDetails;
