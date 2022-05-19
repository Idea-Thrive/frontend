import React from 'react';
import IdeaLogo from '../../assets/idea.svg';
import { ColorModeSwitcher } from 'service/color-mode-switcher';
import {
  Flex,
  Image,
  Heading,
  VStack,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Box,
  useColorMode,
  AspectRatio,
} from '@chakra-ui/react';
import t, { toggleLocale } from '../../i18n';
import { login } from '../../service/api-helper/login';

function Login() {
  const { toggleColorMode } = useColorMode();

  const handleChangeLanguageClick = () => {
    toggleLocale();
  };

  const handleLoginClick = async () => {
    console.log('login');
    const response = await login({ username: 'amir', password: 'test' });
    console.log({ response });
  };

  return (
    <Flex
      px={10}
      py={{ sm: 0, md: 20 }}
      h="full"
      width="full"
      justifyContent="space-around"
      alignItems="center"
    >
      <VStack
        w="full"
        spacing={5}
        flexBasis={{ base: '100%', lg: '50%' }}
        maxW={500}
      >
        <Heading letterSpacing={3}>Idea Thrive</Heading>

        <Text>{t('welcomeMessage')}</Text>

        <FormControl>
          <FormLabel>{t('email')}</FormLabel>
          <Input dir="ltr" placeholder="example@gmail.com" />
        </FormControl>

        <FormControl>
          <FormLabel>{t('password')}</FormLabel>
          <Input dir="ltr" placeholder="Password" type="password" />
        </FormControl>

        <Button onClick={handleLoginClick}>{t('login')}</Button>
        <Button onClick={handleChangeLanguageClick}>
          {t('changeLanguage')}
        </Button>

        <ColorModeSwitcher />
      </VStack>

      <Image
        display={{ base: 'none', lg: 'block' }}
        h="auto"
        maxW={500}
        mx={5}
        src={IdeaLogo}
        w="full"
        userSelect="none"
        pointerEvents="none"
      />
    </Flex>
  );
}

export default Login;
