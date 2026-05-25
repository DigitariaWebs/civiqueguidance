-- ============================================================================
-- DémarchesCivique — schéma initial
--
-- À exécuter dans Supabase Studio :
--   1. Ouvre https://supabase.com/dashboard/project/kfsublmmlcxqnaxoojpy/sql
--   2. Colle ce fichier entier
--   3. Clique sur "Run"
-- ============================================================================

-- Table des demandes envoyées par les clients via le formulaire ou le calendrier
create table if not exists public.demandes (
    id uuid primary key default gen_random_uuid (),
    created_at timestamptz not null default now(),
    name text not null,
    email text not null,
    phone text not null,
    service text not null,
    service_label text not null,
    message text default '',
    -- créneau optionnel (depuis le calendrier)
    date date,
    "time" text,
    -- statut : "En attente" | "Confirmé" | "Annulé"
    statut text not null default 'En attente' check (
        statut in ('En attente', 'Confirmé', 'Annulé')
    )
);

create index if not exists demandes_created_at_idx on public.demandes (created_at desc);
create index if not exists demandes_statut_idx on public.demandes (statut);

-- Active Row Level Security : par défaut personne ne peut rien
alter table public.demandes enable row level security;

-- POLICY 1 : tout le monde (visiteurs anon) peut INSÉRER une demande
-- C'est ce qui permet au formulaire public de fonctionner.
drop policy if exists "Public can insert demandes" on public.demandes;

create policy "Public can insert demandes" on public.demandes for
insert
    to anon,
    authenticated
with
    check (true);

-- POLICY 2 : seuls les utilisateurs authentifiés (admin) peuvent LIRE
drop policy if exists "Authenticated can read demandes" on public.demandes;

create policy "Authenticated can read demandes" on public.demandes for
select
    to authenticated using (true);

-- POLICY 3 : seuls les utilisateurs authentifiés peuvent METTRE À JOUR (changer le statut)
drop policy if exists "Authenticated can update demandes" on public.demandes;

create policy "Authenticated can update demandes" on public.demandes
for update
    to authenticated using (true)
with
    check (true);

-- POLICY 4 : seuls les utilisateurs authentifiés peuvent SUPPRIMER
drop policy if exists "Authenticated can delete demandes" on public.demandes;

create policy "Authenticated can delete demandes" on public.demandes for delete to authenticated using (true);

-- Données de démo (les 6 demandes que tu m'as fournies)
insert into
    public.demandes (
        name,
        email,
        phone,
        service,
        service_label,
        date,
        "time",
        statut
    )
values
    (
        'Barry ibrahima',
        'ibrahimalincoln1985@gmail.com',
        '0751252309',
        'demandeurs-asile',
        'Demandeurs d''asile',
        '2026-05-25',
        '12:00',
        'En attente'
    ),
    (
        'Ibrahima Barry',
        'Ibrahimalincoln1985@gmail.com',
        '0749039174',
        'titre-de-sejour',
        'Titre de séjour',
        '2026-04-05',
        '11:00',
        'En attente'
    ),
    (
        'DIALLO SOULEYMANE',
        'd.souleymane21@outlook.fr',
        '0749499663',
        'etudiants',
        'Étudiants (France/Canada)',
        '2026-04-01',
        '11:00',
        'En attente'
    ),
    (
        'Barry ibrahima',
        'ibrahimalincoln1985@gmail.com',
        '0751252309',
        'demandeurs-asile',
        'Demandeurs d''asile',
        '2026-04-05',
        '10:00',
        'Confirmé'
    ),
    (
        'Oumar sow',
        'issabarry67@gmail.com',
        '0785459683',
        'titre-de-sejour',
        'Titre de séjour',
        '2026-03-09',
        '10:00',
        'En attente'
    ),
    (
        'moussa',
        'issabarry67@gmail.com',
        '0758855039',
        'titre-de-sejour',
        'Titre de séjour',
        '2026-03-08',
        '14:00',
        'Confirmé'
    );
