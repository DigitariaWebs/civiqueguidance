-- ============================================================================
-- Permet à l'admin de voir tous les documents et signatures des clients.
-- À exécuter dans le SQL Editor Supabase :
--   https://supabase.com/dashboard/project/kfsublmmlcxqnaxoojpy/sql/new
-- ============================================================================
-- Fonction utilitaire : retourne true si l'utilisateur courant est admin.
-- Pour ajouter un admin : ajoute son email dans la liste ci-dessous.
create or replace function public.is_admin () returns boolean language sql stable security definer
set
    search_path = public,
    auth as $$
  select (auth.jwt() ->> 'email') in (
    'service.horizon224@gmail.com'
    -- , 'autre.admin@example.com'   -- décommente pour ajouter d'autres admins
  )
$$;

-- ──────────────────────────────────────────────────────────────────────────
-- Documents : l'admin peut TOUT lire (en plus de la policy "owner")
-- ──────────────────────────────────────────────────────────────────────────
drop policy if exists "Admins can read all documents" on public.client_documents;

create policy "Admins can read all documents" on public.client_documents for
select
    to authenticated using (public.is_admin ());

-- Storage : l'admin peut télécharger n'importe quel fichier du bucket
drop policy if exists "Admins can read all files" on storage.objects;

create policy "Admins can read all files" on storage.objects for
select
    to authenticated using (
        bucket_id = 'client-documents'
        and public.is_admin ()
    );

-- ──────────────────────────────────────────────────────────────────────────
-- Signatures : l'admin peut TOUT lire
-- ──────────────────────────────────────────────────────────────────────────
drop policy if exists "Admins can read all signatures" on public.signatures;

create policy "Admins can read all signatures" on public.signatures for
select
    to authenticated using (public.is_admin ());

-- ──────────────────────────────────────────────────────────────────────────
-- Profils clients : l'admin peut lire tous les profils (pour avoir le nom à côté du doc)
-- ──────────────────────────────────────────────────────────────────────────
drop policy if exists "Admins can read all profiles" on public.client_profiles;

create policy "Admins can read all profiles" on public.client_profiles for
select
    to authenticated using (public.is_admin ());
