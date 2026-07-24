import LoginForm from "@/components/auth/LoginForm";
import LoginHero from "@/components/auth/LoginHero";
import SocialLogin from "@/components/auth/SocialLogin";
import TrustStats from "@/components/auth/TrustStats";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden lg:flex relative overflow-hidden p-16 text-white">
          {/* Background Effects */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col justify-between w-full">
            <div>
              <LoginHero />
            </div>
            <TrustStats />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold">
                Welcome Back
              </h1>
              <p className="text-slate-500 mt-2">
                Sign in to continue
              </p>
            </div>

            <SocialLogin />

            <div className="relative my-6">
              <div className="border-t border-slate-200" />
              <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-4 text-xs text-slate-500">
                OR CONTINUE WITH EMAIL
              </span>
            </div>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
