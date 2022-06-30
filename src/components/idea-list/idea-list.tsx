import { FC } from 'react';
import { List, ListItem } from '@chakra-ui/react';
import Idea from 'components/idea';
import { Idea as IdeaType } from 'types';

interface IdeaListProps {
  ideas: Array<IdeaType>;
}

const IdeaList: FC<IdeaListProps> = ({ ideas }) => {
  return (
    <List spacing={4}>
      {ideas.map((idea: IdeaType, index) => (
        <ListItem key={`item-${idea.title}-${index}`}>
          <Idea idea={idea} />
        </ListItem>
      ))}
    </List>
  );
};

export default IdeaList;
