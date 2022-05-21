import React, { ChangeEvent } from 'react';
import IdeaLogo from 'assets/idea.svg';
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
} from '@chakra-ui/react';
import t, { toggleLocale } from 'i18n';
import { login } from 'service/api-helper/login';
import useInput from 'hooks/use-input';

function Login() {
  const emailInput = useInput('');
  const passwordInput = useInput('');

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
      justifyContent="center"
      alignItems="center"
    >
      <VStack w="full" spacing={5} maxW={500}>
        <Heading letterSpacing={3}>Idea Thrive</Heading>

        <Text>{t('welcomeMessage')}</Text>

        <FormControl>
          <FormLabel>{t('email')}</FormLabel>
          <Input
            type="email"
            dir="ltr"
            placeholder="example@gmail.com"
            name="email"
            {...emailInput}
          />
        </FormControl>

        <FormControl>
          <FormLabel>{t('password')}</FormLabel>
          <Input
            dir="ltr"
            placeholder="Password"
            type="password"
            name="password"
            {...passwordInput}
          />
        </FormControl>

        <Button onClick={handleLoginClick}>{t('login')}</Button>
        <Button onClick={handleChangeLanguageClick}>
          {t('changeLanguage')}
        </Button>

        <ColorModeSwitcher />
      </VStack>

      <Box>
        <Image
          display={{ base: 'none', lg: 'block' }}
          h="auto"
          maxW={500}
          mx={5}
          src={IdeaLogo}
          w="100%"
          userSelect="none"
          pointerEvents="none"
        />
      </Box>
    </Flex>
  );
}

export default Login;
