import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, Building2, User, Loader2 } from "lucide-react";
import { useState } from "react";
import { WordMark } from "@/components/cyber/LogoMark";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Request access — AetherSec" },
      { name: "description", content: "Provision a new AetherSec workspace." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate({ to: "/onboarding" }), 700);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12 font-sans overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 blur-3xl rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <Link to="/" className="inline-flex mb-8"><WordMark /></Link>

        <div className="cyber-card p-8">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-primary mb-3">
            // provision workspace
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Request operator access.
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Early access cohort — your workspace is provisioned within 60 seconds.
          </p>

          <form onSubmit={onSubmit} className="mt-7 space-y-3">
            <Row>
              <Field icon={<User className="w-4 h-4" />} placeholder="Full name" />
              <Field icon={<Building2 className="w-4 h-4" />} placeholder="Company" />
            </Row>
            <Field icon={<Mail className="w-4 h-4" />} type="email" placeholder="operator@company.com" />
            <Field icon={<Lock className="w-4 h-4" />} type="password" placeholder="Create cipher key" />

            <label className="flex items-start gap-2 text-xs text-muted-foreground pt-1 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-primary mt-0.5" />
              <span>
                I accept the <a className="text-primary hover:underline" href="#">Engagement Terms</a> &
                authorize scoped scanning of declared assets.
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-medium px-5 py-3 rounded-lg glow-cyan hover:brightness-110 transition disabled:opacity-60"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Provisioning…</> : <>Provision workspace <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            Already have access?{" "}
            <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>;
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
