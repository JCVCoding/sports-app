import { SignUpForm } from "@/components/form_components/signUpForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export default async function SignUp() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="container mx-auto mt-16 sm:px-8 px-4 flex flex-col items-center">
      <SignUpForm />
    </div>
  );
}
