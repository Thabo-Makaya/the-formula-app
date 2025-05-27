
-- USERS table
create table users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text,
  spotifyId text,
  googleId text,
  createdAt timestamp default current_timestamp
);
-- PEERS table
create table peers (
  id uuid primary key default gen_random_uuid(),
  userId uuid references users(id),
  peerArtistId text,
  createdAt timestamp default current_timestamp
);
-- MATRIX_METRICS table
create table matrix_metrics (
  id uuid primary key default gen_random_uuid(),
  userId uuid references users(id),
  incomeSource text,
  sharePct float,
  yoyGrowth float,
  marginPct float,
  fanImpactScore float,
  bcgCategory text,
  timestamp timestamp
);
-- PRICING_LOGS table
create table pricing_logs (
  id uuid primary key default gen_random_uuid(),
  userId uuid references users(id),
  serviceType text,
  recommendedLow float,
  recommendedHigh float,
  actualFee float,
  createdAt timestamp default current_timestamp
);
-- SPLITS table
create table splits (
  id uuid primary key default gen_random_uuid(),
  userId uuid references users(id),
  trackId text,
  collaboratorId text,
  sharePct float
);
-- DRAFTS table
create table drafts (
  id uuid primary key default gen_random_uuid(),
  userId uuid references users(id),
  tipId uuid references tips(id),
  content text,
  createdAt timestamp default current_timestamp
);
-- TIPS table
create table tips (
  id uuid primary key default gen_random_uuid(),
  tipText text,
  createdAt timestamp default current_timestamp
);
