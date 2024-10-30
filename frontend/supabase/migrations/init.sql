create table profile (
    id serial primary key,
    user_name varchar(100),
    email varchar(100),
    user_id uuid references auth.users
);

create table profile_image_group (
    id serial primary key,
    inserted_at timestamp default timezone('est' :: text, now()) not null,
    updated_at timestamp default timezone('est' :: text, now()) not null,
    owner_id int references profile
);

create table profile_image (
    id serial primary key,
    inserted_at timestamp default timezone('est' :: text, now()) not null,
    updated_at timestamp default timezone('est' :: text, now()) not null,
    value text,
    query text,
    group_id int references profile_image_group
);

create table user_flows (
    id serial primary key,
    inserted_at timestamp default timezone('est' :: text, now()) not null,
    updated_at timestamp default timezone('est' :: text, now()) not null,
    user_id uuid references auth.users,
    flow_name varchar(100),
    flow_data jsonb
);

alter table
    profile enable row level security;

alter table
    profile_image_group enable row level security;

alter table
    profile_image enable row level security;

alter table
    user_flows enable row level security;

-- CREATE THE STORAGE BUCKET
insert into
    storage.buckets (id, name)
values
    ('profile_images', 'Profile Images');

-- security for storage bucket
create policy "Public Write Access" on storage.objects for
insert
    with check (bucket_id = 'profile_images');

create policy "Individual user Access" on storage.objects for
select
    using (auth.uid() = owner);