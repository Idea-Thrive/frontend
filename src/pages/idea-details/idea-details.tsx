import { FC, useEffect, useState } from 'react';
import useLocationState from 'hooks/use-location-state';
import {
  Box,
  VStack,
  HStack,
  Flex,
  Heading,
  Text,
  Badge,
  Button,
  Divider,
  useColorModeValue,
  Skeleton,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import t, { getCurrentLanguage } from 'i18n';
import { Category } from 'types';
import Header from 'components/header';
import Page from 'components/page';
import { getComments } from 'service/api-helper/comment';
import useDidMount from 'hooks/use-did-mount';
import { STATUS_OK } from 'constants/constants';
import { Comment, Criteria } from 'types/types';
import CommentList from 'components/comment-list';
import { FiStar } from 'react-icons/fi';
import { BiCommentDetail } from 'react-icons/bi';
import RateModal from 'components/rate-modal';
import { getAllCriteria } from 'service/api-helper/criteria';

const IdeaDetails: FC = () => {
  const toast = useToast();
  const textColor = useColorModeValue('gray.600', 'whiteAlpha.700');
  const [commentLoading, setCommentLoading] = useState(true);
  const [comments, setComments] = useState<Array<Comment>>([]);
  const [rateModalVisibility, setRateModalVisibility] = useState(false);
  const [criteria, setCriteria] = useState<Array<Criteria>>([]);
  const [criteriaLoading, setCriteriaLoading] = useState(false);

  const { idea } = useLocationState<any>();
  const {
    title,
    category,
    description,
    score,
    creator_id,
    created_at,
    id,
    category_id,
  } = idea;

  const initializeComments = async () => {
    try {
      const { data, status } = await getComments({ idea_id: id });

      if (status === STATUS_OK) {
        setComments(data);
        setCommentLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: t('anErrorHasOccurred'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  useDidMount(() => {
    initializeComments();
  });

  const handleRateClick = async () => {
    setCriteriaLoading(true);
    try {
      const { status, data } = await getAllCriteria({
        categoryId: category_id,
      });

      if (status === STATUS_OK) {
        setCriteria(data);
        setRateModalVisibility(true);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: t('anErrorHasOccurred'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
    } finally {
      setCriteriaLoading(false);
    }
  };

  const renderCreationTime = (date: any) => {
    const { locale } = getCurrentLanguage();
    const formatted = new Intl.DateTimeFormat(locale).format(new Date());
    console.log(formatted);
    return (
      <Box w="full" textColor={textColor}>
        <Text display="inline">{t('createdAt')}</Text>
        <Text fontWeight="bold" display="inline">
          {formatted}
        </Text>
      </Box>
    );
  };

  const handleRateModalVisibilityChange = () => {
    setRateModalVisibility(false);
  };

  const handleRateSubmit = () => {
    initializeComments();
    setRateModalVisibility(false);
  };

  return (
    <Page>
      <Header />
      <RateModal
        visibility={rateModalVisibility}
        onVisibilityChange={handleRateModalVisibilityChange}
        criteria={criteria}
        onSubmit={handleRateSubmit}
        ideaId={id}
      />
      <VStack w="full" borderRadius="md" spacing={5} shadow="md" py={2} px={4}>
        <Flex alignItems="center" w="full" justifyContent="space-between">
          <HStack alignItems="center" spacing={4}>
            <Heading size="md">{title}</Heading>
            <Text>{creator_id}</Text>
          </HStack>

          <Box>
            <Badge colorScheme="linkedin">{category}</Badge>
          </Box>
        </Flex>
        <Box w="full">
          <Text
            w="50%"
            textOverflow="ellipsis"
            overflow="hidden"
            display="inline-block"
            whiteSpace="nowrap"
          >
            {description}
          </Text>
        </Box>

        {renderCreationTime(created_at)}

        <Flex w="full" alignItems="center" justifyContent="space-between">
          <Box w="full" mx={4}>
            {criteriaLoading ? (
              <Spinner />
            ) : (
              <BiCommentDetail
                cursor="pointer"
                size={24}
                onClick={handleRateClick}
              />
            )}
          </Box>
          <HStack spacing={2}>
            <Text fontSize="xl" display="inline">
              {score}
            </Text>
            <FiStar size={24} color="gold" />
          </HStack>
        </Flex>

        <Divider />
        <VStack w="full" spacing={6}>
          <Heading size="lg">{t('comments')}</Heading>

          <Skeleton w="full" isLoaded={!commentLoading}>
            <CommentList comments={comments} />
          </Skeleton>
        </VStack>
      </VStack>
    </Page>
  );
};

export default IdeaDetails;
