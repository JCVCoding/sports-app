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
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Google } from "@/components/form_components/googleSignIn";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

  const [showPassword, setShowPassword] = useState(false);

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
    <Card
      placeholder={null}
      onPointerEnterCapture={null}
      onPointerLeaveCapture={null}
      className="w-full md:w-96"
    >
      <CardHeader
        placeholder={null}
        onPointerEnterCapture={null}
        onPointerLeaveCapture={null}
        variant="gradient"
        color="white"
        shadow={false}
        floated={false}
        className="grid h-12 place-items-center"
      >
        <Typography
          as={"h1"}
          placeholder={null}
          onPointerEnterCapture={null}
          onPointerLeaveCapture={null}
          variant="h2"
          color="black"
          className="text-xl md:text-3xl"
        >
          Sign In To Sports App
        </Typography>
      </CardHeader>
      <CardBody
        placeholder={null}
        onPointerEnterCapture={null}
        onPointerLeaveCapture={null}
      >
        <div className="flex flex-col gap-4">
          <div className="self-center">
            <Google />
          </div>
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-700">Or</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="flex flex-col gap-4">
              <div>
                <Input
                  label="Email"
                  size="lg"
                  id="email"
                  type="email"
                  aria-invalid={errors.email ? "true" : "false"}
                  error={errors.email ? true : false}
                  {...register("email", { required: "Email is required" })}
                  crossOrigin={null}
                  onPointerEnterCapture={null}
                  onPointerLeaveCapture={null}
                  aria-labelledby="email_label"
                  labelProps={{
                    htmlFor: "email",
                    id: "email_label",
                  }}
                />
                {errors.email && (
                  <Typography
                    placeholder={null}
                    onPointerEnterCapture={null}
                    onPointerLeaveCapture={null}
                    className="text-red-500 mt-1 ml-1"
                  >
                    {errors.email?.message}
                  </Typography>
                )}
              </div>
              <div>
                <Input
                  label="Password"
                  size="lg"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  aria-invalid={errors.password ? "true" : "false"}
                  error={errors.password ? true : false}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  aria-labelledby="password_label"
                  labelProps={{ htmlFor: "password", id: "password_label" }}
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
                    placeholder={null}
                    onPointerEnterCapture={null}
                    onPointerLeaveCapture={null}
                    className="text-red-500 mt-1 ml-1"
                  >
                    {errors.password?.message}
                  </Typography>
                )}
              </div>
              <Button
                placeholder={null}
                onPointerEnterCapture={null}
                onPointerLeaveCapture={null}
                variant="gradient"
                type="submit"
                fullWidth
              >
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </CardBody>
      <CardFooter
        className="pt-0"
        placeholder={null}
        onPointerEnterCapture={null}
        onPointerLeaveCapture={null}
      >
        <Typography
          variant="small"
          className="mt-6 flex justify-center"
          placeholder={null}
          onPointerEnterCapture={null}
          onPointerLeaveCapture={null}
        >
          Don&apos;t have an account?
          <Typography
            as="a"
            href="/sign-up"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
            placeholder={null}
            onPointerEnterCapture={null}
            onPointerLeaveCapture={null}
          >
            Sign up
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
};
