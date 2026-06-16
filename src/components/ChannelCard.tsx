import React from 'react';
import { Heart, Tv, Trash2, Edit } from 'lucide-react';
import { Channel } from '../types';

interface ChannelCardProps {
  key?: string | number;
  channel: Channel;
  isActive: boolean;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: (e: React.MouseEvent) => void;
  onDeleteCustom?: () => void;
  status?: 'checking' | 'working' | 'broken';
}

export default function ChannelCard({
  channel,
  isActive,
  isFavorite,
  onSelect,
  onToggleFavorite,
  onDeleteCustom,
  status
}: ChannelCardProps): React.JSX.Element {
  return (
    <div
      onClick={onSelect}
      id={`channel-card-${channel.id}`}
      className={`relative group rounded-xl p-3 flex gap-3 transition-all duration-300 cursor-pointer border transform active:scale-[0.98] select-none ${
        isActive
          ? 'bg-emerald-500/10 border-emerald-500 shadow-lg shadow-emerald-500/5'
          : 'bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 border-slate-100 dark:border-slate-800/50 shadow-xs'
      }`}
    >
      {/* Active Line Indicator */}
      {isActive && (
        <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r-lg bg-emerald-500"></div>
      )}

      {/* Thumbnail/Logo */}
      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/40 flex items-center justify-center">
        {channel.logo ? (
          <img
            src={channel.logo}
            alt={channel.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=150&auto=format&fit=crop&q=60';
            }}
          />
        ) : (
          <Tv className="w-6 h-6 text-slate-400 dark:text-slate-500" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-md ${
              channel.category === 'cartoon' ? 'bg-rose-500/15 text-rose-500' :
              channel.category === 'news' ? 'bg-emerald-500/15 text-emerald-500' :
              channel.category === 'movie' ? 'bg-amber-500/15 text-amber-500' :
              channel.category === 'sports' ? 'bg-violet-500/15 text-violet-500' :
              'bg-cyan-500/15 text-cyan-500'
            }`}>
              {channel.category === 'cartoon' ? 'কার্টুন' :
               channel.category === 'news' ? 'খবর' :
               channel.category === 'movie' ? 'মুভি' :
               channel.category === 'sports' ? 'খেলাধুলা' :
               'বিনোদন'}
            </span>
            {channel.isCustom && (
              <span className="text-[10px] font-bold bg-slate-500/15 text-slate-500 dark:text-slate-400 px-1 py-0.5 rounded-md">
                আমার
              </span>
            )}
            {status && (
              <span className={`text-[10.5px] uppercase font-extrabold tracking-wide px-1.5 py-0.5 rounded-md inline-flex items-center gap-1 ${
                status === 'working' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' :
                status === 'checking' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 animate-pulse' :
                'bg-rose-500/10 text-rose-600 dark:text-rose-400'
              }`}>
                <span className={`h-1 w-1 rounded-full ${
                  status === 'working' ? 'bg-emerald-500 animate-ping' :
                  status === 'checking' ? 'bg-amber-500' :
                  'bg-rose-500'
                }`} />
                {status === 'working' ? 'সচল' : status === 'checking' ? 'চেকিং' : 'অচল'}
              </span>
            )}
          </div>
          <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 truncate leading-snug">
            {channel.name}
          </h4>
        </div>
        <p className="text-slate-400 dark:text-slate-500 text-[11px] truncate mt-0.5 font-medium">
          {channel.description || 'লাইভ টিভি ব্রডকাস্ট স্ট্রিম'}
        </p>
      </div>

      {/* Actions (Favorite & Delete custom) */}
      <div className="flex flex-col justify-between items-end gap-1 flex-shrink-0 z-10" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onToggleFavorite}
          id={`favorite-btn-${channel.id}`}
          className={`p-1.5 rounded-lg transition hover:scale-110 active:scale-95 ${
            isFavorite 
              ? 'text-red-500 bg-red-500/10 hover:bg-red-500/20' 
              : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
          }`}
          title="প্রিয় চ্যানেলে যোগ করুন"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-red-500' : ''}`} />
        </button>

        {channel.isCustom && onDeleteCustom && (
          <button
            onClick={onDeleteCustom}
            id={`delete-btn-${channel.id}`}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 dark:text-slate-500 hover:bg-rose-500/10 transition active:scale-95"
            title="চ্যানেলটি মুছুন"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
