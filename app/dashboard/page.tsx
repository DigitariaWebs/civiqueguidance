"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardShell from "./DashboardShell";
import {
  loadDemandes,
  updateStatut,
  deleteDemande,
  type Demande,
  type Statut,
} from "@/lib/demandes";

const tabs = [
  { id: "rendez-vous", label: "Rendez-vous", icon: "event" },
  { id: "prestations", label: "Prestations", icon: "workspaces" },
  { id: "documents", label: "Documents", icon: "folder" },
  { id: "messages", label: "Messages", icon: "chat" },
  { id: "paiements", label: "Paiements", icon: "payments" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardContent />
    </DashboardShell>
  );
}

function DashboardContent() {
  const [demandes, setDemandes] = useState<Demande[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>("rendez-vous");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setDemandes(await loadDemandes());
      setLoading(false);
    })();
  }, []);

  async function refresh() {
    setDemandes(await loadDemandes());
  }

  async function onChangeStatut(id: string, statut: Statut) {
    // Optimistic UI : on met à jour localement avant la réponse serveur
    setDemandes((ds) =>
      ds.map((d) => (d.id === id ? { ...d, statut } : d))
    );
    await updateStatut(id, statut);
    await refresh();
  }

  async function onDelete(id: string) {
    if (!confirm("Supprimer cette demande ?")) return;
    setDemandes((ds) => ds.filter((d) => d.id !== id));
    await deleteDemande(id);
    await refresh();
  }

  // Stats par catégorie
  const stats = useMemo(
    () => ({
      "rendez-vous": demandes.length,
      prestations: new Set(demandes.map((d) => d.service)).size,
      documents: 0,
      messages: demandes.filter((d) => d.message?.trim()).length,
      paiements: 0,
    }),
    [demandes]
  );

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-[28px] sm:text-[34px] font-black tracking-tight text-ink-black mb-2">
          Tableau de bord
        </h1>
        <p className="text-[14px] text-on-surface-variant">
          Vue d&apos;ensemble des demandes envoyées par les clients depuis le
          site.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={`text-left bg-white border rounded-2xl p-5 transition-all ${
              activeTab === t.id
                ? "border-french-blue shadow-md ring-2 ring-french-blue/10"
                : "border-ink-black/8 hover:border-french-blue/30 hover:shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  activeTab === t.id
                    ? "bg-french-blue text-white"
                    : "bg-french-blue/5 text-french-blue"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {t.icon}
                </span>
              </div>
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant mb-1">
              {t.label}
            </p>
            <p className="text-[26px] font-black text-ink-black leading-none">
              {stats[t.id as keyof typeof stats]}
            </p>
          </button>
        ))}
      </div>

      {/* Tabs nav */}
      <div className="border-b border-ink-black/8 flex flex-wrap gap-1">
        {tabs.map((t) => {
          const active = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-3 text-[13px] font-bold tracking-tight transition-colors relative ${
                active
                  ? "text-french-blue"
                  : "text-on-surface-variant hover:text-ink-black"
              }`}
            >
              {t.label}
              {active && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-french-blue rounded-t" />
              )}
            </button>
          );
        })}
      </div>

      {/* Panel */}
      {activeTab === "rendez-vous" && (
        <DemandesTable
          demandes={demandes}
          onChangeStatut={onChangeStatut}
          onDelete={onDelete}
        />
      )}
      {activeTab === "prestations" && (
        <PrestationsPanel demandes={demandes} />
      )}
      {activeTab === "documents" && (
        <EmptyState
          icon="folder_open"
          title="Aucun document"
          desc="Les documents partagés par les clients apparaîtront ici."
        />
      )}
      {activeTab === "messages" && <MessagesPanel demandes={demandes} />}
      {activeTab === "paiements" && (
        <EmptyState
          icon="payments"
          title="Aucun paiement"
          desc="Les transactions et factures apparaîtront ici."
        />
      )}
    </div>
  );
}

function DemandesTable({
  demandes,
  onChangeStatut,
  onDelete,
}: {
  demandes: Demande[];
  onChangeStatut: (id: string, statut: Statut) => void;
  onDelete: (id: string) => void;
}) {
  if (demandes.length === 0) {
    return (
      <EmptyState
        icon="event_busy"
        title="Aucun rendez-vous"
        desc="Les demandes envoyées via le formulaire apparaîtront ici."
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-ink-black/8 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#fafafc] border-b border-ink-black/6">
            <tr className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              <th className="px-5 py-4">Nom</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Téléphone</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Heure</th>
              <th className="px-5 py-4">Service</th>
              <th className="px-5 py-4">Statut</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes.map((d) => (
              <tr
                key={d.id}
                className="border-b border-ink-black/4 last:border-b-0 hover:bg-[#fafafc] transition-colors"
              >
                <td className="px-5 py-4 text-[14px] font-semibold text-ink-black whitespace-nowrap">
                  {d.name}
                </td>
                <td className="px-5 py-4 text-[13px] text-on-surface-variant break-all">
                  {d.email}
                </td>
                <td className="px-5 py-4 text-[13px] text-on-surface-variant whitespace-nowrap">
                  {d.phone}
                </td>
                <td className="px-5 py-4 text-[13px] text-ink-black whitespace-nowrap">
                  {d.date ? formatDateFR(d.date) : "—"}
                </td>
                <td className="px-5 py-4 text-[13px] text-ink-black whitespace-nowrap">
                  {d.time ?? "—"}
                </td>
                <td className="px-5 py-4 text-[13px] text-ink-black whitespace-nowrap">
                  {d.serviceLabel}
                </td>
                <td className="px-5 py-4">
                  <StatutBadge
                    statut={d.statut}
                    onChange={(s) => onChangeStatut(d.id, s)}
                  />
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => onDelete(d.id)}
                    aria-label="Supprimer"
                    className="w-8 h-8 rounded-lg text-on-surface-variant hover:text-marianne-red hover:bg-marianne-red/10 inline-flex items-center justify-center transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatutBadge({
  statut,
  onChange,
}: {
  statut: Statut;
  onChange: (s: Statut) => void;
}) {
  const styles: Record<Statut, string> = {
    "En attente": "bg-[#fff7e6] text-[#a25a00] border-[#ffd591]",
    Confirmé: "bg-[#e6f7e9] text-[#1e7a3a] border-[#9be0aa]",
    Annulé: "bg-[#fff0f0] text-[#a02020] border-[#ffb3b3]",
  };
  return (
    <select
      value={statut}
      onChange={(e) => onChange(e.target.value as Statut)}
      className={`text-[12px] font-bold rounded-full px-3 py-1.5 border cursor-pointer outline-none transition-all ${styles[statut]}`}
    >
      <option value="En attente">En attente</option>
      <option value="Confirmé">Confirmé</option>
      <option value="Annulé">Annulé</option>
    </select>
  );
}

function PrestationsPanel({ demandes }: { demandes: Demande[] }) {
  const counts = useMemo(() => {
    const map = new Map<string, { label: string; count: number }>();
    demandes.forEach((d) => {
      const e = map.get(d.service);
      if (e) e.count += 1;
      else map.set(d.service, { label: d.serviceLabel, count: 1 });
    });
    return Array.from(map.entries()).sort((a, b) => b[1].count - a[1].count);
  }, [demandes]);

  if (counts.length === 0) {
    return (
      <EmptyState
        icon="workspaces"
        title="Aucune prestation"
        desc="Les services demandés par les clients apparaîtront ici."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {counts.map(([slug, info]) => (
        <div
          key={slug}
          className="bg-white border border-ink-black/8 rounded-2xl p-5 shadow-xs"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-french-blue">
              {info.label}
            </p>
            <span className="text-[13px] font-bold text-on-surface-variant">
              #{slug}
            </span>
          </div>
          <p className="text-[34px] font-black text-ink-black leading-none mb-1">
            {info.count}
          </p>
          <p className="text-[12px] text-on-surface-variant">
            demande{info.count > 1 ? "s" : ""} reçue{info.count > 1 ? "s" : ""}
          </p>
        </div>
      ))}
    </div>
  );
}

function MessagesPanel({ demandes }: { demandes: Demande[] }) {
  const items = demandes.filter((d) => d.message?.trim());
  if (items.length === 0) {
    return (
      <EmptyState
        icon="chat"
        title="Aucun message"
        desc="Les messages laissés via le formulaire apparaîtront ici."
      />
    );
  }
  return (
    <div className="space-y-4">
      {items.map((d) => (
        <article
          key={d.id}
          className="bg-white border border-ink-black/8 rounded-2xl p-6 shadow-xs"
        >
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <div>
              <p className="text-[15px] font-bold text-ink-black">{d.name}</p>
              <p className="text-[12px] text-on-surface-variant">{d.email}</p>
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-french-blue bg-french-blue/5 px-2.5 py-1 rounded-full border border-french-blue/10">
              {d.serviceLabel}
            </span>
          </div>
          <p className="text-[14px] leading-relaxed text-on-surface-variant whitespace-pre-line">
            {d.message}
          </p>
        </article>
      ))}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white border border-dashed border-ink-black/15 rounded-2xl p-12 text-center">
      <div className="w-14 h-14 rounded-full bg-french-blue/5 flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-french-blue text-[28px]">
          {icon}
        </span>
      </div>
      <h3 className="text-[18px] font-bold text-ink-black mb-2">{title}</h3>
      <p className="text-[14px] text-on-surface-variant max-w-md mx-auto">
        {desc}
      </p>
    </div>
  );
}

function formatDateFR(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}
