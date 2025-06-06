import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const useGetCurrentPage = () => {
  const location = useLocation();
  const url = location.pathname;
  return {
    isLoginPage: url.endsWith("/login"),
    isRegisterPage: url.endsWith("/signup"),
    isForgotPasswordPage: url.endsWith("/forgot-password"),
  };
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const { isForgotPasswordPage, isLoginPage, isRegisterPage } = useGetCurrentPage();
  const key = isLoginPage ? "Login" : "Register";

  return (
    <div className="relative z-10 flex min-h-screen w-full items-start justify-center overflow-hidden md:items-center">
      <div
        className={cn(
          "bg-primary",
          "absolute top-1/2 -z-10 h-1/2 w-1/4 -translate-y-1/2 drop-shadow transition",
          (isLoginPage || isForgotPasswordPage) && "right-1/2 -translate-x-[45%]",
          isRegisterPage && "left-1/2 translate-x-[45%]"
        )}
      />
      <div
        className={cn(
          "bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%",
          "absolute top-1/2 -z-10 h-1/2 w-1/4 -translate-y-1/2 drop-shadow transition",
          (isLoginPage || isForgotPasswordPage) && "left-1/2 translate-x-[45%]",
          isRegisterPage && "right-1/2 -translate-x-[45%]"
        )}
      />
      <div className="relative z-10 flex h-screen w-full flex-col-reverse bg-white drop-shadow-2xl md:h-[75vh] md:w-11/12 md:flex-row lg:w-2/3">
        <div
          className={cn(
            "bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%",
            "z-20 flex h-full w-full origin-left scale-x-100 flex-col items-center justify-center p-4 px-8 transition-all md:w-1/2 lg:px-20",
            isRegisterPage && "md:translate-x-full",
            isForgotPasswordPage && "scale-x-0"
          )}
        >
          <div className="flex flex-col items-center gap-4">
            <h1 className="text-center !text-6xl text-black">{key} Title</h1>
            <p className="font-semibold text-black">{key} Description</p>
            <Link to={isLoginPage ? "/signup" : "/login"}>
              <Button>{key === "Login" ? "Register" : "Login"}</Button>
            </Link>
          </div>
        </div>
        <div
          className={cn(
            "z-10 w-full p-8 transition-transform md:w-1/2 lg:p-0",
            isRegisterPage && "md:-translate-x-full",
            isForgotPasswordPage && "-translate-x-1/2"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;