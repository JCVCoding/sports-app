'use client';
import { BaseSyntheticEvent, useState } from 'react';

export default function LogIn() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: BaseSyntheticEvent) => {
    const form: HTMLFormElement = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  return (
    <section className='container mx-auto px-4'>
      <h2 className='text-5xl'>Log In</h2>
    </section>
  );
}
