import { FC } from 'react';
import { Comment as CommentType } from 'types/types';
import {
  Box,
  HStack,
  useColorModeValue,
  VStack,
  Text,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';

interface CommentPros {
  comment: CommentType;
}

const Comment: FC<CommentPros> = ({ comment }) => {
  const textColor = useColorModeValue('gray.600', 'whiteAlpha.700');

  return (
    <Box w="full">
      <VStack w="full">
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <Text>{comment.description}</Text>
          <HStack spacing={2}>
            <Text fontSize="xl" display="inline">
              {comment.score}
            </Text>
            <FiStar size={24} color="gold" />
          </HStack>
        </Flex>
        <Box w="full" textAlign="start" textColor={textColor}>
          <Text>{comment.created_at}</Text>
        </Box>
      </VStack>
      <Divider />
    </Box>
  );
};

export default Comment;
