import { FC, useState } from 'react';
import {
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
} from '@chakra-ui/react';

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
