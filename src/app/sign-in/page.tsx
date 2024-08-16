import { LoginForm } from "@/components/form_components/loginForm";
import { Google } from "@/components/form_components/googleSignIn";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <>
      <Google />
      <LoginForm />
    </>
  );
};

export default SignIn;
