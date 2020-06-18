import { useState } from 'react';

export const useForm = (initialValue: any) => {
  const [values, setValues] = useState(initialValue);

  return [
    values,
    (e: any) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    },
  ];
};
