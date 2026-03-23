"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { personalInfo } from "@/data/portfolio-data";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(personalInfo.formspreeEndpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const card = "rounded-2xl border border-border bg-card p-6";

  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Kontakt aufnehmen"
          subtitle="Du hast ein Projekt oder eine Frage? Schreib mir – ich melde mich schnellstmöglich zurück."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className={card}>
              <h3 className="font-semibold mb-5">Kontaktinformationen</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">E-Mail</p>
                    <a href={`mailto:${personalInfo.email}`} className="text-sm hover:text-accent transition-colors">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Telefon</p>
                    <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`} className="text-sm hover:text-accent transition-colors">
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Adresse</p>
                    <p className="text-sm whitespace-pre-line">{personalInfo.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={card}>
              <h3 className="font-semibold mb-4">Social Media</h3>
              <div className="flex gap-3">
                {[
                  { href: personalInfo.social.linkedin, icon: <LinkedinIcon size={18} />, label: "LinkedIn" },
                  { href: personalInfo.social.github, icon: <GithubIcon size={18} />, label: "GitHub" },
                  { href: personalInfo.social.instagram, icon: <InstagramIcon size={18} />, label: "Instagram" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/30 transition-colors"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className={card}>
              <h3 className="font-semibold mb-6">Nachricht senden</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1.5">Name *</label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1.5">E-Mail *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:border-accent/50 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1.5">Betreff *</label>
                  <input
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:border-accent/50 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1.5">Nachricht *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full px-4 py-2.5 rounded-lg bg-background border border-border text-sm focus:outline-none focus:border-accent/50 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent text-white font-semibold hover:bg-accent/80 transition-all shadow-lg shadow-accent/25 disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Nachricht senden
                    </>
                  )}
                </button>

                {status === "success" && (
                  <div className="flex items-center gap-2 text-green-400 text-sm mt-2">
                    <CheckCircle size={16} />
                    Nachricht erfolgreich gesendet!
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm mt-2">
                    <AlertCircle size={16} />
                    Ein Fehler ist aufgetreten. Bitte versuche es erneut.
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14"
        >
          <h3 className="text-xl font-semibold font-[family-name:var(--font-poppins)] text-center mb-6">
            Standort
          </h3>
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2550.1234567890123!2d8.676789!3d50.585789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bc4c1234567890%3A0xabcdef1234567890!2sEichendorffring%2099%2C%2035394%20Gie%C3%9Fen%2C%20Germany!5e0!3m2!1sde!2sde!4v1234567890123&hl=de&lang=de"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Standort in Gießen"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
