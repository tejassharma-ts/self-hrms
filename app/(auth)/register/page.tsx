import Image from "next/image";
import UserSigninForm from "../auth/_components/UserSigninForm";
import { InputOTPForm } from "../auth/_components/OTPVerifyForm";
import UserSignupForm from "../auth/_components/UserSignupForm";
import Link from "next/link";

type AuthPageProps = {
  searchParams: {
    email: string;
    company_email: string;
    forgot_password: string;
    uid: string;
    token: string;
    "final-verification": boolean;
  };
};

export default function RegisterPage({ searchParams }: AuthPageProps) {
  const aptForm = () => {
    if (searchParams.email || searchParams.company_email) {
      return <InputOTPForm />;
    } else if (searchParams.uid) {
      return <UserSigninForm />;
    }
    return <UserSignupForm />;
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="mx-auto hidden max-w-md pt-16 lg:block">
        <div className="flex flex-col space-y-1">
          <h1 className="text-4xl font-semibold">Welcome to,</h1>
          <p className="max-w-md text-gray-500">
            Our Human Resource Management portal! Please complete your registration to access
            valuable resources, manage employee information, and streamline HR processes.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl font-bold">Registration</h1>
          </div>
          {aptForm()}
          <p className="-mt-4 text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
