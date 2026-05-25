-- ============================================================================
-- Fix #3 : policy d'INSERT plus explicite (cible anon + authenticated nommément)
-- À exécuter dans le SQL Editor Supabase :
--   https://supabase.com/dashboard/project/kfsublmmlcxqnaxoojpy/sql/new
-- ============================================================================
-- Sécurité : on s'assure que RLS est bien activé sur la table
alter table public.demandes enable row level security;

-- Drop toutes les anciennes policies d'INSERT (peu importe leur nom)
drop policy if exists "Anyone can insert demandes" on public.demandes;

drop policy if exists "Public can insert demandes" on public.demandes;

drop policy if exists "anyone_can_insert" on public.demandes;

-- Nouvelle policy explicite : anon ET authenticated peuvent insérer
create policy "anon_or_authenticated_can_insert" on public.demandes as permissive for
insert
    to anon,
    authenticated
with
    check (true);

-- ============================================================================
-- Vérification : liste les policies actives sur demandes
-- (résultat affiché en bas après l'exécution)
-- ============================================================================
select
    polname as policy_name,
    polcmd as command,
    polroles::regrole[] as applied_to,
    polqual as using_expr,
    polwithcheck as with_check_expr
from
    pg_policy
where
    polrelid = 'public.demandes'::regclass
order by
    polname;
