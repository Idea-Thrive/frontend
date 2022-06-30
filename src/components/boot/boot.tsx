import { FC, useState } from 'react';
import { Container, useToast } from '@chakra-ui/react';
import Router from 'router/router';
import { getCurrentLanguage } from 'i18n/i18n';
import style from 'style/app.module.css';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'store';
import Fonts from 'components/fonts';
import useDidMount from 'hooks/use-did-mount';
import { getConfig as requestConfig } from 'service/api-helper/boot';
import { ERROR_UNAUTHORIZED } from 'service/error-codes';
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/slices/app-slice';
import SplashScreen from 'components/splash-screen';
import t from 'i18n';
import ErrorBoundary from 'components/error-boundary';
import { AxiosError } from 'axios';
import { logout, hasToken } from 'service/auth';

const Boot: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const toast = useToast();
  const dispatch = useDispatch();

  const { direction } = getCurrentLanguage();

  const getConfig = async () => {
    if (hasToken() === false) {
      return;
    }
    setIsLoading(true);
    try {
      const { data } = await requestConfig();
      dispatch(updateUser(data));
      setIsLoading(false);
    } catch (err: any) {
      if (err.response.status === ERROR_UNAUTHORIZED) {
        logout();
        return;
      }
      setError(error);
      toast({
        title: t('anErrorHasOccurred'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useDidMount(() => {
    getConfig();
  });

  const handleTryAgainClick = () => {
    getConfig();
  };

  if (isLoading) {
    return <SplashScreen />;
  }

  if (Boolean(error)) {
    return <ErrorBoundary onTryAgainClick={handleTryAgainClick} />;
  }

  return (
    <>
      <Fonts />
      <Container
        className={direction === 'ltr' ? style.ltr : style.rtl}
        h="100vh"
        maxW="container.xl"
        p={0}
        centerContent
      >
        <Router />
      </Container>
    </>
  );
};

function BootWithRedux() {
  return (
    <ReduxProvider store={store}>
      <Boot />
    </ReduxProvider>
  );
}

export default BootWithRedux;
