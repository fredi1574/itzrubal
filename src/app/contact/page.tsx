"use client";

import { FaWhatsapp } from "react-icons/fa";
import { FormEvent, useState } from "react";
import { useLocale } from "../lib/LocaleProvider";
import { IoCheckmark, IoCloseCircle, IoRefresh } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { MdAlternateEmail } from "react-icons/md";
import { LuClock3, LuMapPin } from "react-icons/lu";

export default function ContactPage() {
  const { t } = useLocale();
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
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
        body: JSON.stringify({ name, phone, email, message }),
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
      <div className="contact-page min-h-[calc(100vh-200px)] flex items-center justify-center py-8 px-4">
        <div className="max-w-2xl mx-auto text-center animate-fade-in-up w-full">
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-8 border border-accent/20 rounded-3xl">
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
                setPhone("");
                setEmail("");
                setMessage("");
                setError(null);
              }}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition-all duration-300 bg-accent text-background hover:brightness-95 hover:scale-105 shadow-sm rounded-xl"
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
    <div className="contact-page min-h-[calc(100vh-200px)] py-10 px-4">
      <div className="max-w-4xl mx-auto w-full">
        <div className=" rounded-3xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-accent to-[#a89885] text-background py-16 px-8 md:px-12 text-center">
            <h1 className="heading-xl mb-6 text-background font-light tracking-wide">
              {(t("contact.headerTitle") as string) ||
                "Let's start planning together"}
            </h1>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            <form onSubmit={onSubmit}>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
                {/* Form Section */}
                <div className="lg:w-3/5">
                  <h2 className="heading-md text-foreground mb-8 font-normal">
                    {(t("contact.formTitle") as string) || "Leave your details"}
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block mb-2 text-foreground font-medium text-sm"
                      >
                        {(t("contact.nameLabel") as string) || "Full name"}{" "}
                        <span className="text-red-500">
                          {t("contact.required") as string}
                        </span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={status === "submitting"}
                        className="w-full px-4 py-4 border-2 border-[#e0e0e0] rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(191,163,149,0.1)] disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-foreground font-medium text-sm"
                      >
                        {(t("contact.phoneLabel") as string) || "Phone"}{" "}
                        <span className="text-red-500">
                          {t("contact.required") as string}
                        </span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        disabled={status === "submitting"}
                        className="w-full px-4 py-4 border-2 border-[#e0e0e0] rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(191,163,149,0.1)] disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-foreground font-medium text-sm"
                      >
                        {(t("contact.emailLabel") as string) || "Email"}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={status === "submitting"}
                        className="w-full px-4 py-4 border-2 border-[#e0e0e0] rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(191,163,149,0.1)] disabled:opacity-60"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-2 text-foreground font-medium text-sm"
                      >
                        {(t("contact.messageLabel") as string) ||
                          "Tell me a bit about the project"}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        disabled={status === "submitting"}
                        className="w-full px-4 py-4 border-2 border-[#e0e0e0] rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(191,163,149,0.1)] resize-y min-h-[150px] disabled:opacity-60"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Info Section */}
                <div className="lg:w-3/5">
                  <div className="pt-0 pb-2 px-2 md:pt-0 md:pb-10 md:px-10">
                    <div className="space-y-5">
                      {/* Phone */}
                      <div className="flex items-center gap-4 p-4  rounded-xl transition-all duration-300 hover:scale-[1.02]">
                        <div className="text-2xl min-w-[30px]">
                          <FiPhone />
                        </div>
                        <div className="flex-1">
                          <span className="text-foreground/70">
                            <a
                              href="tel:+972503200133"
                              className="text-accent no-underline transition-colors duration-300 hover:text-foreground"
                            >
                              050-3200133
                            </a>
                          </span>
                        </div>
                      </div>

                      {/* WhatsApp */}
                      <div className="flex items-center gap-4 p-4  rounded-xl transition-all duration-300 hover:scale-[1.02]">
                        <div className="text-2xl min-w-[30px]">
                          <FaWhatsapp />
                        </div>
                        <div className="flex-1">
                          <span className="text-foreground/70">
                            <a
                              href="https://wa.me/972500000000"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent no-underline transition-colors duration-300 hover:text-foreground"
                            >
                              {(t("contact.whatsappLink") as string) ||
                                "Send a message"}
                            </a>
                          </span>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-4 p-4  rounded-xl transition-all duration-300 hover:scale-[1.02]">
                        <div className="text-2xl min-w-[30px]">
                          <MdAlternateEmail />
                        </div>
                        <div className="flex-1">
                          <span className="text-foreground/70">
                            <a
                              href="mailto:design@example.com"
                              className="text-accent no-underline transition-colors duration-300 hover:text-foreground"
                            >
                              design@example.com
                            </a>
                          </span>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-4 p-4  rounded-xl transition-all duration-300 hover:scale-[1.02]">
                        <div className="text-2xl min-w-[30px]">
                          <LuMapPin />
                        </div>
                        <div className="flex-1">
                          <span className="text-foreground/70">
                            {(t("contact.locationValue") as string) ||
                              "Haifa, Krayot and the North"}
                          </span>
                        </div>
                      </div>

                      {/* Hours */}
                      <div className="flex items-center gap-4 p-4  rounded-xl transition-all duration-300 hover:scale-[1.02]">
                        <div className="text-2xl min-w-[30px]">
                          <LuClock3 />
                        </div>
                        <div className="flex-1">
                          <span className="text-foreground/70">
                            {(t("contact.hoursValue") as string) ||
                              "Sun–Thu, 9:00–17:00"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error and Submit Button */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in-up mb-6">
                  <div className="flex items-center gap-3">
                    <IoCloseCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-caption text-red-700">{error}</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={status !== "idle"}
                className="w-full py-5 bg-gradient-to-br from-accent mb-4 to-[#a89885] text-background border-none text-lg font-medium cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_5px_20px_rgba(191,163,149,0.4)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center justify-center gap-3 tracking-wide"
              >
                {status === "submitting" && (
                  <IoRefresh className="w-5 h-5 animate-spin" />
                )}
                {status === "submitting"
                  ? (t("contact.form.submitSubmitting") as string)
                  : (t("contact.form.submitIdle") as string)}
              </button>
            </form>

            {/* Next Steps Section */}
            <div className="bg-gradient-to-br from-muted/50 to-muted/30  p-8 mb-10 border-r-4 border-accent">
              <h3 className="heading-sm text-foreground mb-4 font-normal">
                {(t("contact.nextStepsTitle") as string) ||
                  "What happens after you send?"}
              </h3>
              <p className="text-body text-foreground/80 leading-relaxed text-base">
                {(t("contact.nextStepsText") as string) ||
                  "I'll get back to you within 24 hours, we'll schedule a short introductory call (no commitment), and we'll understand together how we can move forward."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
