export interface Channel {
  id: string;
  name: string;
  url: string;
  category: 'cartoon' | 'news' | 'movie' | 'sports' | 'entertainment' | 'custom';
  logo?: string;
  isCustom?: boolean;
  description?: string;
}

export type CategoryFilter = 'all' | 'cartoon' | 'news' | 'movie' | 'sports' | 'entertainment' | 'custom' | 'favorite' | 'recent';

export interface PlaybackState {
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  isFullscreen: boolean;
  isPip: boolean;
  progress: number;
  duration: number;
  isBuffering: boolean;
  error: string | null;
}
