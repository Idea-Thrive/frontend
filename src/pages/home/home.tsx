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

function Home() {
  const navigate = useNavigate();
  const toast = useToast();
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [ideas, setIdeas] = useState([]);

  const { firstName } = useStateToProps((state: any) => ({
    firstName: state.app.user?.first_name,
  }));

  const updateIdeas = async () => {
    try {
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
    updateIdeas();
  }, []);

  const handleDrawerVisibilityChange = () => {
    setDrawerVisibility(false);
  };

  const handleMenuClick = () => {
    setDrawerVisibility(true);
  };

  const handleCreateNewIdeaClick = () => {
    navigate(paths.createNewIdea);
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
          <Avatar name={firstName} />
          <Text>{firstName}</Text>
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
      <Box mb={3} width="full" textAlign="end">
        <Button
          onClick={handleCreateNewIdeaClick}
          colorScheme="telegram"
          mx={8}
          variant="outline"
        >
          <Text mx={2}>{t('createNewIdea')}</Text>
          <HiPlus size={22} />
        </Button>
      </Box>
      <IdeaList ideas={ideas} />
    </Box>
  );
}

export default Home;
