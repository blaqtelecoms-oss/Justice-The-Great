import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2 } from "lucide-react";
import GoogleIcon from "@/components/GoogleIcon";

// Shared "Continue with Google" button for the Login and Register pages.
// `returnTo` is the already-validated same-origin post-auth destination.
export default function GoogleSignInButton({ returnTo }) {
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await base44.auth.loginWithProvider("google", returnTo && returnTo !== "/" ? returnTo : "/portal");
    } catch (err) {
      setLoading(false);
      // loginWithProvider redirects on success; reaching here means it failed.
      console.error(err);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleGoogle}
        disabled={loading}
        className="w-full h-12 flex items-center justify-center gap-3 rounded-lg border border-input bg-background text-foreground font-medium hover:bg-accent/50 disabled:opacity-50 transition-colors"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <GoogleIcon className="w-5 h-5" />
        )}
        Continue with Google
      </button>
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-wider">
          <span className="bg-card px-2 text-muted-foreground">or</span>
        </div>
      </div>
    </>
  );
}