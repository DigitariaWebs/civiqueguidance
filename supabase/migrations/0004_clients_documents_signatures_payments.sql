-- ============================================================================
-- Schéma complet : comptes clients, documents, signatures, paiements
-- À exécuter dans le SQL Editor Supabase :
--   https://supabase.com/dashboard/project/kfsublmmlcxqnaxoojpy/sql/new
-- ============================================================================
-- ──────────────────────────────────────────────────────────────────────────
-- 1) Lien entre demandes et utilisateurs authentifiés (client_id optionnel)
-- ──────────────────────────────────────────────────────────────────────────
alter table public.demandes
add column if not exists client_id uuid references auth.users (id) on delete set null;

create index if not exists demandes_client_id_idx on public.demandes (client_id);

-- ──────────────────────────────────────────────────────────────────────────
-- 2) Profil client (infos étendues : nom, téléphone, ...)
-- ──────────────────────────────────────────────────────────────────────────
create table if not exists public.client_profiles (
    id uuid primary key references auth.users (id) on delete cascade,
    full_name text not null,
    phone text default '',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.client_profiles enable row level security;

drop policy if exists "Users can read own profile" on public.client_profiles;

create policy "Users can read own profile" on public.client_profiles for
select
    to authenticated using (auth.uid () = id);

drop policy if exists "Users can insert own profile" on public.client_profiles;

create policy "Users can insert own profile" on public.client_profiles for
insert
    to authenticated
with
    check (auth.uid () = id);

drop policy if exists "Users can update own profile" on public.client_profiles;

create policy "Users can update own profile" on public.client_profiles
for update
    to authenticated using (auth.uid () = id)
with
    check (auth.uid () = id);

-- ──────────────────────────────────────────────────────────────────────────
-- 3) Documents uploadés par les clients (réfère un fichier dans Storage)
-- ──────────────────────────────────────────────────────────────────────────
create table if not exists public.client_documents (
    id uuid primary key default gen_random_uuid (),
    created_at timestamptz not null default now(),
    client_id uuid not null references auth.users (id) on delete cascade,
    demande_id uuid references public.demandes (id) on delete set null,
    filename text not null, -- nom original du fichier
    storage_path text not null, -- chemin dans le bucket Supabase Storage
    size_bytes bigint default 0,
    mime_type text default ''
);

create index if not exists client_documents_client_id_idx on public.client_documents (client_id);

create index if not exists client_documents_demande_id_idx on public.client_documents (demande_id);

alter table public.client_documents enable row level security;

drop policy if exists "Users can read own documents" on public.client_documents;

create policy "Users can read own documents" on public.client_documents for
select
    to authenticated using (auth.uid () = client_id);

drop policy if exists "Users can insert own documents" on public.client_documents;

create policy "Users can insert own documents" on public.client_documents for
insert
    to authenticated
with
    check (auth.uid () = client_id);

drop policy if exists "Users can delete own documents" on public.client_documents;

create policy "Users can delete own documents" on public.client_documents for delete to authenticated using (auth.uid () = client_id);

-- ──────────────────────────────────────────────────────────────────────────
-- 4) Signatures électroniques (click-to-sign, base64 PNG d'un canvas)
-- ──────────────────────────────────────────────────────────────────────────
create table if not exists public.signatures (
    id uuid primary key default gen_random_uuid (),
    created_at timestamptz not null default now(),
    client_id uuid not null references auth.users (id) on delete cascade,
    demande_id uuid references public.demandes (id) on delete set null,
    signature_data text not null, -- data:image/png;base64,...
    document_label text default '', -- description de ce qui est signé
    ip_address text default '', -- IP au moment de la signature (preuve)
    user_agent text default ''
);

create index if not exists signatures_client_id_idx on public.signatures (client_id);

alter table public.signatures enable row level security;

drop policy if exists "Users can read own signatures" on public.signatures;

create policy "Users can read own signatures" on public.signatures for
select
    to authenticated using (auth.uid () = client_id);

drop policy if exists "Users can insert own signatures" on public.signatures;

create policy "Users can insert own signatures" on public.signatures for
insert
    to authenticated
with
    check (auth.uid () = client_id);

-- ──────────────────────────────────────────────────────────────────────────
-- 5) Paiements Stripe (historique des transactions)
-- ──────────────────────────────────────────────────────────────────────────
create table if not exists public.payments (
    id uuid primary key default gen_random_uuid (),
    created_at timestamptz not null default now(),
    client_id uuid references auth.users (id) on delete set null,
    demande_id uuid references public.demandes (id) on delete set null,
    stripe_session_id text unique,
    stripe_payment_intent text,
    amount_cents integer not null,
    currency text not null default 'eur',
    status text not null default 'pending' check (
        status in ('pending', 'paid', 'failed', 'refunded')
    ),
    receipt_url text default '',
    receipt_sent_at timestamptz
);

create index if not exists payments_client_id_idx on public.payments (client_id);

create index if not exists payments_demande_id_idx on public.payments (demande_id);

create index if not exists payments_status_idx on public.payments (status);

alter table public.payments enable row level security;

-- Le client voit ses propres paiements
drop policy if exists "Users can read own payments" on public.payments;

create policy "Users can read own payments" on public.payments for
select
    to authenticated using (auth.uid () = client_id);

-- Les inserts/updates passent par le webhook Stripe côté serveur (service_role)
-- → pas de policy pour anon/authenticated en insert/update sur payments.
-- ──────────────────────────────────────────────────────────────────────────
-- 6) Storage bucket pour les documents clients
--    (À créer manuellement dans Storage UI si besoin, mais cette commande crée tout)
-- ──────────────────────────────────────────────────────────────────────────
-- Crée le bucket "client-documents" privé (pas d'accès public)
insert into
    storage.buckets (id, name, public)
values
    ('client-documents', 'client-documents', false) on conflict (id) do nothing;

-- RLS Storage : un client peut lire/écrire UNIQUEMENT dans son propre dossier
-- (les fichiers sont stockés sous {user_id}/{filename})
drop policy if exists "Users can upload to own folder" on storage.objects;

create policy "Users can upload to own folder" on storage.objects for
insert
    to authenticated
with
    check (
        bucket_id = 'client-documents'
        and auth.uid ()::text = (storage.foldername (name)) [1]
    );

drop policy if exists "Users can read own files" on storage.objects;

create policy "Users can read own files" on storage.objects for
select
    to authenticated using (
        bucket_id = 'client-documents'
        and auth.uid ()::text = (storage.foldername (name)) [1]
    );

drop policy if exists "Users can delete own files" on storage.objects;

create policy "Users can delete own files" on storage.objects for delete to authenticated using (
    bucket_id = 'client-documents'
    and auth.uid ()::text = (storage.foldername (name)) [1]
);

-- ──────────────────────────────────────────────────────────────────────────
-- 7) Trigger : crée automatiquement un profil quand un user s'inscrit
-- ──────────────────────────────────────────────────────────────────────────
create or replace function public.handle_new_user () returns trigger language plpgsql security definer
set
    search_path = public as $$
begin
  insert into public.client_profiles (id, full_name, phone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    coalesce(new.raw_user_meta_data->>'phone', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users for each row
execute function public.handle_new_user ();
