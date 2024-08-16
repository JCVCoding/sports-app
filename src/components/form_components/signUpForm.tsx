"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  inputClasses,
  errorClasses,
  validClasses,
  buttonClasses,
} from "./inputClasses";
interface LoginFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpForm = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitted },
  } = useForm<LoginFormInputs>();

  const submitForm = async (data: any) => {
    await fetch("/api/auth/register", {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(({ message }) => {
        console.log(message);
        if (message === "Success") {
          router.push("/sign-in");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className="grid gap-5 md:grid-cols-2 mt-6">
        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between">
            <label htmlFor="firstName" className="font-semibold capitalize">
              First Name
            </label>
          </div>
          <input
            id="firstName"
            type="text"
            className={`${inputClasses} ${
              errors.firstName ? errorClasses : validClasses
            }`}
            aria-invalid={errors.firstName ? "true" : "false"}
            {...register("firstName", { required: "First Name is required" })}
          />
          <p className="text-red-500">{errors.firstName?.message}</p>
        </div>
        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between">
            <label htmlFor="lastName" className="font-semibold capitalize">
              Last Name
            </label>
          </div>
          <input
            id="lastName"
            type="text"
            className={`${inputClasses} ${
              errors.lastName ? errorClasses : validClasses
            }`}
            aria-invalid={errors.lastName ? "true" : "false"}
            {...register("lastName", { required: "Last Name is required" })}
          />
          <p className="text-red-500">{errors.lastName?.message}</p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between">
            <label htmlFor="email" className="font-semibold capitalize">
              email
            </label>
          </div>
          <input
            id="email"
            type="email"
            aria-invalid={errors.email ? "true" : "false"}
            className={`${inputClasses} ${
              errors.email ? errorClasses : validClasses
            }`}
            {...register("email", {
              required: { value: true, message: "Email is required" },
              pattern: { value: /^\S+@\S+$/i, message: "Invalid Email Format" },
            })}
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
        <div className="flex flex-col w-full gap-2">
          <div className="flex justify-between">
            <label
              htmlFor="confirmPassword"
              className="font-semibold capitalize"
            >
              Confirm Password
            </label>
          </div>
          <input
            id="confirmPassword"
            type="password"
            aria-invalid={errors.confirmPassword ? "true" : "false"}
            className={`${inputClasses} ${
              errors.confirmPassword ? errorClasses : validClasses
            }`}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
            })}
          />
          <p className="text-red-500">{errors.confirmPassword?.message}</p>
        </div>
      </div>
      <button
        type="submit"
        className={buttonClasses}
        onClick={() => console.log(errors, isSubmitted)}
      >
        Submit
      </button>
    </form>
  );
};
