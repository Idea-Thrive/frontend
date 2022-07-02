import { FC, useState } from 'react';
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Button,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  Text,
  Flex,
  Skeleton,
} from '@chakra-ui/react';
import useInput from 'hooks/use-input';
import { isRequired } from 'utils/validate';
import t from 'i18n';
import { STATUS_OK } from 'constants/';
import {
  getAllCategories,
  createCategory,
  deleteCategory,
} from 'service/api-helper/category';
import useDidMount from 'hooks/use-did-mount';
import useStateToProps from 'store/hooks/use-state-to-props';
import { Category } from 'types/types';
import { toggleGlobalLoading } from 'store/slices/app-slice/app-slice';
import { useDispatch } from 'react-redux';

const Categories: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { companyId } = useStateToProps((state: any) => ({
    companyId: state.app?.user?.company_id,
  }));

  const dispatch = useDispatch();

  const categoryNameInput = useInput({
    initialValue: '',
    validator: isRequired,
    errorMessage: 'categoryNameIsRequired',
    clearErrorOnChange: true,
  });

  const initializeAllCategories = async () => {
    setIsLoading(true);
    try {
      const { data } = await getAllCategories({ companyId });
      setCategories(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useDidMount(() => {
    initializeAllCategories();
  });

  const toast = useToast();

  const handleDeleteCategoryClick = async (id: string) => {
    dispatch(toggleGlobalLoading());

    try {
      const { status } = await deleteCategory({ id });
      if (status === 204) {
        toast({
          title: t('categoryDeletedSuccessfully'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });

        await initializeAllCategories();
      }
    } catch (error) {
      console.error(error);
      toast({
        title: t('anErrorHasOccurred'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
    } finally {
      dispatch(toggleGlobalLoading());
    }
  };

  const handleSubmitCategoryClick = async () => {
    const IsCategoryNameValid = categoryNameInput.validate();

    if (!IsCategoryNameValid) {
      return;
    }

    setSubmitLoading(true);

    try {
      const { status } = await createCategory({
        name: categoryNameInput.value,
        company_id: companyId,
      });

      if (status === 201) {
        toast({
          title: t('categorySubmittedSuccessfully'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });

        categoryNameInput.clear();

        await initializeAllCategories();
      }
    } catch (error: any) {
      toast({
        title: t('anErrorHasOccurred'),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'bottom',
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <Accordion w="full" textAlign="center" allowToggle allowMultiple>
      <AccordionItem>
        <AccordionButton p={4}>
          <Heading size="md">{t('existingCategories')}</Heading>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel shadow="md" pb={4}>
          <List textAlign="start">
            <Skeleton isLoaded={!isLoading}>
              {categories.map((category: Category) => (
                <ListItem mb={2} borderRadius="lg" padding={3} border="1px">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text fontWeight="bold">{category.name}</Text>
                    <Button
                      onClick={() => handleDeleteCategoryClick(category.id)}
                      variant="solid"
                      backgroundColor="red.500"
                    >
                      {t('delete')}
                    </Button>
                  </Flex>
                </ListItem>
              ))}
            </Skeleton>
          </List>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionButton p={4}>
          <Heading size="md">{t('addNewCategory')}</Heading>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel shadow="md" pb={4}>
          <FormControl mb={4} isInvalid={Boolean(categoryNameInput.error)}>
            <FormLabel>{t('categoryName')}</FormLabel>
            <Input
              type="text"
              placeholder=""
              value={categoryNameInput.value}
              onChange={categoryNameInput.onChange}
            />
            {categoryNameInput.error && (
              <FormErrorMessage>{t(categoryNameInput.error)}</FormErrorMessage>
            )}
          </FormControl>

          <Button isLoading={submitLoading} onClick={handleSubmitCategoryClick}>
            {t('submitCategory')}
          </Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Categories;
