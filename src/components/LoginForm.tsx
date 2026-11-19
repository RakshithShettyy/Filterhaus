"use client";

import { useState } from "react";
import { site } from "@/data/site";

export function LoginForm() {
  const copy = site.admin;
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password.trim()) {
      setError(copy.passwordError);
      document.getElementById("studio-password")?.focus();
      return;
    }
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!response.ok) {
        setError(copy.badPassword);
        setPending(false);
        document.getElementById("studio-password")?.focus();
        return;
      }
      window.location.assign("/admin");
    } catch {
      setError(copy.failed);
      setPending(false);
    }
  };

  return (
    <form className="mt-10 max-w-sm" noValidate onSubmit={onSubmit}>
      <label htmlFor="studio-password" className="text-[0.72rem] font-medium uppercase tracking-[0.16em] text-gold-dark">
        {copy.passwordLabel}
      </label>
      <input
        id="studio-password"
        type="password"
        autoComplete="current-password"
        value={password}
        maxLength={80}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "studio-password-error" : undefined}
        className="mt-3 w-full border-b border-line bg-transparent py-3 text-ink outline-none"
        onChange={(event) => {
          setPassword(event.target.value);
          setError("");
        }}
      />
      {error ? (
        <p id="studio-password-error" role="alert" className="mt-3 text-sm text-brown">
          {error}
        </p>
      ) : null}
      <button type="submit" className="btn btn-primary press mt-8" disabled={pending}>
        {pending ? copy.signingIn : copy.signIn}
      </button>
    </form>
  );
}
