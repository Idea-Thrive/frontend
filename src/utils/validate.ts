export const isEmail = (email: string, isEmailRequired?: boolean): boolean => {
  if (isEmailRequired === false && !email) {
    return true;
  }

  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const isRequired = (value: string): boolean => {
  if (!value) {
    return false;
  }
  return value.length > 0 || !!value;
};
