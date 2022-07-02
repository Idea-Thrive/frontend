import { FC, useState } from 'react';
import {
  Input,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Button,
  useToast,
} from '@chakra-ui/react';
import useInput from 'hooks/use-input';
import { isRequired, isNumber } from 'utils/validate';
import t from 'i18n';
import { submitCompany } from 'service/api-helper/company';
import { STATUS_OK } from 'constants/';

const Companies: FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

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
          title: t('anErrorHasOccurred'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });

        clearInputs();
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

  return (
    <Box w="full" textAlign="center">
      <Heading size="md">{t('addNewCompany')}</Heading>

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
          <FormErrorMessage>{t(ownerFirstNameInput.error)}</FormErrorMessage>
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
          <FormErrorMessage>{t(ownerNationalIdInput.error)}</FormErrorMessage>
        )}
      </FormControl>

      <Button isLoading={isLoading} onClick={handleSubmitCompanyClick}>
        {t('submitCompany')}
      </Button>
    </Box>
  );
};

export default Companies;
