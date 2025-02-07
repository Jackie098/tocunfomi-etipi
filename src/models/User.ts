export type User = {
  id: string;
  name: string | null;
  created_at: Date;
  updated_at: Date;
  discord_id: string;
  discord_nickname: string;
  email: string;
  avatar_url: string | null;
  is_validated: boolean;
  is_email_validated: boolean;
  team_id: string | null;
} | null;
