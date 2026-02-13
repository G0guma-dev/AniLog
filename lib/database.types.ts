// lib/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      anime_entries: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          rating: number;
          comment: string;
          tags: string[] | null;
          season: number;
          episode: number;
          total_episodes: number;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          rating: number;
          comment: string;
          tags?: string[] | null;
          season: number;
          episode: number;
          total_episodes: number;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          rating?: number;
          comment?: string;
          tags?: string[] | null;
          season?: number;
          episode?: number;
          total_episodes?: number;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
