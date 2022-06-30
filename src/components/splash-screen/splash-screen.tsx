import { FC } from 'react';
import { Spinner, Flex } from '@chakra-ui/react';

const SplashScreen: FC = () => {
  return (
    <Flex alignItems="center" justifyContent="center" w="full" h="100vh">
      <Spinner size="xl" thickness="3px" />
    </Flex>
  );
};

export default SplashScreen;
