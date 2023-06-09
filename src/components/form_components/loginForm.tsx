'use client';
import { useForm } from 'react-hook-form';
import {
  inputClasses,
  errorClasses,
  validClasses,
  buttonClasses,
} from './inputClasses';

interface LoginFormInputs {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const submitForm = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className='grid gap-5 md:grid-cols-2 mt-6'>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex justify-between'>
            <label htmlFor='userName' className='font-semibold capitalize'>
              Username
            </label>
          </div>
          <input
            id='userName'
            type='text'
            aria-invalid={errors.username ? 'true' : 'false'}
            className={`${inputClasses} ${
              errors.username ? errorClasses : validClasses
            }`}
            {...register('username', { required: 'Username is required' })}
          />
          <p className='text-red-500'>{errors.username?.message}</p>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex justify-between'>
            <label htmlFor='password' className='font-semibold capitalize'>
              Password
            </label>
          </div>
          <input
            id='password'
            type='password'
            aria-invalid={errors.password ? 'true' : 'false'}
            className={`${inputClasses} ${
              errors.password ? errorClasses : validClasses
            }`}
            {...register('password', { required: 'Password is required' })}
          />
          <p className='text-red-500'>{errors.password?.message}</p>
        </div>
      </div>
      <button type='submit' className={buttonClasses}>
        Submit
      </button>
    </form>
  );
};
