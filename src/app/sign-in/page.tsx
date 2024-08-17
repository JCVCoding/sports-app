import { LoginForm } from "@/components/form_components/loginForm";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto mt-16 sm:px-8 px-4 flex flex-col items-center">
      <LoginForm />
    </div>
  );
};

export default SignIn;
