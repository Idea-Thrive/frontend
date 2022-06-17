import React, { useState, useEffect } from 'react';
import useStateToProps from 'store/hooks/use-state-to-props';
import { Box, IconButton, useToast } from '@chakra-ui/react';
import DashboardDrawer from 'components/dashboard-drawer';
import { FiMenu } from 'react-icons/fi';
import { getIdeas } from 'service/api-helper/home';
import t from 'i18n';
import IdeaList from 'components/idea-list';

function Home() {
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

  return (
    <Box px={10} py={{ sm: 0, md: 10 }} w="full">
      <DashboardDrawer
        visibility={drawerVisibility}
        onVisibilityChange={handleDrawerVisibilityChange}
        title="title"
      />
      <Box width="full" textAlign="end">
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
