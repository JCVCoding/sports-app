'use client';
import { BaseSyntheticEvent, useState } from 'react';

export default function SignUp() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: BaseSyntheticEvent) => {
    const form: HTMLFormElement = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return <></>;
}
