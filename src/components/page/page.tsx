import { FC } from 'react';
import { Box } from '@chakra-ui/react';

interface PageProps {
  customHorizontalPadding?: number;
}

const Page: FC<PageProps> = ({ children, customHorizontalPadding = 5 }) => {
  return (
    <Box
      px={{ base: customHorizontalPadding, lg: 0 }}
      py={{ base: 3, md: 10 }}
      w="full"
    >
      {children}
    </Box>
  );
};

export default Page;
