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
  Flex,
  Text,
  Skeleton,
} from '@chakra-ui/react';
import useInput from 'hooks/use-input';
import { isRequired, isNumber } from 'utils/validate';
import t from 'i18n';
import {
  submitCompany,
  getAllCompanies,
  deleteCompany,
} from 'service/api-helper/company';
import { STATUS_OK } from 'constants/';
import { Company } from 'types';
import useDidMount from 'hooks/use-did-mount';
import { toggleGlobalLoading } from 'store/slices/app-slice';
import { useDispatch } from 'react-redux';

const Companies: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState<Array<Company>>([]);
  const [getCompanyLoading, setGetCompanyLoading] = useState(true);

  const toast = useToast();
  const dispatch = useDispatch();

  const initializeCompanies = async () => {
    setGetCompanyLoading(true);
    try {
      const { data } = await getAllCompanies();
      setCompanies(data);
      setGetCompanyLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useDidMount(() => {
    initializeCompanies();
  });

  const ownerFirstNameInput = useInput({
    initialValue: '',
    validator: isRequired,
    errorMessage: 'ownerFirstNameIsRequired',
    clearErrorOnChange: true,
  });

  const ownerLastNameInput = useInput({
    initialValue: '',
    validator: isRequired,
    errorMessage: 'ownerLastNameIsRequired',
    clearErrorOnChange: true,
  });

  const ownerNationalIdInput = useInput({
    initialValue: '',
    validator: isNumber,
    errorMessage: 'ownerNationalIdShouldBeNumber',
    clearErrorOnChange: true,
  });

  const companyNameInput = useInput({
    initialValue: '',
    validator: isRequired,
    errorMessage: 'ownerNameIsRequired',
    clearErrorOnChange: true,
  });

  const clearInputs = () => {
    companyNameInput.clear();
    ownerFirstNameInput.clear();
    ownerLastNameInput.clear();
    ownerNationalIdInput.clear();
  };

  const handleSubmitCompanyClick = async () => {
    const isCompanyNameValid = companyNameInput.validate();
    const isOwnerFirstNameValid = ownerFirstNameInput.validate();
    const isOwnerLastNameValid = ownerLastNameInput.validate();
    const isOwnerNationalIdValid = ownerNationalIdInput.validate();

    const isValid =
      isCompanyNameValid &&
      isOwnerFirstNameValid &&
      isOwnerLastNameValid &&
      isOwnerNationalIdValid;

    if (!isValid) {
      return;
    }

    setIsLoading(true);

    try {
      const { status } = await submitCompany({
        name: companyNameInput.value,
        owner_first_name: ownerFirstNameInput.value,
        owner_last_name: ownerLastNameInput.value,
        owner_national_id: ownerNationalIdInput.value,
      });

      if (status === STATUS_OK) {
        toast({
          title: t('companySubmittedSuccessfully'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });

        clearInputs();
        await initializeCompanies();
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
      setIsLoading(false);
    }
  };

  const handleDeleteCompanyClick = async (id: string) => {
    dispatch(toggleGlobalLoading());
    try {
      const { status } = await deleteCompany({ companyId: id });

      if (status === 204) {
        toast({
          title: t('companyDeletedSuccessfully'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });

        initializeCompanies();
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

  return (
    <Accordion w="full" textAlign="center" allowToggle allowMultiple>
      <AccordionItem>
        <AccordionButton p={4}>
          <Heading size="md">{t('existingCompanies')}</Heading>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel shadow="md" pb={4}>
          <List textAlign="start">
            <Skeleton isLoaded={!getCompanyLoading}>
              {companies.map((company: Company, index) => (
                <ListItem
                  key={`item-${company.name}-${index}`}
                  mb={2}
                  borderRadius="lg"
                  padding={3}
                  border="1px"
                >
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text fontWeight="bold">{company.name}</Text>
                    <Button
                      onClick={() => handleDeleteCompanyClick(company.id)}
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
          <Heading size="md">{t('addNewCompany')}</Heading>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel shadow="md" pb={4}>
          <FormControl mb={4} isInvalid={Boolean(companyNameInput.error)}>
            <FormLabel>{t('companyName')}</FormLabel>
            <Input
              type="text"
              placeholder=""
              value={companyNameInput.value}
              onChange={companyNameInput.onChange}
            />
            {companyNameInput.error && (
              <FormErrorMessage>{t(companyNameInput.error)}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mb={4} isInvalid={Boolean(ownerFirstNameInput.error)}>
            <FormLabel>{t('ownerFirstName')}</FormLabel>
            <Input
              type="text"
              placeholder=""
              value={ownerFirstNameInput.value}
              onChange={ownerFirstNameInput.onChange}
            />
            {ownerFirstNameInput.error && (
              <FormErrorMessage>
                {t(ownerFirstNameInput.error)}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl mb={4} isInvalid={Boolean(ownerLastNameInput.error)}>
            <FormLabel>{t('ownerLastName')}</FormLabel>
            <Input
              type="text"
              placeholder=""
              value={ownerLastNameInput.value}
              onChange={ownerLastNameInput.onChange}
            />
            {ownerLastNameInput.error && (
              <FormErrorMessage>{t(ownerLastNameInput.error)}</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mb={5} isInvalid={Boolean(ownerNationalIdInput.error)}>
            <FormLabel>{t('ownerNationalId')}</FormLabel>
            <Input
              type="number"
              placeholder=""
              value={ownerNationalIdInput.value}
              onChange={ownerNationalIdInput.onChange}
            />
            {ownerNationalIdInput.error && (
              <FormErrorMessage>
                {t(ownerNationalIdInput.error)}
              </FormErrorMessage>
            )}
          </FormControl>

          <Button isLoading={isLoading} onClick={handleSubmitCompanyClick}>
            {t('submitCompany')}
          </Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Companies;
