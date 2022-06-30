import { FC } from 'react';
import { Flex, Button, Image, VStack, Heading } from '@chakra-ui/react';
import t from 'i18n';
import errorImage from 'assets/error.svg';

interface ErrorBoundaryProps {
  onTryAgainClick: any;
}

const ErrorBoundary: FC<ErrorBoundaryProps> = ({ onTryAgainClick }) => {
  return (
    <Flex
      px={10}
      w="full"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={16}>
        <Heading size="lg" color="white.100">
          {t('anErrorHasOccurred')}
        </Heading>

        <VStack spacing={10}>
          <Image
            h="auto"
            maxW={500}
            mx={5}
            src={errorImage}
            w="100%"
            userSelect="none"
            pointerEvents="none"
          ></Image>
          <Button onClick={onTryAgainClick} variant="outline">
            {t('tryAgain')}
          </Button>
        </VStack>
      </VStack>
    </Flex>
  );
};

export default ErrorBoundary;
