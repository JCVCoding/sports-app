"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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
    <Card className="w-full md:w-3/4 mb-4">
      <CardHeader
        variant="gradient"
        shadow={false}
        floated={false}
        className="grid h-12 place-items-center"
      >
        <Typography variant="h2" color="black" className="">
          Sign Up
        </Typography>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col md:flex-row gap-x-6 gap-y-4">
              <div className="flex flex-col w-full gap-y-1">
                <Input
                  id="firstName"
                  label="First Name"
                  type="text"
                  size="lg"
                  error={errors.firstName ? true : false}
                  aria-invalid={errors.firstName ? "true" : "false"}
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <Typography className="text-red-500 ml-1">
                    {errors.firstName?.message}
                  </Typography>
                )}
              </div>
              <div className="flex flex-col w-full gap-y-1">
                <Input
                  id="lastName"
                  label="Last Name"
                  type="text"
                  size="lg"
                  error={errors.lastName ? true : false}
                  aria-invalid={errors.lastName ? "true" : "false"}
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
                {errors.lastName && (
                  <Typography className="text-red-500 ml-1">
                    {errors.lastName?.message}
                  </Typography>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full gap-y-1">
              <Input
                id="email"
                type="email"
                label="Email"
                size="lg"
                error={errors.email ? true : false}
                aria-invalid={errors.email ? "true" : "false"}
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid Email Format",
                  },
                })}
              />
              {errors.email && (
                <Typography className="text-red-500 ml-1">
                  {errors.email?.message}
                </Typography>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-x-6 gap-y-4">
              <div className="flex flex-col w-full gap-y-1">
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  size="lg"
                  error={errors.password ? true : false}
                  aria-invalid={errors.password ? "true" : "false"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <Typography className="text-red-500 ml-1">
                    {errors.password?.message}
                  </Typography>
                )}
              </div>
              <div className="flex flex-col w-full gap-y-1">
                <Input
                  id="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  size="lg"
                  error={errors.confirmPassword ? true : false}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                />
                {errors.confirmPassword && (
                  <Typography className="text-red-500 ml-1">
                    {errors.confirmPassword?.message}
                  </Typography>
                )}
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                variant="gradient"
                className="w-full md:w-1/2 mt-6"
                onClick={() => console.log(errors, isSubmitted)}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
      <CardFooter className="pt-0">
        <Typography variant="small" className="mt-4 flex justify-center">
          Already have an account?
          <Typography
            as="a"
            href="/sign-in"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Sign in
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
};
