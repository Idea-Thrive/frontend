import { FC } from 'react';
import {
  List,
  ListItem,
  Image,
  Box,
  Flex,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import Idea from 'components/idea';
import { Idea as IdeaType } from 'types';
import noIdeaImage from 'assets/no-idea.svg';
import t from 'i18n';

interface IdeaListProps {
  ideas: Array<IdeaType>;
}

const IdeaList: FC<IdeaListProps> = ({ ideas }) => {
  const textColor = useColorModeValue('black', 'darkGray');

  if (!ideas || ideas?.length === 0) {
    return (
      <Flex p={2} alignItems="center" justifyContent="center" w="full" h="full">
        <VStack spacing={6}>
          <Image
            h="auto"
            maxW={200}
            mx={5}
            src={noIdeaImage}
            w="100%"
            userSelect="none"
            pointerEvents="none"
          />
          <Text fontSize={20} textColor={textColor}>
            {t('noIdea')}
          </Text>
        </VStack>
      </Flex>
    );
  }

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
