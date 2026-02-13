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

      // ✅ 추가: profiles 테이블(닉네임 저장용)
      profiles: {
        Row: {
          id: string; // auth.users.id 와 동일
          nickname: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          nickname?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          nickname?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
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
