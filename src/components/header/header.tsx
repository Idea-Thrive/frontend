import { FC } from 'react';
import { useDispatch } from 'react-redux';
import useStateToProps from 'store/hooks/use-state-to-props';
import { toggleMenu } from 'store/slices/app-slice';
import {
  IconButton,
  Text,
  HStack,
  Avatar,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

interface HeaderProps {
  shouldRenderAvatar?: boolean;
}

const Header: FC<HeaderProps> = ({ shouldRenderAvatar = true }) => {
  const dispatch = useDispatch();

  const { firstName, lastName } = useStateToProps((state: any) => ({
    filteredIdeas: state.app.filteredIdeas,
    firstName: state.app.user?.first_name,
    lastName: state.app.user?.last_name,
    companyId: state.app.user?.company_id,
    isMenuOpen: state.app.global.isMenuOpen,
  }));

  const handleMenuClick = () => {
    dispatch(toggleMenu());
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        {shouldRenderAvatar && (
          <HStack spacing={4}>
            <Avatar name={`${firstName} ${lastName}`} />
            <HStack>
              <Text>{firstName}</Text>
              <Text>{lastName}</Text>
            </HStack>
          </HStack>
        )}
        <IconButton
          onClick={handleMenuClick}
          size="md"
          icon={<FiMenu size={18} />}
          aria-label="Open Dashboard"
          colorScheme="gray"
        />
      </Flex>
      <Divider m={3} />
    </>
  );
};

export default Header;
