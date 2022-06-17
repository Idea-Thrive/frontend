import { FC } from 'react';
import { VStack } from '@chakra-ui/react';
import Idea from 'components/idea';

interface IdeaListProps {
  ideas: any;
}

const IdeaList: FC<IdeaListProps> = ({ ideas }) => {
  return (
    <VStack spacing={4}>
      {ideas.map((idea: any) => (
        <Idea key={idea.id} {...idea} />
      ))}
    </VStack>
  );
};

export default IdeaList;
