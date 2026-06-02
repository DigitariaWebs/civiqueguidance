import { createClient, isSupabaseConfigured } from "./supabase/browser";

export type AdminDocument = {
  id: string;
  createdAt: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  filename: string;
  storagePath: string;
  sizeBytes: number;
  mimeType: string;
};

export async function loadAllDocuments(): Promise<AdminDocument[]> {
  if (!isSupabaseConfigured()) return [];
  try {
    const supabase = createClient();
    const { data: docs, error } = await supabase
      .from("client_documents")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      console.error("[admin-data] loadAllDocuments:", error.message);
      return [];
    }

    // Récupère les profils des clients pour afficher leur nom à côté du doc
    const clientIds = Array.from(new Set((docs ?? []).map((d) => d.client_id)));
    let profiles: Array<{ id: string; full_name: string }> = [];
    if (clientIds.length > 0) {
      const { data: profilesData } = await supabase
        .from("client_profiles")
        .select("id, full_name")
        .in("id", clientIds);
      profiles = profilesData ?? [];
    }
    const profileMap = new Map(profiles.map((p) => [p.id, p.full_name]));

    // Récupère les emails depuis auth.users via une requête séparée (impossible direct via RLS,
    // on utilise les emails stockés dans les demandes comme proxy)
    const { data: demandes } = await supabase
      .from("demandes")
      .select("client_id, email")
      .in("client_id", clientIds);
    const emailMap = new Map<string, string>();
    (demandes ?? []).forEach((d) => {
      if (d.client_id && !emailMap.has(d.client_id)) {
        emailMap.set(d.client_id, d.email);
      }
    });

    return (docs ?? []).map((d) => ({
      id: d.id,
      createdAt: d.created_at,
      clientId: d.client_id,
      clientName: profileMap.get(d.client_id) ?? "Client inconnu",
      clientEmail: emailMap.get(d.client_id) ?? "",
      filename: d.filename,
      storagePath: d.storage_path,
      sizeBytes: d.size_bytes ?? 0,
      mimeType: d.mime_type ?? "",
    }));
  } catch (e) {
    console.error("[admin-data] loadAllDocuments exception:", e);
    return [];
  }
}

export async function getAdminDocumentUrl(
  storagePath: string
): Promise<string | null> {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from("client-documents")
      .createSignedUrl(storagePath, 60 * 60);
    if (error || !data) return null;
    return data.signedUrl;
  } catch {
    return null;
  }
}
