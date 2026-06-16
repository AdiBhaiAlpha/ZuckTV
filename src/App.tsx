import React, { useState, useEffect, useMemo } from 'react';
import { 
  Tv, Search, Moon, Sun, Plus, RefreshCw, Heart, 
  HelpCircle, Radio, Sparkles, Database, ExternalLink,
  ChevronRight, Compass, ShieldCheck, PlayCircle, History,
  Trash2
} from 'lucide-react';
import { DEFAULT_CHANNELS, CATEGORIES } from './data';
import { Channel, CategoryFilter } from './types';
import VideoPlayer from './components/VideoPlayer';
import ChannelCard from './components/ChannelCard';
import ChannelForm from './components/ChannelForm';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('live_tv_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // Cool dark focused UI as default for cinematic experience
  });

  // Channels state
  const [channels, setChannels] = useState<Channel[]>(() => {
    const saved = localStorage.getItem('live_tv_custom_channels');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Channel[];
        return [...DEFAULT_CHANNELS, ...parsed];
      } catch (e) {
        return DEFAULT_CHANNELS;
      }
    }
    return DEFAULT_CHANNELS;
  });

  // Favorites state (array of channel IDs)
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('live_tv_favorites');
    if (saved) {
      try {
        return JSON.parse(saved) as string[];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Recently watched state (array of channel IDs, max 5)
  const [recents, setRecents] = useState<string[]>(() => {
    const saved = localStorage.getItem('live_tv_recents');
    if (saved) {
      try {
        return JSON.parse(saved) as string[];
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  // Selected Channel state
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Channel online checking states
  const [statuses, setStatuses] = useState<Record<string, 'checking' | 'working' | 'broken'>>(() => {
    const saved = localStorage.getItem('live_tv_channel_statuses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return {};
      }
    }
    return {};
  });
  const [isCheckingAll, setIsCheckingAll] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [showOnlyWorking, setShowOnlyWorking] = useState(true);

  // Sync theme to root class
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('live_tv_theme', theme);
  }, [theme]);

  // Save customized custom channels
  useEffect(() => {
    const customs = channels.filter(c => c.isCustom);
    localStorage.setItem('live_tv_custom_channels', JSON.stringify(customs));
  }, [channels]);

  // Save favorites
  useEffect(() => {
    localStorage.setItem('live_tv_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Save recents
  useEffect(() => {
    localStorage.setItem('live_tv_recents', JSON.stringify(recents));
  }, [recents]);

  // Check a single channel's reachable status via advanced dual-mode checks
  const checkChannelStatus = async (url: string): Promise<boolean> => {
    if (!url) return false;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      
      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      
      if (response.ok || response.status < 400) {
        return true;
      }
    } catch (e) {
      // CORS fallback test with mode: 'no-cors' style resource detection
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        await fetch(url, {
          method: 'GET',
          mode: 'no-cors',
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        return true;
      } catch (err) {
        return false;
      }
    }
    return false;
  };

  // Check all channels in parallel batches
  const checkAllChannels = async (targetChannelsList: Channel[]) => {
    if (isCheckingAll) return;
    setIsCheckingAll(true);
    setProgress({ current: 0, total: targetChannelsList.length });

    const newStatuses = { ...statuses };
    
    // Set all checked targets as 'checking' first
    targetChannelsList.forEach(ch => {
      newStatuses[ch.id] = 'checking';
    });
    setStatuses({ ...newStatuses });

    const batchSize = 12;
    for (let i = 0; i < targetChannelsList.length; i += batchSize) {
      const batch = targetChannelsList.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (ch) => {
          const isWorking = await checkChannelStatus(ch.url);
          const statusResult = isWorking ? 'working' : 'broken';
          newStatuses[ch.id] = statusResult;
          
          setStatuses(prev => ({
            ...prev,
            [ch.id]: statusResult
          }));
          
          setProgress(p => ({
            ...p,
            current: Math.min(p.current + 1, targetChannelsList.length)
          }));
        })
      );
    }

    setIsCheckingAll(false);
    localStorage.setItem('live_tv_channel_statuses', JSON.stringify(newStatuses));
  };

  // Automatically select the first channel on launch (restoring last session or selecting first working!)
  useEffect(() => {
    // Run full auto verification on startup
    if (channels.length > 0) {
      checkAllChannels(channels);
    }

    const lastSessionId = localStorage.getItem('live_tv_last_channel_id');
    if (lastSessionId) {
      const match = channels.find(c => c.id === lastSessionId);
      if (match) {
        setSelectedChannel(match);
        return;
      }
    }

    // Try to pre-select a known working channel
    const cachedStatuses = localStorage.getItem('live_tv_channel_statuses');
    if (cachedStatuses) {
      try {
        const parsed = JSON.parse(cachedStatuses) as Record<string, string>;
        const firstWorking = channels.find(c => parsed[c.id] === 'working');
        if (firstWorking) {
          setSelectedChannel(firstWorking);
          return;
        }
      } catch (e) {
        // Fail silently
      }
    }

    if (channels.length > 0) {
      setSelectedChannel(channels[0]);
    }
  }, []);

  const handleSelectChannel = (channel: Channel) => {
    setSelectedChannel(channel);
    localStorage.setItem('live_tv_last_channel_id', channel.id);

    // Update Recently Watched list (max 5 items)
    setRecents(prev => {
      const filtered = prev.filter(id => id !== channel.id);
      return [channel.id, ...filtered].slice(0, 5);
    });
  };

  const handleClearRecents = () => {
    if (confirm('আপনি কি সাম্প্রতিক ভিউ করা চ্যানেলগুলোর তালিকা মুছে ফেলতে চান?')) {
      setRecents([]);
    }
  };

  const handleToggleFavorite = (channelId: string) => {
    setFavorites(prev => {
      if (prev.includes(channelId)) {
        return prev.filter(id => id !== channelId);
      } else {
        return [...prev, channelId];
      }
    });
  };

  // Real-time status updates from the video player as user watches
  const handleReportPlayerStatus = (channelId: string, isWorking: boolean) => {
    const statusVal = isWorking ? 'working' : 'broken';
    if (statuses[channelId] !== statusVal) {
      setStatuses(prev => {
        const updated = { ...prev, [channelId]: statusVal };
        localStorage.setItem('live_tv_channel_statuses', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const handleAddChannel = async (newChannel: Omit<Channel, 'id'>) => {
    const channelWithId: Channel = {
      ...newChannel,
      id: `custom-${Date.now()}`
    };
    setChannels(prev => [...prev, channelWithId]);
    
    // Set checking state initially
    setStatuses(prev => ({ ...prev, [channelWithId.id]: 'checking' }));
    handleSelectChannel(channelWithId);

    // Dynamic test for newly added stream
    const isWorking = await checkChannelStatus(newChannel.url);
    setStatuses(prev => {
      const updated = { ...prev, [channelWithId.id]: isWorking ? 'working' : 'broken' };
      localStorage.setItem('live_tv_channel_statuses', JSON.stringify(updated));
      return updated;
    });
  };

  const handleImportM3u = async (newChannelsList: Omit<Channel, 'id'>[]) => {
    const baseId = Date.now();
    const channelsWithIds: Channel[] = newChannelsList.map((ch, index) => ({
      ...ch,
      id: `custom-${baseId}-${index}`
    }));
    setChannels(prev => [...prev, ...channelsWithIds]);
    if (channelsWithIds.length > 0) {
      handleSelectChannel(channelsWithIds[0]);
    }

    // Automatically trigger verification loop for newly imported channels
    checkAllChannels([...channels, ...channelsWithIds]);
  };

  const handleDeleteCustom = (channelId: string) => {
    if (confirm('আপনি কি নিশ্চিত যে এই চ্যানেলটি ডিলিট করতে চান?')) {
      setChannels(prev => prev.filter(c => c.id !== channelId));
      setFavorites(prev => prev.filter(id => id !== channelId));
      setRecents(prev => prev.filter(id => id !== channelId));

      // Clean up cached status
      setStatuses(prev => {
        const updated = { ...prev };
        delete updated[channelId];
        localStorage.setItem('live_tv_channel_statuses', JSON.stringify(updated));
        return updated;
      });

      if (selectedChannel?.id === channelId) {
        const remaining = channels.filter(c => c.id !== channelId);
        setSelectedChannel(remaining.length > 0 ? remaining[0] : null);
      }
    }
  };

  const handleResetToDefaults = () => {
    if (confirm('আপনার কি সব কাস্টম চ্যানেল মুছে দিয়ে একদম ডিফল্ট চ্যানেল লিস্ট ফিরিয়ে আনতে চান?')) {
      setChannels(DEFAULT_CHANNELS);
      setFavorites([]);
      setRecents([]);

      // Clear checking states & refresh defaults verification
      setStatuses({});
      localStorage.removeItem('live_tv_channel_statuses');

      if (DEFAULT_CHANNELS.length > 0) {
        handleSelectChannel(DEFAULT_CHANNELS[0]);
      }
      setSelectedCategory('all');
      setSearchQuery('');

      // Run verification for default list immediately
      setTimeout(() => {
        checkAllChannels(DEFAULT_CHANNELS);
      }, 300);
    }
  };

  // Memoized count metadata for each category tab
  const categoryCounts = useMemo(() => {
    const activeChannels = showOnlyWorking 
      ? channels.filter(c => statuses[c.id] !== 'broken')
      : channels;

    const counts: Record<CategoryFilter, number> = {
      all: activeChannels.length,
      cartoon: activeChannels.filter(c => c.category === 'cartoon').length,
      news: activeChannels.filter(c => c.category === 'news').length,
      movie: activeChannels.filter(c => c.category === 'movie').length,
      sports: activeChannels.filter(c => c.category === 'sports').length,
      entertainment: activeChannels.filter(c => c.category === 'entertainment').length,
      custom: activeChannels.filter(c => c.isCustom).length,
      favorite: favorites.filter(id => {
        const ch = channels.find(c => c.id === id);
        return ch && (!showOnlyWorking || statuses[id] !== 'broken');
      }).length,
      recent: recents.filter(id => {
        const ch = channels.find(c => c.id === id);
        return ch && (!showOnlyWorking || statuses[id] !== 'broken');
      }).length
    };
    return counts;
  }, [channels, favorites, recents, statuses, showOnlyWorking]);

  // Filtering channels
  const filteredChannels = useMemo(() => {
    let list: Channel[] = [];

    // Category filter
    if (selectedCategory === 'favorite') {
      list = channels.filter(ch => favorites.includes(ch.id));
    } else if (selectedCategory === 'recent') {
      // Map back to current actual channel objects in precise order
      list = recents
        .map(id => channels.find(ch => ch.id === id))
        .filter((ch): ch is Channel => !!ch);
    } else if (selectedCategory === 'custom') {
      list = channels.filter(ch => ch.isCustom);
    } else if (selectedCategory !== 'all') {
      list = channels.filter(ch => ch.category === selectedCategory);
    } else {
      list = channels;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter(ch => {
        const matchesName = ch.name.toLowerCase().includes(query);
        const matchesDesc = ch.description?.toLowerCase().includes(query) || false;
        const matchesCat = ch.category.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCat;
      });
    }

    // Filter out broken channels if showOnlyWorking is active
    if (showOnlyWorking) {
      list = list.filter(ch => statuses[ch.id] !== 'broken');
    }

    return list;
  }, [channels, selectedCategory, favorites, recents, searchQuery, statuses, showOnlyWorking]);

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      
      {/* Dynamic Ambient Background Blur */}
      <div className="absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none blur-3xl z-0" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/75 dark:bg-slate-950/75 border-b border-slate-200/60 dark:border-slate-800/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo with pulsating live dot */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-950 font-black text-lg">
              <Tv className="w-5.5 h-5.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight leading-none text-slate-900 dark:text-white">
                  ZuckTV
                </h1>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 font-medium">
                স্মার্ট লাইভ টেলিভিশন ড্যাশবোর্ড
              </p>
            </div>
          </div>

          {/* Quick Stats Banner (Centered on tablet/desktop) */}
          <div className="hidden md:flex items-center gap-4 text-xs font-semibold bg-slate-100 dark:bg-slate-900 rounded-full py-1.5 px-4 border border-slate-200/40 dark:border-slate-800/40 select-none">
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>মোট চ্যানেল: <strong className="text-slate-950 dark:text-white">{channels.length}</strong></span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>প্রিয়: <strong className="text-slate-950 dark:text-white">{favorites.length}</strong></span>
            </div>
          </div>

          {/* Top Actions: Add custom, Reset, Dark mode toggle */}
          <div className="flex items-center gap-1.5">
            {/* Reset Defaults button */}
            <button
              onClick={handleResetToDefaults}
              aria-label="রিসেট"
              className="p-2 sm:px-3 sm:py-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/40 text-xs font-bold transition flex items-center gap-1.5"
              title="ডিফল্ট চ্যানেলে রিসেট করুন"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">রিসেট</span>
            </button>

            {/* Manual Stream Add button */}
            <button
              onClick={() => setIsAddOpen(true)}
              id="dashboard-add-channel-btn"
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-bold transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/10 text-xs sm:text-sm"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>যুক্ত করুন</span>
            </button>

            {/* Dark Mode switcher */}
            <button
              onClick={() => setTheme(p => p === 'light' ? 'dark' : 'light')}
              id="dashboard-theme-toggle"
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition"
              title={theme === 'dark' ? 'লাইট মোড চালু করুন' : 'ডার্ক মোড চালু করুন'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Video screen & Details (Plays on 7 cols out of 12) */}
          <section className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
            {selectedChannel ? (
              <>
                <div className="relative">
                  {/* Dynamic player backdrop shadow */}
                  <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl filter blur-xl -z-10" />
                  <VideoPlayer channel={selectedChannel} onReportStatus={handleReportPlayerStatus} />
                </div>

                {/* Currently playing meta card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-5 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/30 dark:border-slate-700/50 flex-shrink-0 flex items-center justify-center overflow-hidden">
                        {selectedChannel.logo ? (
                          <img 
                            src={selectedChannel.logo} 
                            alt={selectedChannel.name} 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=150&auto=format&fit=crop&q=60';
                            }}
                          />
                        ) : (
                          <Tv className="w-6 h-6 text-slate-400" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                          {selectedChannel.name}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                            ZuckTV Live
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                          <span className="text-slate-400 dark:text-slate-500 text-xs font-semibold">
                            চ্যানেল স্ট্রিম
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleFavorite(selectedChannel.id)}
                        className={`px-3.5 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                          favorites.includes(selectedChannel.id)
                            ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                            : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-800'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${favorites.includes(selectedChannel.id) ? 'fill-rose-500' : ''}`} />
                        <span>{favorites.includes(selectedChannel.id) ? 'পছন্দ তালিকাভুক্ত' : 'পছন্দ তালিকায় রাখুন'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Channel Description */}
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-3 leading-relaxed">
                    <p className="font-medium text-slate-500 dark:text-slate-400">
                      {selectedChannel.description || 'চ্যানেল সংক্রান্ত কোনো বাড়তি তথ্য নেই। আপনার কাছে লাইভ চ্যানেল সোর্স লিংক থাকলে নতুন করে যুক্ত করতে পারেন।'}
                    </p>
                    
                    {/* CDN & Stream configuration checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 p-3.5 rounded-2xl border border-dashed text-slate-500">
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span>দ্রুত বাফারিং ও CDN অপ্টিমাইজড</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <PlayCircle className="w-4 h-4 text-emerald-500" />
                        <span>১০০% রেসপন্সিভ ভিডিও প্লেয়ার</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <Compass className="w-4 h-4 text-emerald-500" />
                        <span>সংরক্ষিত কাস্টম প্লেলিস্ট সাপোর্ট</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <Database className="w-4 h-4 text-emerald-500" />
                        <span>উচ্চ গতির ক্লায়েন্ট-সাইড সিঙ্ক</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-12 text-center shadow-xs flex flex-col items-center">
                <Tv className="w-16 h-16 text-slate-400 dark:text-slate-600 mb-4 animate-bounce-slow" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">চ্যানেল পাওয়া যায়নি!</h3>
                <p className="text-slate-400 text-xs max-w-sm mt-1.5 mb-6">
                  প্লে করার জন্য একটি লাইভ টিভি চ্যানেল নির্বাচন করুন অথবা নতুন চ্যানেল যুক্ত করার জন্য "যুক্ত করুন" বাটনে চাপুন।
                </p>
                <button
                  onClick={() => setIsAddOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold transition hover:bg-emerald-600 active:scale-95 text-xs inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> চ্যানেল যুক্ত করুন
                </button>
              </div>
            )}

            {/* Pro Tips / Instruction panel */}
            <div className="p-4 bg-emerald-500/5 dark:bg-emerald-500/2 rounded-2xl border border-emerald-500/10 dark:border-emerald-500/5 flex gap-3 text-slate-600 dark:text-slate-400">
              <Sparkles className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div className="text-[11px] sm:text-xs leading-relaxed">
                <span className="font-extrabold text-slate-900 dark:text-white">হিন্টস: </span>
                ZuckTV ড্যাশবোর্ডে আপনার কাস্টম লাইভ টিভি চ্যানেলের স্ট্রিম লিংক কপি করে উপরোক্ত <strong className="text-emerald-500">যুক্ত করুন</strong> বাটন থেকে যুক্ত করে যেকোনো চ্যানেল এক ক্লিকেই লাইভ প্লে করতে পারবেন।
              </div>
            </div>
          </section>

          {/* Right Column: Channels Panel & Switcher (Plays on 5 cols out of 12) */}
          <section className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4">
            
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60 rounded-3xl p-5 shadow-xs flex flex-col gap-4 sticky top-20">
              
              {/* Box Title */}
              <div className="flex items-center justify-between">
                <h3 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <PlayCircle className="w-4 h-4 text-emerald-500 animate-pulse" />
                  চ্যানেল ড্যাশবোর্ড
                </h3>
                <div className="flex items-center gap-2">
                  {selectedCategory === 'recent' && recents.length > 0 && (
                    <button
                      onClick={handleClearRecents}
                      className="text-[10px] text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1 transition px-2 py-0.5 rounded bg-rose-500/10 hover:bg-rose-500/20"
                      title="সাম্প্রতিক তালিকা মুছে ফেলুন"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>মুছে ফেলুন</span>
                    </button>
                  )}
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-100 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 border border-slate-200/50 dark:border-slate-800/50">
                    {filteredChannels.length} টি চ্যানেল
                  </span>
                </div>
              </div>

              {/* Online Checking Progress Header & Status Trigger Switch */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-150/40 dark:border-slate-800/50 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      {isCheckingAll && (
                        <span className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      সচল চ্যানেল ফিল্টার
                    </span>
                  </div>
                  
                  {/* Toggle Switch */}
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={showOnlyWorking}
                      onChange={(e) => setShowOnlyWorking(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                {/* Progress bar and metadata */}
                <div className="flex flex-col gap-1.5 pt-1.5 border-t border-slate-200/40 dark:border-slate-800/40">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                      {isCheckingAll ? (
                        <>
                          <RefreshCw className="w-3 h-3 text-emerald-500 animate-spin" />
                          <span>যাচাই করা হচ্ছে ({progress.current}/{progress.total})</span>
                        </>
                      ) : (
                        <>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          <span>সচল যাচাই সম্পন্ন</span>
                        </>
                      )}
                    </div>
                    <button
                      onClick={() => checkAllChannels(channels)}
                      disabled={isCheckingAll}
                      className="text-[10px] uppercase font-bold text-emerald-500 hover:text-emerald-400 disabled:opacity-50 transition flex items-center gap-1"
                      title="চ্যানেল সচলতা আবার স্ক্যান করুন"
                    >
                      <RefreshCw className={`w-2.5 h-2.5 ${isCheckingAll ? 'animate-spin' : ''}`} />
                      রি-স্ক্যান
                    </button>
                  </div>

                  {isCheckingAll ? (
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${(progress.current / progress.total) * 100}%` }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-[10.5px] font-bold text-slate-500 dark:text-slate-400">
                      <span>🟢 সচল: {channels.filter(c => statuses[c.id] === 'working').length}</span>
                      <span>🔴 অচল: {channels.filter(c => statuses[c.id] === 'broken').length}</span>
                      {channels.filter(c => statuses[c.id] === 'checking').length > 0 && (
                        <span>🟡 অপেক্ষারত: {channels.filter(c => statuses[c.id] === 'checking').length}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Powerful Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="চ্যানেলের নাম বা ক্যাটাগরি সার্চ করুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200/70 dark:border-slate-800 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition text-xs sm:text-sm font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10.5px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Horizontal Category Pill Switcher (Mobile Sliding - Desktop Grid) */}
              <div className="flex overflow-x-auto pb-1.5 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-850 gap-1.5 -mx-1 px-1">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const count = categoryCounts[cat.id];
                  
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 select-none ${
                        isSelected
                          ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                          : 'bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800/40 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <span>
                        {cat.id === 'all' && '📺'}
                        {cat.id === 'recent' && '⏱️'}
                        {cat.id === 'cartoon' && '🎈'}
                        {cat.id === 'news' && '📰'}
                        {cat.id === 'movie' && '🎬'}
                        {cat.id === 'sports' && '🏆'}
                        {cat.id === 'entertainment' && '🍿'}
                        {cat.id === 'custom' && '⚙️'}
                        {cat.id === 'favorite' && '💖'}
                      </span>
                      <span>{cat.name}</span>
                      <span className={`text-[9.5px] px-1.5 py-0.5 rounded-full font-extrabold ${
                        isSelected 
                          ? 'bg-slate-950/20 text-slate-950' 
                          : 'bg-slate-200/50 dark:bg-slate-850 text-slate-500 dark:text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Channels Grid / Switcher stack */}
              <div className="flex flex-col gap-2.5 max-h-[50vh] xl:max-h-[60vh] overflow-y-auto pr-1 select-none scrollbar-thin">
                {selectedCategory === 'recent' && recents.length === 0 && (
                  <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs font-medium border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20">
                    <p>আপনি সম্প্রতি কোনো চ্যানেল দেখেননি!</p>
                    <p className="text-[10px] text-slate-400 mt-1">যেকোনো চ্যানেলে ক্লিক করে লাইভ স্ট্রিম চালু করলে তা এখানে ২য় বার দেখার জন্য জমা থাকবে।</p>
                  </div>
                )}
                {filteredChannels.length > 0 ? (
                  filteredChannels.map((ch) => (
                    <ChannelCard
                      key={ch.id}
                      channel={ch}
                      isActive={selectedChannel?.id === ch.id}
                      isFavorite={favorites.includes(ch.id)}
                      onSelect={() => handleSelectChannel(ch)}
                      onToggleFavorite={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(ch.id);
                      }}
                      onDeleteCustom={ch.isCustom ? () => handleDeleteCustom(ch.id) : undefined}
                      status={statuses[ch.id]}
                    />
                  ))
                ) : (
                  // Only show when the non-recent category is empty
                  !(selectedCategory === 'recent' && recents.length === 0) && (
                    <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs font-medium border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-950/20">
                      <p>এই ফিল্টারে কোনো চ্যানেল খুঁজে পাওয়া যায়নি!</p>
                      <p className="text-[10px] text-slate-400 mt-1">সব চ্যানেলে ব্যাক করুন বা সার্চ কীওয়ার্ড পরিবর্তন করুন।</p>
                    </div>
                  )
                )}
              </div>

            </div>

          </section>

        </div>
      </main>

      {/* Addition Modal */}
      {isAddOpen && (
        <ChannelForm
          onAddChannel={handleAddChannel}
          onImportM3u={handleImportM3u}
          onClose={() => setIsAddOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="py-8 mt-12 bg-white dark:bg-slate-950 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-400 select-none">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 ZuckTV প্লেয়ার। সব অধিকার সংরক্ষিত।</p>
          <div className="flex items-center gap-4 text-[11px] font-semibold">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 flex items-center gap-1 transition">
              <span>ZuckTV Engine</span> <ExternalLink className="w-3 h-3" />
            </a>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800" />
            <a href="https://tubitv.com" target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition">
              IPTV স্ট্রিম সংগ্রহ
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
