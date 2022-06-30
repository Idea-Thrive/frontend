import { useState, useEffect } from 'react';
import {
  Box,
  IconButton,
  useToast,
  Button,
  Text,
  Divider,
  HStack,
  Avatar,
  Flex,
} from '@chakra-ui/react';
import DashboardDrawer from 'components/dashboard-drawer';
import { FiMenu } from 'react-icons/fi';
import { HiPlus } from 'react-icons/hi';
import { getIdeas } from 'service/api-helper/home';
import t from 'i18n';
import IdeaList from 'components/idea-list';
import { useNavigate } from 'react-router-dom';
import paths from 'router/paths';
import useStateToProps from 'store/hooks/use-state-to-props';
import Filter from 'components/filter';
import { useDispatch } from 'react-redux';
import { updateIdeas as updateStoreIdeas } from 'store/slices/app-slice';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  const { firstName, lastName, companyId, filteredIdeas } = useStateToProps(
    (state: any) => ({
      filteredIdeas: state.app.filteredIdeas,
      firstName: state.app.user?.first_name,
      lastName: state.app.user?.last_name,
      companyId: state.app.user?.company_id,
    }),
  );

  const updateIdeas = async () => {
    try {
      const { data } = await getIdeas({
        companyId,
        offset: 0,
        size: 100,
        category: 'shit',
      });

      dispatch(updateStoreIdeas(data.data));
      // const {
      //   data: { data, ok },
      // } = await getIdeas({});
      // if (ok) {
      //   setIdeas(data);
      // }
    } catch (error) {
      toast({
        title: t('anErrorHasOccurred'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  useEffect(() => {
    if (companyId) {
      updateIdeas();
    }
  }, [companyId]);

  const handleDrawerVisibilityChange = () => {
    setDrawerVisibility(false);
  };

  const handleMenuClick = () => {
    setDrawerVisibility(true);
  };

  const handleCreateNewIdeaClick = () => {
    navigate(paths.createNewIdea);
  };

  const handleFilterChange = (filter: string) => {
    console.log(filter);
  };

  const handleFilterClear = () => {
    console.log('clear');
  };

  return (
    <Box px={{ base: 5, lg: 0 }} py={{ base: 3, md: 10 }} w="full">
      <DashboardDrawer
        visibility={drawerVisibility}
        onVisibilityChange={handleDrawerVisibilityChange}
        title="title"
      />
      <Flex justifyContent="space-between" alignItems="center">
        <HStack spacing={4}>
          <Avatar name={`${firstName} ${lastName}`} />
          <HStack>
            <Text>{firstName}</Text>
            <Text>{lastName}</Text>
          </HStack>
        </HStack>
        <IconButton
          onClick={handleMenuClick}
          size="md"
          icon={<FiMenu size={18} />}
          aria-label="Open Dashboard"
          colorScheme="gray"
        />
      </Flex>
      <Divider m={3} />
      <Flex
        mb={3}
        width="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          onClick={handleCreateNewIdeaClick}
          colorScheme="telegram"
          variant="outline"
        >
          <Text mx={2}>{t('createNewIdea')}</Text>
          <HiPlus size={22} />
        </Button>
        <Filter
          onFilterChange={handleFilterChange}
          onFilterClear={handleFilterClear}
        />
      </Flex>
      <IdeaList ideas={filteredIdeas} />
    </Box>
  );
}

export default Home;
