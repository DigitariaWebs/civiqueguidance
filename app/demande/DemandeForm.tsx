"use client";

import { useState } from "react";

const servicesOptions = [
  { value: "demandeurs-asile", label: "Demandeurs d'asile" },
  { value: "etudiants", label: "Étudiants (France & Canada)" },
  { value: "titre-de-sejour", label: "Titre de séjour" },
  { value: "naturalisation", label: "Naturalisation française" },
  { value: "regroupement-familial", label: "Regroupement familial" },
  { value: "regularisation", label: "Régularisation administrative" },
  { value: "autre", label: "Autre démarche" },
];

export default function DemandeForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    // Pas de backend pour l'instant — simulation visuelle de l'envoi.
    setTimeout(() => setStatus("sent"), 600);
  }

  if (status === "sent") {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-french-blue/10 flex items-center justify-center mx-auto mb-5">
          <span className="material-symbols-outlined text-french-blue text-[32px]">
            mark_email_read
          </span>
        </div>
        <h3 className="text-2xl font-bold text-ink-black mb-3">
          Demande envoyée
        </h3>
        <p className="text-[15px] text-on-surface-variant max-w-md mx-auto">
          Nous revenons vers vous sous 24h ouvrées avec une proposition
          d&apos;accompagnement adaptée à votre situation.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[14px] font-bold text-french-blue hover:underline"
        >
          ← Faire une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Nom complet" required>
          <input
            type="text"
            name="name"
            required
            placeholder="Jean Dupont"
            className="form-input"
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            name="email"
            required
            placeholder="jean.dupont@email.com"
            className="form-input"
          />
        </Field>
      </div>

      <Field label="Téléphone" required>
        <input
          type="tel"
          name="phone"
          required
          placeholder="+33 6 12 34 56 78"
          className="form-input"
        />
      </Field>

      <Field label="Service souhaité" required>
        <select name="service" required className="form-input" defaultValue="">
          <option value="" disabled>
            Sélectionnez un service
          </option>
          {servicesOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Description de votre situation" required>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Décrivez votre besoin, votre situation actuelle, et toute information utile pour comprendre votre dossier…"
          className="form-input resize-y"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-french-blue hover:bg-[#000066] disabled:opacity-60 text-white py-4 rounded-xl text-[15px] font-bold tracking-wide shadow-md transition-all active:scale-[0.99]"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer la demande"}
      </button>

      <p className="text-[12px] text-on-surface-variant text-center">
        Vos données sont sécurisées et confidentielles, conformes au RGPD.
      </p>

      <style jsx>{`
        .form-input {
          width: 100%;
          background: #ffffff;
          border: 1px solid rgba(22, 22, 22, 0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: #161616;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input::placeholder {
          color: rgba(22, 22, 22, 0.35);
        }
        .form-input:focus {
          border-color: #000091;
          box-shadow: 0 0 0 4px rgba(0, 0, 145, 0.08);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[12px] font-bold uppercase tracking-wider text-on-surface-variant mb-2">
        {label}
        {required && <span className="text-marianne-red ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
