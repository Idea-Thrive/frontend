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
  Spinner,
  Text,
  Flex,
} from '@chakra-ui/react';
import useInput from 'hooks/use-input';
import { isRequired } from 'utils/validate';
import t from 'i18n';
import { STATUS_OK } from 'constants/';
import { getAllCategories, createCategory } from 'service/api-helper/category';
import useDidMount from 'hooks/use-did-mount';
import useStateToProps from 'store/hooks/use-state-to-props';
import { Category } from 'types/types';

const Categories: FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const { companyId } = useStateToProps((state: any) => ({
    companyId: state.app?.user?.company_id,
  }));

  const categoryNameInput = useInput({
    initialValue: '',
    validator: isRequired,
    errorMessage: 'categoryNameIsRequired',
    clearErrorOnChange: true,
  });

  const initializeAllCategories = async () => {
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

  // TODO: implement the logic
  const handleDeleteCategoryClick = () => {};

  const handleSubmitCategoryClick = async () => {
    const IsCategoryNameValid = categoryNameInput.validate();

    if (!IsCategoryNameValid) {
      return;
    }

    setSubmitLoading(true);

    try {
      const { status } = await createCategory({
        name: categoryNameInput.value,
      });

      if (status === STATUS_OK) {
        toast({
          title: t('categorySubmittedSuccessfully'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });

        categoryNameInput.clear();
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
    <Accordion w="full" textAlign="center">
      <AccordionItem>
        <AccordionButton p={4}>
          <Heading size="md">{t('existingCategories')}</Heading>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel shadow="md" pb={4}>
          <List textAlign="start">
            {isLoading ? (
              <Spinner />
            ) : (
              categories.map((category: Category) => (
                <ListItem mb={2} borderRadius="lg" padding={3} border="1px">
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text fontWeight="bold">{category.name}</Text>
                    <Button
                      onClick={() => handleDeleteCategoryClick()}
                      variant="solid"
                      backgroundColor="red.500"
                    >
                      {t('delete')}
                    </Button>
                  </Flex>
                </ListItem>
              ))
            )}
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
