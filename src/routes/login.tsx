import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, Github, Loader2, KeyRound, Fingerprint } from "lucide-react";
import { useState } from "react";
import { WordMark } from "@/components/cyber/LogoMark";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — AetherSec" },
      { name: "description", content: "Authenticate to your AetherSec workspace." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/onboarding" }), 700);
  };

  return (
    <div className="relative min-h-screen grid lg:grid-cols-2 overflow-hidden font-sans">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />

      {/* Left — form */}
      <div className="relative flex flex-col px-6 sm:px-10 lg:px-16 py-8">
        <Link to="/" className="inline-flex w-fit"><WordMark /></Link>

        <div className="flex-1 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
          >
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-3">
              // secure access
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Authenticate operator.
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Continue to your AetherSec workspace. All sessions are logged & MFA-enforced.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-2.5">
              <SocialBtn icon={<Fingerprint className="w-4 h-4" />} label="Continue with SSO" />
              <SocialBtn icon={<Github className="w-4 h-4" />} label="Google Workspace" />
            </div>

            <div className="my-6 flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              <span className="flex-1 h-px bg-white/[0.06]" />
              or with email
              <span className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              <Field icon={<Mail className="w-4 h-4" />} type="email" placeholder="operator@company.com" />
              <Field icon={<Lock className="w-4 h-4" />} type="password" placeholder="••••••••••••" />

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                  <input type="checkbox" className="accent-primary" /> Trust this device
                </label>
                <a href="#" className="text-primary hover:underline font-mono">forgot key?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium px-5 py-3 rounded-lg glow-cyan hover:brightness-110 transition disabled:opacity-60"
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating…</> : <>Sign in <ArrowRight className="w-4 h-4" /></>}
              </button>
            </form>

            <p className="mt-6 text-xs text-muted-foreground text-center">
              No account?{" "}
              <Link to="/signup" className="text-primary hover:underline">Request access</Link>
            </p>
          </motion.div>
        </div>

        <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          © {new Date().getFullYear()} AetherSec Labs · session token issued via mTLS
        </p>
      </div>

      {/* Right — visual */}
      <div className="relative hidden lg:flex items-center justify-center border-l border-white/[0.06] bg-depth-1/30 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -top-32 right-0 w-[600px] h-[600px] bg-primary/15 blur-3xl rounded-full" />
        <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] bg-secondary/15 blur-3xl rounded-full" />

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative cyber-card scanline p-10 w-[80%] max-w-md text-center"
        >
          <div className="relative mx-auto w-28 h-28 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center mb-6 animate-pulse-glow">
            <div className="absolute inset-3 rounded-full border border-primary/20" />
            <KeyRound className="w-10 h-10 text-primary" strokeWidth={1.4} />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">Cognitive Engine standing by</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            52 offensive modules armed. Your last engagement closed 7 critical findings.
          </p>
          <div className="mt-6 font-mono text-[10px] text-left bg-black/40 rounded-md p-3 border border-white/[0.05] text-muted-foreground">
            <div><span className="text-cyber-green">[+]</span> mfa enforced</div>
            <div><span className="text-cyber-green">[+]</span> session token sealed</div>
            <div><span className="text-primary">[*]</span> awaiting operator…</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SocialBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-2.5 rounded-lg text-xs hover:bg-white/[0.05] transition"
    >
      {icon} <span className="truncate">{label}</span>
    </button>
  );
}

function Field({ icon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { icon: React.ReactNode }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
      <input
        {...props}
        className="w-full bg-white/[0.03] border border-white/10 rounded-lg pl-10 pr-3 py-3 text-sm font-mono placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/60 focus:bg-white/[0.05] transition"
      />
    </div>
  );
}
