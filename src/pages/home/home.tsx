import { useEffect, useState } from 'react';
import { useToast, Button, Text, Flex } from '@chakra-ui/react';
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
import SplashScreen from 'components/splash-screen';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);

  const { companyId, filteredIdeas } = useStateToProps((state: any) => ({
    filteredIdeas: state.app.filteredIdeas,
    companyId: state.app.user?.company_id,
  }));

  const updateIdeas = async () => {
    try {
      const { data } = await getIdeas({
        companyId,
        category: '',
      });

      dispatch(updateStoreIdeas(data));

      setIsLoading(false);
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

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Page>
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
