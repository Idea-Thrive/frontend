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
} from '@chakra-ui/react';
import useInput from 'hooks/use-input';
import { isRequired, isNumber } from 'utils/validate';
import t from 'i18n';
import { submitCompany } from 'service/api-helper/company';
import { STATUS_OK } from 'constants/';

const Criteria: FC = () => {

  const ownerFirstNameInput = useInput({
    initialValue: '',
    validator: isRequired,
    errorMessage: 'ownerFirstNameIsRequired',
    clearErrorOnChange: true,
  });


  return (
    <Accordion w="full" textAlign="center">
    {/* <AccordionItem>
      <AccordionButton p={4}>
        <Heading size="md">{t('addNewCriteria')}</Heading>
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
    </AccordionItem> */}
  </Accordion>
  )
};

export default Criteria;
