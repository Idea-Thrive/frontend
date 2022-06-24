import { useState, useEffect } from 'react';
import useStateToProps from 'store/hooks/use-state-to-props';
import { Box, IconButton, useToast, Button, Text } from '@chakra-ui/react';
import DashboardDrawer from 'components/dashboard-drawer';
import { FiMenu } from 'react-icons/fi';
import { HiPlus } from 'react-icons/hi';
import { getIdeas } from 'service/api-helper/home';
import t from 'i18n';
import IdeaList from 'components/idea-list';
import { useNavigate } from 'react-router-dom';
import paths from 'router/paths';

function Home() {
  const navigate = useNavigate();
  const toast = useToast();
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [ideas, setIdeas] = useState([]);

  const { role } = useStateToProps((state: any) => ({
    role: state.app.role,
  }));

  const updateIdeas = async () => {
    try {
      const {
        data: { data, ok },
      } = await getIdeas();

      if (ok) {
        setIdeas(data);
      }
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
    <Box px={10} py={{ sm: 0, md: 10 }} w="full">
      <DashboardDrawer
        visibility={drawerVisibility}
        onVisibilityChange={handleDrawerVisibilityChange}
        title="title"
      />
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

        <IconButton
          onClick={handleMenuClick}
          size="lg"
          icon={<FiMenu size={25} />}
          aria-label="Open Dashboard"
          colorScheme="gray"
        />
      </Box>
      <IdeaList ideas={ideas} />
    </Box>
  );
}

export default Home;
