import React, { FC, useEffect, useState } from 'react';
import Page from 'components/page/page';
import Header from 'components/header/header';
import {
  Heading,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Box,
  FormErrorMessage,
  useToast,
  Select,
  VStack,
  Textarea,
  Skeleton,
} from '@chakra-ui/react';
import t from 'i18n';
import useInput from 'hooks/use-input';
import { isRequired } from 'utils/validate';
import paths from 'router/paths';
import { STATUS_OK } from 'constants/';
import { createIdea } from 'service/api-helper/idea';
import { getAllCategories } from 'service/api-helper/category';
import useStateToProps from 'store/hooks/use-state-to-props';
import { Category } from 'types/types';
import { useNavigate } from 'react-router';

const CreateNewIdea: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { companyId, userId } = useStateToProps((state: any) => ({
    companyId: state.app.user?.company_id,
    userId: state.app.user?.id,
  }));

  const toast = useToast();
  const navigate = useNavigate();

  const titleInput = useInput({
    initialValue: '',
    validator: isRequired,
    errorMessage: 'titleIsRequired',
    clearErrorOnChange: true,
  });

  const descriptionInput = useInput({
    initialValue: '',
    validator: isRequired,
    errorMessage: 'descriptionIsRequired',
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

  useEffect(() => {
    if (companyId) {
      initializeAllCategories();
    }
  }, [companyId]);

  useEffect(() => {
    if (categories.length > 0) {
      const [firstCategory] = categories;
      setSelectedCategory(firstCategory.id);
    }
  }, [categories]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSelectedCategory(value);
  };

  const clearInputs = () => {
    titleInput.clear();
    descriptionInput.clear();
  };

  const handleSubmitIdea = async () => {
    const isTitleValid = titleInput.validate();
    const isDescriptionValid = descriptionInput.validate();

    if (!isTitleValid || !isDescriptionValid) {
      return;
    }

    setSubmitLoading(true);

    try {
      const { status } = await createIdea({
        title: titleInput.value,
        description: descriptionInput.value,
        company_id: companyId,
        creator_id: userId,
        category_id: selectedCategory,
      });

      if (status === STATUS_OK) {
        toast({
          title: t('ideaSubmittedSuccessfully'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });

        clearInputs();
        navigate(paths.home);
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
    <Page>
      <Header shouldRenderAvatar={false} />
      <Heading textAlign="center">{t('creatingNewIdea')}</Heading>

      <VStack spacing={4}>
        <Box w="full">
          <VStack spacing={4}>
            <FormControl isInvalid={Boolean(titleInput.error)}>
              <FormLabel>{t('title')}</FormLabel>
              <Input
                type="text"
                placeholder=""
                value={titleInput.value}
                onChange={titleInput.onChange}
              />
              {titleInput.error && (
                <FormErrorMessage>{t(titleInput.error)}</FormErrorMessage>
              )}
            </FormControl>
            <Box textAlign="start" w="full">
              <Text mb={2}>{t('description')}</Text>
              <Textarea
                value={descriptionInput.value}
                onChange={descriptionInput.onChange}
                isInvalid={Boolean(descriptionInput.error)}
                placeholder={t('descriptionPlaceholder')}
              />
            </Box>

            <VStack w="full" textAlign="start">
              <Text w="full">{t('category')}</Text>

              <Skeleton w="full" isLoaded={!isLoading}>
                <Select
                  onChange={(e) => handleCategoryChange(e)}
                  textAlign="center"
                  isRequired
                >
                  {categories.map((category: Category) => (
                    <option value={category.id}>{category.name}</option>
                  ))}
                </Select>
              </Skeleton>
            </VStack>
          </VStack>
        </Box>

        <Button onClick={handleSubmitIdea} isLoading={submitLoading}>
          {t('submitIdea')}
        </Button>
      </VStack>
    </Page>
  );
};

export default CreateNewIdea;
