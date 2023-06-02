'use client';
import { useForm } from 'react-hook-form';
import { inputClasses, errorClasses, buttonClasses } from './inputClasses';

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
            className={`${inputClasses} ${errors.username ? errorClasses : ''}`}
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
            type='text'
            className={`${inputClasses} ${errors.password ? errorClasses : ''}`}
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
