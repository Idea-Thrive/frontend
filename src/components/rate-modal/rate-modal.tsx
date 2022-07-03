import { FC, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Textarea,
  Box,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { Criteria } from 'types/types';
import t from 'i18n';
import useStateToProps from 'store/hooks/use-state-to-props';
import useInput from 'hooks/use-input';
import { isRequired } from 'utils/validate';
import Rate from 'components/rate';
import { submitComment } from 'service/api-helper/comment';

interface RateModalProps {
  visibility: boolean;
  onVisibilityChange: () => void;
  criteria: Array<Criteria>;
  onSubmit: () => void;
  ideaId: string;
}

const RateModal: FC<RateModalProps> = ({
  visibility,
  onVisibilityChange,
  criteria,
  onSubmit,
  ideaId,
}) => {
  const [rates, setRates] = useState<Array<number>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const { companyId, userId } = useStateToProps((state: any) => ({
    companyId: state.app.user?.company_id,
    userId: state.app.user?.id,
  }));

  const descriptionInput = useInput({
    initialValue: '',
    validator: isRequired,
    errorMessage: 'descriptionIsRequired',
    clearErrorOnChange: true,
  });

  const handleRateChange = (value: number, index: number) => {
    const newRates = [...rates];
    newRates[index] = value;
    setRates(newRates);
  };

  const calculateRates = (): number => {
    const sum = rates.reduce((acc, curr) => acc + curr, 0);
    return sum / rates.length;
  };

  const handleSubmitRate = async () => {
    const isValidDescription = descriptionInput.validate();

    if (!isValidDescription) {
      return;
    }
    setIsLoading(true);

    const rate = calculateRates();

    try {
      const { status } = await submitComment({
        score: rate,
        description: descriptionInput.value,
        user_id: userId,
        company_id: companyId,
        idea_id: ideaId,
      });

      if (status === 201) {
        toast({
          title: t('commentSubmittedSuccessfully'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'bottom',
        });

        descriptionInput.clear();

        onSubmit();
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
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={visibility} onClose={onVisibilityChange}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('yourRate')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody w="full" p={3}>
          <Heading mb={7} textAlign="center" size="md">
            {t('submitScore')}
          </Heading>

          <VStack w="full" spacing={5} mb={4}>
            {criteria.map((item: Criteria, index) => (
              <Rate
                onChange={(value) => handleRateChange(value, index)}
                text={item.name}
              />
            ))}
          </VStack>

          <Box textAlign="end" w="full">
            <Text mb={2}>{t('description')}</Text>
            <Textarea
              value={descriptionInput.value}
              onChange={descriptionInput.onChange}
              isInvalid={Boolean(descriptionInput.error)}
              placeholder={t('descriptionPlaceholder')}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={handleSubmitRate}
            variant="solid"
            colorScheme="linkedin"
            isLoading={isLoading}
          >
            {t('submitComment')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RateModal;
