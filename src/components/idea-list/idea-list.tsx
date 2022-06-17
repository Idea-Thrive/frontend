import { FC } from 'react';
import { VStack, List, ListItem } from '@chakra-ui/react';
import Idea from 'components/idea';

interface IdeaListProps {
  ideas: any;
}

const IdeaList: FC<IdeaListProps> = ({ ideas }) => {
  return (
    <List spacing={4}>
      {ideas.map((idea: any) => (
        <ListItem>
          <Idea key={idea.id} {...idea} />
        </ListItem>
      ))}
    </List>
  );
};

export default IdeaList;