"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "../lib/LocaleProvider";
import { IoCheckmark, IoCloseCircle, IoRefresh } from "react-icons/io5";
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.instagram.com/hagit_int_design/",
    key: "instagram",
    icon: FaInstagram,
  },
  {
    href: "https://www.facebook.com/hagitp.interior.design",
    key: "facebook",
    icon: FaFacebook,
  },
  {
    href: "https://www.linkedin.com/in/hagitoz",
    key: "linkedin",
    icon: FaLinkedin,
  },
];

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
              <IoCheckmark className="w-8 h-8 text-accent" />
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
      <div className="max-w-6xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="w-full">
            <form
              onSubmit={onSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up"
            >
              <label className="grid gap-3 group">
                <input
                  name="name"
                  value={name}
                  placeholder={t("contact.form.namePlaceholder") as string}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 bg-white border-1 px-4 text-body"
                  required
                  disabled={status === "submitting"}
                />
              </label>

              <label className="grid gap-3 group">
                <input
                  name="email"
                  type="email"
                  value={email}
                  placeholder={t("contact.form.emailPlaceholder") as string}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-white border-1 px-4 text-body"
                  required
                  disabled={status === "submitting"}
                />
              </label>

              <label className="sm:col-span-2 grid gap-3 group">
                <textarea
                  name="message"
                  value={message}
                  placeholder={t("contact.form.messagePlaceholder") as string}
                  onChange={(e) => setMessage(e.target.value)}
                  className="min-h-32 px-4 py-3 text-body border-1 resize-none"
                  required
                  disabled={status === "submitting"}
                />
              </label>

              {error && (
                <div className="sm:col-span-2 p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in-up">
                  <div className="flex items-center gap-3">
                    <IoCloseCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
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
                    <IoRefresh className="w-5 h-5 animate-spin" />
                  )}
                  {status === "submitting"
                    ? (t("contact.form.submitSubmitting") as string)
                    : (t("contact.form.submitIdle") as string)}
                </button>
              </div>
            </form>
          </div>

          <section className="lg:sticky lg:top-8">
            <div className="bg-foreground/10 p-8 border border-foreground/10">
              <h2 className="text-2xl font-medium text-foreground mb-8 text-center">
                {t("contact.socialTitle") as string}
              </h2>
              <div className="flex flex-col gap-6">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-4 transition-all duration-300 hover:scale-105 group"
                    >
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:shadow-lg transition-all flex-shrink-0">
                        <IconComponent
                          className="w-8 h-8 text-foreground"
                          aria-label={t(`contact.social.${link.key}`) as string}
                        />
                      </div>
                      <span className="text-body font-medium text-foreground group-hover:text-accent transition-colors min-w-[100px] text-center">
                        {t(`contact.social.${link.key}`) as string}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
