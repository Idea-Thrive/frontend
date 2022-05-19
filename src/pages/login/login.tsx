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

function Login() {
  const { toggleColorMode } = useColorMode();

  const handleToggleThemeClick = () => {
    toggleColorMode();
  };

  const handleSignInClick = () => {
    console.log('sign in');
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

      <VStack
        w="full"
        spacing={5}
        flexBasis={{ base: '100%', lg: '50%' }}
        maxW={500}
      >
        <Heading letterSpacing={3}>Idea Thrive</Heading>

        <Text>Welcome to Idea Thrive</Text>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input placeholder="example@gmail.com" />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input placeholder="Password" type="password" />
        </FormControl>

        <Button onClick={handleSignInClick}>Sign In</Button>
        <Button onClick={handleToggleThemeClick}>Toggle theme</Button>
      </VStack>
    </Flex>
  );
}

export default Login;
