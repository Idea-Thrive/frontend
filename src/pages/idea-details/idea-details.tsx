import { FC } from 'react';
import useLocationState from 'hooks/use-location-state';
import {
  Box,
  VStack,
  HStack,
  Flex,
  useColorModeValue,
  Heading,
  Text,
  Badge,
  Button,
  Divider,
} from '@chakra-ui/react';
import t from 'i18n';
import { Category } from 'types';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { BiCommentDetail } from 'react-icons/bi';

const IdeaDetails: FC = () => {
  const { idea } = useLocationState<any>();
  const { title, creator, description, upVotes, downVotes, categories, id } =
    idea;

  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.300');

  console.log({
    title,
    creator,
    description,
    upVotes,
    downVotes,
    categories,
    id,
  });

  const handleRateClick = () => {
    // TODO: Open a modal and submit the rating
    console.log('rate');
  };

  return (
    <VStack
      my={10}
      w="full"
      border="2px"
      borderColor={borderColor}
      borderRadius="md"
      p={3}
      spacing={5}
      cursor="pointer"
      shadow="md"
    >
      <Flex alignItems="center" w="full" justifyContent="space-between">
        <HStack alignItems="center" spacing={4}>
          <Heading size="md">{idea.title}</Heading>
          <Text>{creator}</Text>
        </HStack>

        <HStack>
          {categories.map((category: Category) => (
            <Badge
              key={`category-${category.name}`}
              colorScheme={category.color}
            >
              {category.name}
            </Badge>
          ))}
        </HStack>
      </Flex>
      <Box w="full">
        <Text
          w="50%"
          textOverflow="ellipsis"
          overflow="hidden"
          display="inline-block"
          whiteSpace="nowrap"
        >
          {idea.description}
        </Text>
      </Box>

      <Box w="full" display="flex" justifyContent="flex-end">
        <HStack spacing={4}>
          <Button
            variant="outline"
            colorScheme="green"
            onClick={handleRateClick}
            display="flex"
          >
            <FiThumbsUp />
            <Text mx={2}>{idea.upVotes}</Text>
          </Button>
          <Button
            variant="outline"
            colorScheme="red"
            onClick={handleRateClick}
            display="flex"
          >
            <FiThumbsDown />
            <Text mx={2}>{idea.downVotes}</Text>
          </Button>
        </HStack>
      </Box>
      <Divider />
      <VStack>
        <Heading>{t('comments')}</Heading>
        {/* TODO: Implement comments */}
        <VStack>comments</VStack>
      </VStack>
    </VStack>
  );
};

export default IdeaDetails;
