import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Logo from "@/components/logo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserSigninForm from "./_components/UserSigninForm";
import UserSignupForm from "./_components/UserSignupForm";
import { InputOTPForm } from "./_components/OTPVerifyForm";
import ForgotPassword from "./_components/ForgotPassword";
import ResetPassword from "./_components/ResetPassword";

type AuthPageProps = {
  searchParams: {
    email: string;
    company_email: string;
    forgot_password: string;
    uid: string;
    token: string;
  };
};
export default function AuthPage({ searchParams }: AuthPageProps) {
  const aptForm = () => {
    if (searchParams.email || searchParams.company_email) {
      return <InputOTPForm />;
    } else if (searchParams.forgot_password) {
      return <ForgotPassword email={searchParams.forgot_password} />;
    } else if (searchParams.uid) {
      return <ResetPassword uid={searchParams.uid} token={searchParams.token} />;
    }
    return (
      <Tabs defaultValue="signin">
        <TabsList className="child:flex-1 flex w-full p-0">
          <TabsTrigger value="signin">Sign in</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <UserSigninForm />
        </TabsContent>
        <TabsContent value="signup">
          <UserSignupForm />
        </TabsContent>
      </Tabs>
    );
  };

  return (
    <Card className="mx-auto mt-20 max-w-lg shadow-md min-h-[200px]">
      <CardContent>{aptForm()}</CardContent>
    </Card>
  );
}
