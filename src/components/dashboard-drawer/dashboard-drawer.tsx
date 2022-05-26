import React, { FC } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
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
import t from 'i18n';
import { FaMoon, FaSun } from 'react-icons/fa';

import { FiLogOut, FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import paths from 'router/paths';
import { removeToken } from 'service/auth';

interface DashboardDrawerProps {
  visibility: boolean;
  onVisibilityChange: () => void;
  title: string;
}

const DashboardDrawer: FC<DashboardDrawerProps> = ({
  visibility,
  onVisibilityChange,
  title,
}) => {
  const { toggleColorMode } = useColorMode();
  const size = useBreakpointValue({ base: 'full', lg: 'xs' });
  const toggleThemeIcon = useColorModeValue(FaMoon, FaSun);

  const navigate = useNavigate();

  const handleSettingsClick = () => {
    // TODO: implement
    console.log('Settings');
  };

  const handleLogoutClick = () => {
    removeToken();
    navigate(paths.login);
  };

  const items: Array<{ icon: FC; text: string; onClick: () => void }> = [
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
    {
      icon: toggleThemeIcon,
      text: 'toggleTheme',
      onClick: toggleColorMode,
    },
  ];

  return (
    <Drawer
      isOpen={visibility}
      placement="end"
      onClose={onVisibilityChange}
      size={size}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{t(title)}</DrawerHeader>

        <DrawerBody>
          <List>
            {items.map((item, index) => (
              <Button mb={2} display="block" w="full">
                <ListItem
                  py={3}
                  key={`item-${item.text}-${index}`}
                  onClick={item.onClick}
                  textAlign="start"
                >
                  <ListIcon as={item.icon} />
                  <Text display="inline">{t(item.text)}</Text>
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
