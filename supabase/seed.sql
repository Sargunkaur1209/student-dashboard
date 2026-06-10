-- Run this in your Supabase SQL Editor (replaces previous seed)

-- ─── Courses ────────────────────────────────────────────────────────────────
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  icon_name text not null default 'book',
  total_modules integer not null default 10,
  completed_modules integer not null default 0,
  due_date date,
  created_at timestamptz default now()
);

alter table courses enable row level security;
create policy "Allow public read on courses" on courses for select using (true);

insert into courses (title, progress, icon_name, total_modules, completed_modules, due_date) values
  ('Full-Stack Web Development', 68, 'code', 24, 16, now() + interval '12 days'),
  ('UI/UX Design Fundamentals', 42, 'palette', 18, 8,  now() + interval '5 days'),
  ('Database Engineering',       91, 'database', 20, 18, now() + interval '3 days'),
  ('Machine Learning Basics',    15, 'brain', 30, 5,  now() + interval '21 days');

-- ─── Activity Feed ──────────────────────────────────────────────────────────
create table if not exists activity_feed (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  detail text,
  icon_name text not null default 'zap',
  created_at timestamptz default now()
);

alter table activity_feed enable row level security;
create policy "Allow public read on activity_feed" on activity_feed for select using (true);

insert into activity_feed (label, detail, icon_name, created_at) values
  ('Completed Module 16',       'Full-Stack Web Development',  'check-circle', now() - interval '30 minutes'),
  ('Earned "Quick Learner" badge', null,                       'trophy',       now() - interval '2 hours'),
  ('Started new module',        'Database Engineering',        'play-circle',  now() - interval '5 hours'),
  ('Streak extended to 12 days', null,                         'flame',        now() - interval '1 day'),
  ('Quiz passed with 94%',      'UI/UX Design Fundamentals',   'star',         now() - interval '2 days');

-- ─── User Stats ─────────────────────────────────────────────────────────────
create table if not exists user_stats (
  id uuid primary key default gen_random_uuid(),
  total_hours integer not null default 0,
  xp_points integer not null default 0,
  completion_rate integer not null default 0,
  certificates integer not null default 0,
  updated_at timestamptz default now()
);

alter table user_stats enable row level security;
create policy "Allow public read on user_stats" on user_stats for select using (true);

insert into user_stats (total_hours, xp_points, completion_rate, certificates) values
  (38, 4250, 72, 2);
