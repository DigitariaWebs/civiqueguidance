import { createClient, isSupabaseConfigured } from "./supabase/browser";

export type Statut = "En attente" | "Confirmé" | "Annulé";

// Forme renvoyée à l'app (camelCase pour rester compatible avec l'UI existante)
export type Demande = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  serviceLabel: string;
  message: string;
  date?: string | null;
  time?: string | null;
  statut: Statut;
};

// Forme côté DB (snake_case)
type DemandeRow = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  service_label: string;
  message: string | null;
  date: string | null;
  time: string | null;
  statut: Statut;
};

function rowToDemande(r: DemandeRow): Demande {
  return {
    id: r.id,
    createdAt: r.created_at,
    name: r.name,
    email: r.email,
    phone: r.phone,
    service: r.service,
    serviceLabel: r.service_label,
    message: r.message ?? "",
    date: r.date ?? undefined,
    time: r.time ?? undefined,
    statut: r.statut,
  };
}

export async function loadDemandes(): Promise<Demande[]> {
  if (!isSupabaseConfigured()) {
    console.warn("[demandes] Supabase non configuré, dashboard vide");
    return [];
  }
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("demandes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[demandes] loadDemandes:", error.message);
      return [];
    }
    return (data ?? []).map((r) => rowToDemande(r as DemandeRow));
  } catch (e) {
    console.error("[demandes] loadDemandes exception:", e);
    return [];
  }
}

export async function saveDemande(input: {
  name: string;
  email: string;
  phone: string;
  service: string;
  serviceLabel: string;
  message: string;
  date?: string;
  time?: string;
}): Promise<Demande | null> {
  if (!isSupabaseConfigured()) {
    console.error("[demandes] Supabase non configuré, impossible d'enregistrer");
    return null;
  }
  const supabase = createClient();
  const { data, error } = await supabase
    .from("demandes")
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone,
      service: input.service,
      service_label: input.serviceLabel,
      message: input.message,
      date: input.date || null,
      time: input.time || null,
      statut: "En attente",
    })
    .select("*")
    .single();

  if (error) {
    console.error("[demandes] saveDemande:", error.message);
    return null;
  }
  return rowToDemande(data as DemandeRow);
}

export async function updateStatut(id: string, statut: Statut): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase
    .from("demandes")
    .update({ statut })
    .eq("id", id);
  if (error) console.error("[demandes] updateStatut:", error.message);
}

export async function deleteDemande(id: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.from("demandes").delete().eq("id", id);
  if (error) console.error("[demandes] deleteDemande:", error.message);
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
