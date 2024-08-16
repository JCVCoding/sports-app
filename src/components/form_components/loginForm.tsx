"use client";
import { useForm } from "react-hook-form";
import {
  inputClasses,
  errorClasses,
  validClasses,
  buttonClasses,
} from "./inputClasses";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>();

  const submitForm = async (data: LoginFormInputs) => {
    const { email, password } = data;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      switch (res.error) {
        case "user":
          setError("email", {
            type: "validate",
            message: "User does not exist",
          });
          break;
        case "password":
          setError("password", {
            type: "validate",
            message: "Incorrect password",
          });
          break;
        default:
          break;
      }
    } else {
      router.push("/");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-5 md:grid-cols-2 mt-6">
        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between">
            <label htmlFor="email" className="font-semibold capitalize">
              Email
            </label>
          </div>
          <input
            id="email"
            type="email"
            aria-invalid={errors.email ? "true" : "false"}
            className={`${inputClasses} ${
              errors.email ? errorClasses : validClasses
            }`}
            {...register("email", { required: "Email is required" })}
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="font-semibold capitalize">
              Password
            </label>
          </div>
          <input
            id="password"
            type="password"
            aria-invalid={errors.password ? "true" : "false"}
            className={`${inputClasses} ${
              errors.password ? errorClasses : validClasses
            }`}
            {...register("password", { required: "Password is required" })}
          />
          <p className="text-red-500">{errors.password?.message}</p>
        </div>
      </div>
      <button type="submit" className={buttonClasses}>
        Submit
      </button>
    </form>
  );
};
