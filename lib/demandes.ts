/**
 * Stockage des demandes dans localStorage (côté client uniquement).
 * Permet au dashboard admin de voir les demandes envoyées via le formulaire.
 *
 * NOTE: c'est une solution de démo qui marche uniquement sur le même navigateur.
 * Pour la production il faut remplacer par un vrai backend (Supabase, API route, etc.)
 */

export type Statut = "En attente" | "Confirmé" | "Annulé";

export type Demande = {
  id: string;
  createdAt: string; // ISO
  name: string;
  email: string;
  phone: string;
  service: string;
  serviceLabel: string;
  message: string;
  // Optionnels — remplis si la demande vient du calendrier
  date?: string; // YYYY-MM-DD
  time?: string; // HH:MM
  statut: Statut;
};

const KEY = "ds_demandes";

// Données de démo affichées au premier chargement du dashboard
const SEED: Demande[] = [
  {
    id: "seed-1",
    createdAt: "2026-05-25T10:00:00Z",
    name: "Barry ibrahima",
    email: "ibrahimalincoln1985@gmail.com",
    phone: "0751252309",
    service: "demandeurs-asile",
    serviceLabel: "Demandeurs d'asile",
    message: "",
    date: "2026-05-25",
    time: "12:00",
    statut: "En attente",
  },
  {
    id: "seed-2",
    createdAt: "2026-04-05T11:00:00Z",
    name: "Ibrahima Barry",
    email: "Ibrahimalincoln1985@gmail.com",
    phone: "0749039174",
    service: "titre-de-sejour",
    serviceLabel: "Titre de séjour",
    message: "",
    date: "2026-04-05",
    time: "11:00",
    statut: "En attente",
  },
  {
    id: "seed-3",
    createdAt: "2026-04-01T11:00:00Z",
    name: "DIALLO SOULEYMANE",
    email: "d.souleymane21@outlook.fr",
    phone: "0749499663",
    service: "etudiants",
    serviceLabel: "Étudiants (France/Canada)",
    message: "",
    date: "2026-04-01",
    time: "11:00",
    statut: "En attente",
  },
  {
    id: "seed-4",
    createdAt: "2026-04-05T10:00:00Z",
    name: "Barry ibrahima",
    email: "ibrahimalincoln1985@gmail.com",
    phone: "0751252309",
    service: "demandeurs-asile",
    serviceLabel: "Demandeurs d'asile",
    message: "",
    date: "2026-04-05",
    time: "10:00",
    statut: "Confirmé",
  },
  {
    id: "seed-5",
    createdAt: "2026-03-09T10:00:00Z",
    name: "Oumar sow",
    email: "issabarry67@gmail.com",
    phone: "0785459683",
    service: "titre-de-sejour",
    serviceLabel: "Titre de séjour",
    message: "",
    date: "2026-03-09",
    time: "10:00",
    statut: "En attente",
  },
  {
    id: "seed-6",
    createdAt: "2026-03-08T14:00:00Z",
    name: "moussa",
    email: "issabarry67@gmail.com",
    phone: "0758855039",
    service: "titre-de-sejour",
    serviceLabel: "Titre de séjour",
    message: "",
    date: "2026-03-08",
    time: "14:00",
    statut: "Confirmé",
  },
];

export function loadDemandes(): Demande[] {
  if (typeof window === "undefined") return SEED;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(SEED));
      return SEED;
    }
    return JSON.parse(raw) as Demande[];
  } catch {
    return SEED;
  }
}

export function saveDemande(
  demande: Omit<Demande, "id" | "createdAt" | "statut"> & {
    statut?: Statut;
  }
): Demande {
  const full: Demande = {
    id: `d-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: new Date().toISOString(),
    statut: demande.statut ?? "En attente",
    ...demande,
  };
  if (typeof window === "undefined") return full;
  const current = loadDemandes();
  const next = [full, ...current];
  localStorage.setItem(KEY, JSON.stringify(next));
  return full;
}

export function updateStatut(id: string, statut: Statut) {
  if (typeof window === "undefined") return;
  const current = loadDemandes();
  const next = current.map((d) => (d.id === id ? { ...d, statut } : d));
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function deleteDemande(id: string) {
  if (typeof window === "undefined") return;
  const current = loadDemandes();
  const next = current.filter((d) => d.id !== id);
  localStorage.setItem(KEY, JSON.stringify(next));
}

export const SERVICE_LABELS: Record<string, string> = {
  "demandeurs-asile": "Demandeurs d'asile",
  etudiants: "Étudiants (France & Canada)",
  "titre-de-sejour": "Titre de séjour",
  naturalisation: "Naturalisation française",
  "regroupement-familial": "Regroupement familial",
  regularisation: "Régularisation administrative",
  cv: "CV & Lettre de motivation",
  autre: "Autre démarche",
};
