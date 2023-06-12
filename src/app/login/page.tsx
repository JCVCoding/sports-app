import { LoginForm } from '@/components/form_components/loginForm';
import { buttonClasses } from '@/components/form_components/inputClasses';
export default function LogIn() {
  return (
    <>
      <h2 className='text-5xl'>Log In</h2>
      <LoginForm />
      <button className={`${buttonClasses} w-52`}>Login with Google</button>
      <button className={`${buttonClasses} w-52`}>Login with Github</button>
    </>
  );
}
