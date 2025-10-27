import { Toaster } from "./shared/components/ui/sonner";
import { Toaster as RHToaster } from "react-hot-toast";
import { useAuthStore } from "./features/auth/stores/auth.store";
import { useEffect } from "react";
import MainRouter from "./app/routes";
import { useRedirectContext } from "./features/auth/contexts/RedirectContext";

const App = () => {
  const { user, signinWithSocialMediaSuccess } = useAuthStore();
  const { handleRedirectWhenSignInSuccess } = useRedirectContext();

  useEffect(() => {
    if (!user) {
      (async () => {
        await signinWithSocialMediaSuccess().then((data) => {
          handleRedirectWhenSignInSuccess(data.data.user);
        });
      })();
    }
  }, []);

  return (
    <div>
      <Toaster />
      <RHToaster />
      <MainRouter />
    </div>
  );
};

export default App;
