import React from 'react';
import useStateToProps from 'store/hooks/use-state-to-props';
import { Text, Box } from '@chakra-ui/react';

function Home() {
  const { role } = useStateToProps((state: any) => ({
    role: state.app.role,
  }));

  console.log(role);

  return (
    <Box>
      <div>Home</div>
      <Text>Role: {role}</Text>
    </Box>
  );
}

export default Home;
