import { FC } from 'react';
import { ChakraProvider, Container } from '@chakra-ui/react';
import theme from 'theme';
import Router from 'router/router';
import { getCurrentLanguage } from 'i18n/i18n';
import style from 'style/app.module.css';
import { Provider as ReduxProvider } from 'react-redux';
import store from 'store';
import Fonts from 'components/fonts';
import useDidMount from 'hooks/use-did-mount';
import { getConfig as requestConfig } from 'service/api-helper/boot';
import { ERROR_UNAUTHORIZED } from 'service/error-codes';
import { STATUS_OK } from 'constants/constants';
import { useDispatch } from 'react-redux';
import { updateUser } from 'store/slices/app-slice';

const Boot: FC = () => {
  const dispatch = useDispatch();
  const { direction } = getCurrentLanguage();

  const getConfig = async () => {
    try {
      const { status, data } = await requestConfig();

      if (status === STATUS_OK) {
        console.log(data);
        dispatch(updateUser(data));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useDidMount(() => {
    getConfig();
  });

  return (
    <ChakraProvider theme={theme}>
      <Fonts />

      <Container
        className={direction === 'ltr' ? style.ltr : style.rtl}
        h="100vh"
        maxW="container.xl"
        p={0}
        centerContent
      >
        <Router></Router>
      </Container>
    </ChakraProvider>
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
