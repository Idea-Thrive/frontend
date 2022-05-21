import { ChangeEvent, useState } from 'react';

function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  return {
    value,
    onChange: handleChange,
  };
}

export default useInput;
