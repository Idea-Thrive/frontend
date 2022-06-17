import { FC } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { Category } from 'types';
import { useNavigate } from 'react-router-dom';
import paths from 'router/paths';
import t from 'i18n';

interface IdeaProps {
  title: string;
  creator: string;
  description: string;
  upVotes: number;
  downVotes: number;
  categories: Array<Category>;
  id: number;
}

const Idea: FC<IdeaProps> = ({
  title,
  creator,
  description,
  upVotes,
  downVotes,
  categories,
  id,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${paths.ideaDetails}?id=${id}`);
  };

  return (
    <VStack
      w="full"
      border="2px"
      borderColor="whiteAlpha.300"
      borderRadius="md"
      p={3}
      spacing={5}
      cursor="pointer"
      onClick={handleClick}
    >
      <Flex alignItems="center" w="full" justifyContent="space-between">
        <HStack alignItems="center" spacing={4}>
          <Heading size="md">{title}</Heading>
          <Text>{creator}</Text>
        </HStack>

        <HStack>
          {categories.map((category) => (
            <Badge colorScheme={category.color}>{category.name}</Badge>
          ))}
        </HStack>
      </Flex>
      <Flex w="full" justify="space-between">
        <Text
          w="50%"
          textOverflow="ellipsis"
          overflow="hidden"
          display="inline-block"
          whiteSpace="nowrap"
        >
          {description}
        </Text>
        <Box>
          <Heading size="md">
            <HStack spacing={2}>
              <Text display="inline">{t('score')}</Text>
              <Text display="inline">{upVotes - downVotes}</Text>
            </HStack>
          </Heading>
        </Box>
      </Flex>
    </VStack>
  );
};
export default Idea;
