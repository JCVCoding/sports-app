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
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface LoginFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginFormInputs>();

  const submitForm = async (data: LoginFormInputs) => {
    await fetch("/api/auth/register", {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then(async (res) => ({
        body: await res.json(),
        status: res.status,
      }))
      .then(({ body, status }) => {
        const { error, message } = body;
        if (error) {
          setError("root.serverError", {
            message,
            type: status.toString(),
          });
          switch (error) {
            case "user":
              setError("email", { type: "validate" });
              break;
            case "password":
              setError("password", { type: "validate" });
              setError("confirmPassword", { type: "validate" });
              break;
            default:
              break;
          }
        }
        if (!error && message === "Success") {
          clearErrors();
          router.push("/sign-in");
        }
      });
  };

  return (
    <Card
      className="w-full md:w-3/4 mb-4"
      placeholder={null}
      onPointerEnterCapture={null}
      onPointerLeaveCapture={null}
    >
      <CardHeader
        variant="gradient"
        shadow={false}
        floated={false}
        className="grid h-12 place-items-center"
        placeholder={null}
        onPointerEnterCapture={null}
        onPointerLeaveCapture={null}
      >
        <Typography
          variant="h2"
          color="black"
          placeholder={null}
          onPointerEnterCapture={null}
          onPointerLeaveCapture={null}
        >
          Sign Up
        </Typography>
      </CardHeader>
      <CardBody
        placeholder={null}
        onPointerEnterCapture={null}
        onPointerLeaveCapture={null}
      >
        <form onSubmit={handleSubmit(submitForm)}>
          {errors.root?.serverError.type === "401" && (
            <Typography
              className="text-red-500"
              placeholder={null}
              onPointerEnterCapture={null}
              onPointerLeaveCapture={null}
            >
              {errors.root?.serverError.message}
            </Typography>
          )}
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
                  crossOrigin={null}
                  onPointerEnterCapture={null}
                  onPointerLeaveCapture={null}
                />
                {errors.firstName && (
                  <Typography
                    className="text-red-500 ml-1"
                    placeholder={null}
                    onPointerEnterCapture={null}
                    onPointerLeaveCapture={null}
                  >
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
                  crossOrigin={null}
                  onPointerEnterCapture={null}
                  onPointerLeaveCapture={null}
                />
                {errors.lastName && (
                  <Typography
                    className="text-red-500 ml-1"
                    placeholder={null}
                    onPointerEnterCapture={null}
                    onPointerLeaveCapture={null}
                  >
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
                crossOrigin={null}
                onPointerEnterCapture={null}
                onPointerLeaveCapture={null}
              />
              {errors.email && (
                <Typography
                  className="text-red-500 ml-1"
                  placeholder={null}
                  onPointerEnterCapture={null}
                  onPointerLeaveCapture={null}
                >
                  {errors.email?.message}
                </Typography>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-x-6 gap-y-4">
              <div className="flex flex-col w-full gap-y-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  size="lg"
                  error={errors.password ? true : false}
                  aria-invalid={errors.password ? "true" : "false"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  icon={
                    showPassword ? (
                      <EyeSlashIcon
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    ) : (
                      <EyeIcon onClick={() => setShowPassword(!showPassword)} />
                    )
                  }
                  crossOrigin={null}
                  onPointerEnterCapture={null}
                  onPointerLeaveCapture={null}
                />
                {errors.password && (
                  <Typography
                    className="text-red-500 ml-1"
                    placeholder={null}
                    onPointerEnterCapture={null}
                    onPointerLeaveCapture={null}
                  >
                    {errors.password?.message}
                  </Typography>
                )}
              </div>
              <div className="flex flex-col w-full gap-y-1">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  label="Confirm Password"
                  size="lg"
                  error={errors.confirmPassword ? true : false}
                  aria-invalid={errors.confirmPassword ? "true" : "false"}
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                  })}
                  icon={
                    showConfirmPassword ? (
                      <EyeSlashIcon
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    ) : (
                      <EyeIcon
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      />
                    )
                  }
                  crossOrigin={null}
                  onPointerEnterCapture={null}
                  onPointerLeaveCapture={null}
                />
                {errors.confirmPassword && (
                  <Typography
                    className="text-red-500 ml-1"
                    placeholder={null}
                    onPointerEnterCapture={null}
                    onPointerLeaveCapture={null}
                  >
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
                placeholder={null}
                onPointerEnterCapture={null}
                onPointerLeaveCapture={null}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </form>
      </CardBody>
      <CardFooter
        className="pt-0"
        placeholder={null}
        onPointerEnterCapture={null}
        onPointerLeaveCapture={null}
      >
        <Typography
          variant="small"
          className="mt-4 flex justify-center"
          placeholder={null}
          onPointerEnterCapture={null}
          onPointerLeaveCapture={null}
        >
          Already have an account?
          <Typography
            as="a"
            href="/sign-in"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
            placeholder={null}
            onPointerEnterCapture={null}
            onPointerLeaveCapture={null}
          >
            Sign in
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
};
