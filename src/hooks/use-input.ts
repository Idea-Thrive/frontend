import { ChangeEvent, useState } from 'react';

type useInputParams = {
  initialValue: string;
  validator: (value: string) => boolean;
  errorMessage: string;
  clearErrorOnChange?: boolean;
};

type useInputReturn = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string | null;
  validate: () => boolean;
};

function useInput({
  initialValue,
  validator,
  errorMessage,
  clearErrorOnChange,
}: useInputParams): useInputReturn {
  const [value, setValue] = useState<string>(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  return {
    value,
    onChange: handleChange,
    error,
    validate,
  };
}

export default useInput;
