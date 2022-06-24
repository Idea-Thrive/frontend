import { FC } from 'react';
import useLocationState from 'hooks/use-location-state';

const IdeaDetails: FC = () => {
  const { idea } = useLocationState<any>();
  const { title, creator, description, upVotes, downVotes, categories, id } =
    idea;
  console.log({
    title,
    creator,
    description,
    upVotes,
    downVotes,
    categories,
    id,
  });
  return <>Idea</>;
};

export default IdeaDetails;
