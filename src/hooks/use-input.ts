import { ChangeEvent, useState } from 'react';

type useInputParams = {
  initialValue: string;
  validator: (value: string) => boolean;
  errorMessage: string;
  clearErrorOnChange?: boolean;
};

type useInputReturn = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error: string | null;
  validate: () => boolean;
  clear: () => void;
};

function useInput({
  initialValue,
  validator,
  errorMessage,
  clearErrorOnChange,
}: useInputParams): useInputReturn {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;

    setValue(value);

    if (clearErrorOnChange) {
      setError(null);
    }
  };

  const validate = () => {
    const validationResult = validator(value);

    if (validationResult === false) {
      setError(errorMessage);
    }

    return validationResult;
  };

  const clear = () => {
    setValue('');
  };

  return {
    value,
    onChange: handleChange,
    error,
    validate,
    clear,
  };
}

export default useInput;
