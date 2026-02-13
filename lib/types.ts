export type AnimeEntry = {
  id: string;
  user_id: string;
  title: string;
  rating: number;
  comment: string;
  tags: string[];
  season: number;
  episode: number;
  total_episodes: number;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};
