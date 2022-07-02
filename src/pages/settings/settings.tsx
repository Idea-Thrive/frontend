import { FC } from 'react';
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useMediaQuery,
  useBreakpointValue,
} from '@chakra-ui/react';
import Page from 'components/page';
import Header from 'components/header';
import { Role } from 'types/types';
import useStateToProps from 'store/hooks/use-state-to-props';
import SplashScreen from 'components/splash-screen';
import t, { getCurrentLanguage } from 'i18n';
import Categories from './categories/categories';
import Criteria from './criteria/criteria';
import Companies from './companies/companies';
import Profile from './profile/profile';
import Users from './users/users';

const Settings: FC = () => {
  const [isLargerThan700] = useMediaQuery('(min-width: 700px)');

  const [isLargerThan470] = useMediaQuery('(min-width: 470px)');

  const { direction } = getCurrentLanguage();

  // const { role } = useStateToProps((state: any) => ({
  //   role: state.app?.user?.role,
  // }));

  const role = 'employer';

  const shouldRenderItem = ({ role: requiredRole }: { role: Role }) => {
    if (role === Role.EMPLOYER) {
      return true;
    }
    return role === requiredRole;
  };

  const getTabOrientation = () => (isLargerThan700 ? 'vertical' : 'horizontal');

  const tabListItems = [
    { label: 'companies', role: Role.EMPLOYER },
    { label: 'categories', role: Role.EMPLOYER },
    { label: 'criteria', role: Role.EMPLOYER },
    { label: 'users', role: Role.EMPLOYER },
    { label: 'profile', role: Role.EMPLOYEE },
  ];

  const tabPanelItems = [
    {
      component: (index: number) => (
        <TabPanel key={index}>
          <Companies />
        </TabPanel>
      ),
      role: Role.EMPLOYER,
    },
    {
      component: (index: number) => (
        <TabPanel key={index}>
          <Categories />
        </TabPanel>
      ),
      role: Role.EMPLOYER,
    },
    {
      component: (index: number) => (
        <TabPanel key={index}>
          <Criteria />
        </TabPanel>
      ),
      role: Role.EMPLOYER,
    },
    {
      component: (index: number) => (
        <TabPanel key={index}>
          <Users />
        </TabPanel>
      ),
      role: Role.EMPLOYER,
    },
    {
      component: (index: number) => (
        <TabPanel key={index}>
          <Profile />
        </TabPanel>
      ),
      role: Role.EMPLOYEE,
    },
  ];

  if (!role) {
    return <SplashScreen />;
  }

  return (
    <Page customHorizontalPadding={isLargerThan470 ? 5 : 2}>
      <Header shouldRenderAvatar={false} />
      <Tabs
        orientation={getTabOrientation()}
        direction={direction}
        isFitted
        size={isLargerThan470 ? 'lg' : 'sm'}
      >
        <TabList>
          {tabListItems.map(
            (tabList, index) =>
              shouldRenderItem(tabList) && (
                <Tab key={index}>{t(tabList.label)}</Tab>
              ),
          )}
        </TabList>

        <TabPanels>
          {tabPanelItems.map(
            (panel, index) => shouldRenderItem(panel) && panel.component(index),
          )}
        </TabPanels>
      </Tabs>
    </Page>
  );
};

export default Settings;
