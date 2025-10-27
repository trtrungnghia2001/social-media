import { Link, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import SignupForm from "../components/SignupForm";
import SigninForm from "../components/SigninForm";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { useAuthStore } from "../stores/auth.store";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { authPageConfigs } from "../constants";

const AuthenticationPage = () => {
  const location = useLocation();
  const { signinWithSocialMedia } = useAuthStore();

  const path = location.pathname
    .split("/")
    .pop() as keyof typeof authPageConfigs;
  const { title, description } =
    authPageConfigs[path] || authPageConfigs.signin;

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className={"flex flex-col gap-6"}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  onClick={() => signinWithSocialMedia("google")}
                  variant="outline"
                  className="w-full"
                >
                  <FaGoogle />
                  Login with Google
                </Button>
                <Button
                  onClick={() => signinWithSocialMedia("github")}
                  variant="outline"
                  className="w-full"
                >
                  <FaGithub />
                  Login with Github
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              {path === "signup" && <SignupForm />}
              {path === "signin" && <SigninForm />}
              {path === "forgot-password" && <ForgotPasswordForm />}
              {path === "reset-password" && <ResetPasswordForm />}
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{" "}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
          <div className="text-center">
            <Link to={`/`} className="underline text-xs text-muted-foreground">
              Go to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage;
