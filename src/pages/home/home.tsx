import { useEffect } from 'react';
import { useToast, Button, Text, Flex } from '@chakra-ui/react';
import DashboardDrawer from 'components/dashboard-drawer';
import { HiPlus } from 'react-icons/hi';
import { getIdeas } from 'service/api-helper/home';
import t from 'i18n';
import IdeaList from 'components/idea-list';
import { useNavigate } from 'react-router-dom';
import paths from 'router/paths';
import useStateToProps from 'store/hooks/use-state-to-props';
import Filter from 'components/filter';
import { useDispatch } from 'react-redux';
import { updateIdeas as updateStoreIdeas } from 'store/slices/app-slice';
import Header from 'components/header';
import Page from 'components/page';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const { companyId, filteredIdeas, isMenuOpen } = useStateToProps(
    (state: any) => ({
      filteredIdeas: state.app.filteredIdeas,
      companyId: state.app.user?.company_id,
      isMenuOpen: state.app.global.isMenuOpen,
    }),
  );

  const updateIdeas = async () => {
    try {
      const { data } = await getIdeas({
        companyId,
        offset: 0,
        size: 100,
        category: 'shit',
      });

      dispatch(updateStoreIdeas(data.data));
      // const {
      //   data: { data, ok },
      // } = await getIdeas({});
      // if (ok) {
      //   setIdeas(data);
      // }
    } catch (error) {
      toast({
        title: t('anErrorHasOccurred'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  useEffect(() => {
    if (companyId) {
      updateIdeas();
    }
  }, [companyId]);

  const handleCreateNewIdeaClick = () => {
    navigate(paths.createNewIdea);
  };

  return (
    <Page>
      <DashboardDrawer visibility={isMenuOpen} title="title" />

      <Header />
      <Flex
        mb={3}
        width="full"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          onClick={handleCreateNewIdeaClick}
          colorScheme="telegram"
          variant="outline"
        >
          <Text mx={2}>{t('createNewIdea')}</Text>
          <HiPlus size={22} />
        </Button>
        <Filter />
      </Flex>
      <IdeaList ideas={filteredIdeas} />
    </Page>
  );
}

export default Home;
