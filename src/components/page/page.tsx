import { FC } from 'react';
import { Box } from '@chakra-ui/react';

const Page: FC = ({ children }) => {
  return (
    <Box px={{ base: 5, lg: 0 }} py={{ base: 3, md: 10 }} w="full">
      {children}
    </Box>
  );
};

export default Page;
