import React, { useState } from 'react';
import useStateToProps from 'store/hooks/use-state-to-props';
import { Text, Box, IconButton } from '@chakra-ui/react';
import DashboardDrawer from 'components/dashboard-drawer';
import { FiMenu } from 'react-icons/fi';

function Home() {
  const [drawerVisibility, setDrawerVisibility] = useState(false);

  const { role } = useStateToProps((state: any) => ({
    role: state.app.role,
  }));

  const handleDrawerVisibilityChange = () => {
    setDrawerVisibility(false);
  };

  const handleMenuClick = () => {
    setDrawerVisibility(true);
  };

  return (
    <>
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
      <div>Home</div>
      <Text>Role: {role}</Text>
    </>
  );
}

export default Home;
