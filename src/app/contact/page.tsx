"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "../lib/LocaleProvider";

export default function ContactPage() {
  const { t } = useLocale();
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("submitting");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data?.error || (t("contact.form.errorFailed") as string)
        );
      }
      setStatus("success");
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : (t("contact.form.errorGeneric") as string) || "";
      setError(msg);
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8">
        <div className="max-w-2xl mx-auto text-center animate-fade-in-up px-4 w-full">
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-8 border border-accent/20">
            <div className="w-16 h-16 mx-auto mb-6 bg-accent/10 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="heading-md text-accent mb-4">
              {(t("contact.form.successTitle") as string) || "Message Sent!"}
            </h3>
            <p className="text-body text-foreground/70 mb-6">
              {(t("contact.form.successMessage") as string) ||
                "Thank you for your inquiry. I'll get back to you as soon as possible to discuss your project."}
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setName("");
                setEmail("");
                setMessage("");
                setError(null);
              }}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 bg-accent text-background hover:brightness-95 hover:scale-105 shadow-sm"
            >
              {(t("contact.form.sendAnother") as string) ||
                "Send Another Message"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8">
      <div className="max-w-2xl mx-auto px-4 w-full">
        <form
          onSubmit={onSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up"
        >
          <label className="grid gap-3 group">
            <span className="text-caption font-medium text-foreground/80 group-focus-within:text-accent transition-colors">
              {t("contact.form.nameLabel") as string}
            </span>
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12 bg-white border-1 px-4 text-body focus:border-accent/30 focus:ring-2 focus:ring-accent/10"
              required
              disabled={status === "submitting"}
            />
          </label>

          <label className="grid gap-3 group">
            <span className="text-caption font-medium text-foreground/80 group-focus-within:text-accent transition-colors">
              {t("contact.form.emailLabel") as string}
            </span>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white border-1 px-4 text-body focus:border-accent/30 focus:ring-2 focus:ring-accent/10"
              required
              disabled={status === "submitting"}
            />
          </label>

          <label className="sm:col-span-2 grid gap-3 group">
            <span className="text-caption font-medium text-foreground/80 group-focus-within:text-accent transition-colors">
              {t("contact.form.messageLabel") as string}
            </span>
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-32 px-4 py-3 text-body border-1 focus:border-accent/30 focus:ring-2 focus:ring-accent/10 resize-none"
              required
              disabled={status === "submitting"}
            />
          </label>

          {error && (
            <div className="sm:col-span-2 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in-up">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-red-500 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-caption text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="sm:col-span-2 pt-4">
            <button
              disabled={status !== "idle"}
              className="w-full h-12 bg-accent text-background font-medium transition-all duration-300 hover:brightness-95 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md flex items-center justify-center gap-3"
            >
              {status === "submitting" && (
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              )}
              {status === "submitting"
                ? (t("contact.form.submitSubmitting") as string)
                : (t("contact.form.submitIdle") as string)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
