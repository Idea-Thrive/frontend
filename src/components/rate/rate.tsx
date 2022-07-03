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
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  HStack,
} from '@chakra-ui/react';
import { Criteria } from 'types/types';
import t from 'i18n';
import useStateToProps from 'store/hooks/use-state-to-props';
import useInput from 'hooks/use-input';
import Header from 'components/header/header';
import { isRequired } from 'utils/validate';

interface RateProps {
  onChange: (value: number) => void;
  text: string;
}

const Rate: FC<RateProps> = ({ onChange, text }) => {
  const [value, setValue] = useState(3);

  const handleChange = (val: number) => {
    setValue(val);
    onChange(val);
  };

  return (
    <>
      <HStack>
        <Text fontSize="lg" fontWeight="bold">
          {value}
        </Text>
        <Text fontSize="lg">{text}</Text>
      </HStack>
      <Slider min={1} max={5} step={1} defaultValue={3} onChange={handleChange}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </>
  );
};

export default Rate;
