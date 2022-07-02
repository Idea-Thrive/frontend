import { FC } from 'react';
import { Comment } from 'types/types';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import t from 'i18n';
import CommentComponent from 'components/comment';

interface CommentListProps {
  comments: Array<Comment>;
}

const CommentList: FC<CommentListProps> = ({ comments }) => {
  console.log(comments);

  const textColor = useColorModeValue('gray.600', 'whiteAlpha.700');

  const renderEmptyList = () => (
    <Heading size="md" textColor={textColor}>
      {t('noCommentYet')}
    </Heading>
  );

  if (!comments || comments?.length === 0) {
    return (
      <Box mb={3} textAlign="center" w="full">
        {renderEmptyList()}
      </Box>
    );
  }

  return (
    <Box mb={3} w="full">
      {comments.map((comment: Comment) => (
        <CommentComponent comment={comment} key={comment.id} />
      ))}
    </Box>
  );
};

export default CommentList;
