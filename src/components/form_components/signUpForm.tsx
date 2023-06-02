'use client';
import { useForm } from 'react-hook-form';
import {
  inputClasses,
  errorClasses,
  validClasses,
  buttonClasses,
} from './inputClasses';

interface LoginFormInputs {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted },
  } = useForm<LoginFormInputs>();

  const submitForm = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className='grid gap-5 md:grid-cols-2 mt-6'>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex justify-between'>
            <label htmlFor='firstName' className='font-semibold capitalize'>
              First Name
            </label>
          </div>
          <input
            id='firstName'
            type='text'
            className={`${inputClasses} ${
              errors.firstName ? errorClasses : validClasses
            }`}
            {...register('firstName', { required: 'First Name is required' })}
          />
          <p className='text-red-500'>{errors.firstName?.message}</p>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex justify-between'>
            <label htmlFor='lastName' className='font-semibold capitalize'>
              Last Name
            </label>
          </div>
          <input
            id='lastName'
            type='text'
            className={`${inputClasses} ${
              errors.lastName ? errorClasses : validClasses
            }`}
            {...register('lastName', { required: 'Last Name is required' })}
          />
          <p className='text-red-500'>{errors.lastName?.message}</p>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex justify-between'>
            <label htmlFor='userName' className='font-semibold capitalize'>
              Username
            </label>
          </div>
          <input
            id='userName'
            type='text'
            className={`${inputClasses} ${
              errors.username ? errorClasses : validClasses
            }`}
            {...register('username', { required: 'Username is required' })}
          />
          <p className='text-red-500'>{errors.username?.message}</p>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex justify-between'>
            <label htmlFor='email' className='font-semibold capitalize'>
              email
            </label>
          </div>
          <input
            id='email'
            type='email'
            className={`${inputClasses} ${
              errors.email ? errorClasses : validClasses
            }`}
            {...register('email', {
              required: { value: true, message: 'Email is required' },
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid Email Format' },
            })}
          />
          <p className='text-red-500'>{errors.email?.message}</p>
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
            className={`${inputClasses} ${
              errors.password ? errorClasses : validClasses
            }`}
            {...register('password', { required: 'Password is required' })}
          />
          <p className='text-red-500'>{errors.password?.message}</p>
        </div>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex justify-between'>
            <label
              htmlFor='confirmPassword'
              className='font-semibold capitalize'
            >
              Confirm Password
            </label>
          </div>
          <input
            id='confirmPassword'
            type='confirmPassword'
            className={`${inputClasses} ${
              errors.confirmPassword ? errorClasses : validClasses
            }`}
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
            })}
          />
          <p className='text-red-500'>{errors.confirmPassword?.message}</p>
        </div>
      </div>
      <button
        type='submit'
        className={buttonClasses}
        onClick={() => console.log(errors, isSubmitted)}
      >
        Submit
      </button>
    </form>
  );
};
