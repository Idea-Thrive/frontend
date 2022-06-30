import { FC } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { Idea as IdeaType } from 'types';
import { useNavigate } from 'react-router-dom';
import paths from 'router/paths';
import t from 'i18n';

interface IdeaProps {
  idea: IdeaType;
}

const Idea: FC<IdeaProps> = ({ idea }) => {
  const navigate = useNavigate();

  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');

  const handleClick = () => {
    navigate(paths.ideaDetails, {
      state: {
        idea,
      },
    });
  };
  // TODO: make this component responsive for phone

  return (
    <VStack
      w="full"
      border="2px"
      borderColor={borderColor}
      borderRadius="md"
      p={3}
      spacing={5}
      cursor="pointer"
      onClick={handleClick}
      shadow="md"
    >
      <Flex alignItems="center" w="full" justifyContent="space-between">
        <HStack alignItems="center" spacing={4}>
          <Heading size="md">{idea.title}</Heading>
          <Text>{idea.creator_id}</Text>
        </HStack>

        <Box>
          <Badge colorScheme="cyan">{idea.category}</Badge>
        </Box>
      </Flex>
      <Flex w="full" justify="space-between">
        <Text
          w="50%"
          textOverflow="ellipsis"
          overflow="hidden"
          display="inline-block"
          whiteSpace="nowrap"
        >
          {idea.description}
        </Text>
        <Box>
          <Heading size="md">
            <HStack spacing={2}>
              <Text display="inline">{t('score')}</Text>
              <Text display="inline">
                {idea.up_vote_count - idea.down_vote_count}
              </Text>
            </HStack>
          </Heading>
        </Box>
      </Flex>
    </VStack>
  );
};
export default Idea;
