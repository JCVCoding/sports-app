import { SignUpForm } from "@/components/form_components/signUpForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function SignUp() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <>
      <h2 className="text-5xl">Sign Up</h2>
      <SignUpForm />
    </>
  );
}
