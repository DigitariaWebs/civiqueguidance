-- ============================================================================
-- Fix #1 : ré-écrit les policies RLS de façon plus permissive pour anon
-- Fix #2 : vide les données de démo (l'admin démarre avec une table vide)
--
-- À exécuter dans le SQL Editor Supabase :
--   https://supabase.com/dashboard/project/kfsublmmlcxqnaxoojpy/sql/new
-- ============================================================================
-- ──────────────────────────────────────────────────────────────────────────
-- 1) Reset complet des policies (on supprime, on recrée)
-- ──────────────────────────────────────────────────────────────────────────
drop policy if exists "Public can insert demandes" on public.demandes;

drop policy if exists "Authenticated can read demandes" on public.demandes;

drop policy if exists "Authenticated can update demandes" on public.demandes;

drop policy if exists "Authenticated can delete demandes" on public.demandes;

-- INSERT : tout le monde peut insérer (formulaire public).
-- "to public" couvre anon ET authenticated (et tout autre rôle).
create policy "Anyone can insert demandes" on public.demandes for
insert
    to public
with
    check (true);

-- SELECT/UPDATE/DELETE : uniquement les utilisateurs connectés (admin)
create policy "Authenticated can read demandes" on public.demandes for
select
    to authenticated using (true);

create policy "Authenticated can update demandes" on public.demandes
for update
    to authenticated using (true)
with
    check (true);

create policy "Authenticated can delete demandes" on public.demandes for delete to authenticated using (true);

-- ──────────────────────────────────────────────────────────────────────────
-- 2) Supprime les données de démo (les 6 demandes Barry / Diallo / Oumar / moussa)
-- ──────────────────────────────────────────────────────────────────────────
delete from public.demandes
where
    email in (
        'ibrahimalincoln1985@gmail.com',
        'd.souleymane21@outlook.fr',
        'issabarry67@gmail.com'
    );
