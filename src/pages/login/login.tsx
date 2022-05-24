import React from 'react';
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
  FormErrorMessage,
} from '@chakra-ui/react';
import t, { toggleLocale } from 'i18n';
import { login } from 'service/api-helper/login';
import useInput from 'hooks/use-input';
import { isEmail, isRequired } from 'utils/validate';

function Login() {
  const emailInput = useInput({
    initialValue: '',
    validator: isEmail,
    errorMessage: 'emailIsNotValid',
    clearErrorOnChange: true,
  });

  const passwordInput = useInput({
    initialValue: '',
    validator: isRequired,
    errorMessage: 'passwordIsRequired',
    clearErrorOnChange: true,
  });

  const handleChangeLanguageClick = () => {
    toggleLocale();
  };

  const handleLoginClick = async () => {
    const isEmailValid = emailInput.validate();
    const isPasswordValid = passwordInput.validate();

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

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

        <FormControl isInvalid={Boolean(emailInput.error)}>
          <FormLabel>{t('email')}</FormLabel>
          <Input
            type="email"
            dir="ltr"
            placeholder="example@gmail.com"
            name="email"
            value={emailInput.value}
            onChange={emailInput.onChange}
          />
          {emailInput.error && (
            <FormErrorMessage>{t(emailInput.error)}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={Boolean(passwordInput.error)}>
          <FormLabel>{t('password')}</FormLabel>
          <Input
            dir="ltr"
            placeholder="Password"
            type="password"
            name="password"
            value={passwordInput.value}
            onChange={passwordInput.onChange}
          />
          {passwordInput.error && (
            <FormErrorMessage>{t(passwordInput.error)}</FormErrorMessage>
          )}
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
