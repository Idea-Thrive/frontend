import { FC } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
  List,
  ListItem,
  ListIcon,
  useColorModeValue,
  useColorMode,
  Text,
  Button,
} from '@chakra-ui/react';
import t, { toggleLocale, getCurrentLanguage } from 'i18n';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdTranslate } from 'react-icons/md';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import paths from 'router/paths';
import { removeToken } from 'service/auth';
import { useDispatch } from 'react-redux';
import { toggleMenu } from 'store/slices/app-slice';
import useStateToProps from 'store/hooks/use-state-to-props';

interface DashboardDrawerProps {}

const DashboardDrawer: FC<DashboardDrawerProps> = () => {
  const dispatch = useDispatch();
  const { toggleColorMode } = useColorMode();
  const size = useBreakpointValue({ base: 'full', lg: 'xs' });
  const toggleThemeIcon = useColorModeValue(FaMoon, FaSun);

  const { isMenuOpen } = useStateToProps((state: any) => ({
    isMenuOpen: state.app.global.isMenuOpen,
  }));

  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate(paths.settings);
  };

  const handleLogoutClick = () => {
    removeToken();
    navigate(paths.login);
  };

  const handleChangeLanguageClick = () => {
    toggleLocale();
  };

  const items: Array<{
    icon: FC;
    text: string;
    onClick: () => void;
    size?: number;
  }> = [
    {
      icon: toggleThemeIcon,
      text: 'changeTheme',
      onClick: toggleColorMode,
    },
    {
      icon: MdTranslate,
      text: 'toggleLanguage',
      onClick: handleChangeLanguageClick,
      size: 25,
    },
    {
      icon: FiSettings,
      text: 'settings',
      onClick: handleSettingsClick,
    },
    {
      icon: FiLogOut,
      text: 'logout',
      onClick: handleLogoutClick,
    },
  ];

  const getDrawerPlacement = (): 'left' | 'right' => {
    const { direction } = getCurrentLanguage();
    return direction === 'rtl' ? 'right' : 'left';
  };

  const handleCloseDrawer = () => dispatch(toggleMenu());

  return (
    <Drawer
      isOpen={isMenuOpen}
      placement={getDrawerPlacement()}
      onClose={handleCloseDrawer}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody mt={10}>
          <List>
            {items.map((item, index) => (
              <Button
                key={`item-${item.text}-${index}`}
                mb={2}
                display="block"
                w="full"
              >
                <ListItem py={3} onClick={item.onClick} textAlign="end">
                  <Text display="inline">{t(item.text)}</Text>
                  <ListIcon mx={2} as={item.icon} />
                </ListItem>
              </Button>
            ))}
          </List>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DashboardDrawer;
