import React, { FC } from 'react';

interface IdeaDetailsProp {
  location: any;
}

const IdeaDetails: FC<IdeaDetailsProp> = ({ location }) => {
  console.log(location);
  return <>{location.state.id}</>;
};

export default IdeaDetails;
