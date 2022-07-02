import { FC } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import useStateToProps from 'store/hooks/use-state-to-props';

const Loading: FC = () => {
  const { globalLoading } = useStateToProps((state: any) => ({
    globalLoading: state.app.global.globalLoading,
  }));

  if (globalLoading) {
    return (
      <Flex w="full" h="100vh" alignItems="center" justifyContent="center">
        <Spinner size="xl" thickness="3px" />
      </Flex>
    );
  }

  return null;
};

export default Loading;
