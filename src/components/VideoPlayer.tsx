import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { 
  Play, Pause, Volume2, VolumeX, Maximize, Minimize, 
  RotateCcw, Settings, Tv, Eye, Layers, SkipForward
} from 'lucide-react';
import { Channel } from '../types';

interface VideoPlayerProps {
  channel: Channel;
  onReportStatus?: (id: string, isWorking: boolean) => void;
}

export default function VideoPlayer({ channel, onReportStatus }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('live_tv_volume');
    return saved ? parseFloat(saved) : 0.8;
  });
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [streamError, setStreamError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [hlsLevels, setHlsLevels] = useState<{ id: number; height: number; bitrate: number }[]>([]);
  const [currentLevel, setCurrentLevel] = useState<number>(-1); // -1 is Auto
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTimeStr, setCurrentTimeStr] = useState('00:00:00');

  // Auto-hide controls timer
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      const isVideoPlaying = videoRef.current && !videoRef.current.paused && !videoRef.current.ended;
      if (isVideoPlaying) {
        setShowControls(false);
      }
    }, 3000); // Auto hide after 3 seconds of inactivity
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showControls) {
      setShowControls(true);
      resetControlsTimeout();
    } else {
      togglePlay();
    }
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  // Handle stream initialization & change
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset error states on channel change
    setStreamError(null);
    setErrorCount(0);
    setIsBuffering(true);
    setHlsLevels([]);
    setCurrentLevel(-1);

    // Destroy existing Hls instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch (err) {
        // Autoplay blocked is common
        setIsPlaying(false);
      }
    };

    if (Hls.isSupported() && channel.url.endsWith('.m3u8')) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        maxBufferLength: 30,
        maxMaxBufferLength: 600,
        capLevelToPlayerSize: true,
      });

      hlsRef.current = hls;
      hls.loadSource(channel.url);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
        setIsBuffering(false);
        const levels = data.levels.map((lvl, index) => ({
          id: index,
          height: lvl.height,
          bitrate: lvl.bitrate
        }));
        setHlsLevels(levels);
        playVideo();
        if (onReportStatus) {
          onReportStatus(channel.id, true);
        }
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
        setCurrentLevel(hls.currentLevel);
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          setIsBuffering(false);
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setStreamError('নেটওয়ার্ক সমস্যা: ডোমেইন ব্লকড বা স্ট্রিমটি অফলাইন।');
              if (onReportStatus) {
                onReportStatus(channel.id, false);
              }
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setStreamError('মিডিয়া ডিকোডিং ব্যর্থ হয়েছে। স্ট্রিম পুনরুদ্ধারের চেষ্টা করা হচ্ছে...');
              hls.recoverMediaError();
              break;
            default:
              setStreamError('চ্যানেলটি লোড করা সম্ভব হচ্ছে না। অনুগ্রহ করে অন্যটি ট্রাই করুন।');
              if (onReportStatus) {
                onReportStatus(channel.id, false);
              }
              hls.destroy();
              break;
          }
        }
      });
    } else {
      // Direct native fallback (e.g., Safari or standard MP4/HLS native player)
      video.src = channel.url;
      const onCanPlay = () => {
        setIsBuffering(false);
        playVideo();
        if (onReportStatus) {
          onReportStatus(channel.id, true);
        }
      };
      
      const onNativeError = () => {
        setIsBuffering(false);
        setStreamError('এই ব্রাউজারে স্ট্রিমটি সরাসরি চালু করা সম্ভব হচ্ছে না বা এটি সাময়িকভাবে অফলাইন আছে। অনুগ্রহ করে অন্য কোনো চ্যানেল ট্রাই করুন।');
        if (onReportStatus) {
          onReportStatus(channel.id, false);
        }
      };

      video.addEventListener('canplay', onCanPlay);
      video.addEventListener('error', onNativeError);

      return () => {
        video.removeEventListener('canplay', onCanPlay);
        video.removeEventListener('error', onNativeError);
      };
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [channel.url]); // Safe effect on specific stream link

  // Handle system play/pause toggling
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => {
        setIsPlaying(true);
        setStreamError(null);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
    resetControlsTimeout();
  };

  // Keep volume & muted status synced
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = isMuted ? 0 : volume;
    video.muted = isMuted;
  }, [volume, isMuted]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    setIsMuted(value === 0);
    localStorage.setItem('live_tv_volume', value.toString());
    resetControlsTimeout();
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
    resetControlsTimeout();
  };

  // Fullscreen support
  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen(); // Safari
      } else if ((container as any).msRequestFullscreen) {
        (container as any).msRequestFullscreen(); // IE
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    }
    resetControlsTimeout();
  };

  // Sync back full screen listeners
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const handleLevelChange = (levelId: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelId;
      setCurrentLevel(levelId);
    }
    setShowQualityMenu(false);
    resetControlsTimeout();
  };

  // Update dynamic current time display
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTimeStr(now.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRetry = () => {
    setStreamError(null);
    setIsBuffering(true);
    if (hlsRef.current) {
      hlsRef.current.loadSource(channel.url);
      hlsRef.current.startLoad();
    } else {
      const video = videoRef.current;
      if (video) {
        video.src = channel.url;
        video.load();
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      id="live-tv-player-container"
      className="relative w-full aspect-video md:rounded-2xl overflow-hidden bg-black border border-slate-800/60 shadow-2xl group flex items-center justify-center select-none"
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => {
        if (isPlaying) {
          if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
          }
          controlsTimeoutRef.current = setTimeout(() => {
            const isVideoPlaying = videoRef.current && !videoRef.current.paused && !videoRef.current.ended;
            if (isVideoPlaying) {
              setShowControls(false);
            }
          }, 3000);
        }
      }}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        id="live-tv-native-video"
        className="w-full h-full object-contain pointer-events-auto cursor-pointer"
        onClick={handleVideoClick}
        playsInline
        onWaiting={() => setIsBuffering(true)}
        onPlaying={() => {
          setIsBuffering(false);
          setStreamError(null);
        }}
        onCanPlay={() => setIsBuffering(false)}
      />

      {/* Buffering Indicator */}
      {isBuffering && !streamError && (
        <div id="player-loading-spinner" className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 backdrop-blur-xs z-10">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <span className="mt-4 text-emerald-400 font-medium text-sm drop-shadow-md animate-pulse">
            লাইভ স্ট্রিম সংযোগ করা হচ্ছে...
          </span>
        </div>
      )}

      {/* Streaming Error Overlay */}
      {streamError && (
        <div id="player-error-overlay" className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-slate-950/95 to-slate-900/95 text-center p-6 z-20">
          <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-4 border border-rose-500/20">
            <RotateCcw className="w-8 h-8 text-rose-500 animate-spin-reverse" />
          </div>
          <h3 className="text-white text-lg font-semibold mb-2">স্ট্রিম প্লে করতে ত্রুটি হয়েছে</h3>
          <p className="text-slate-400 text-xs max-w-sm mb-6 leading-relaxed">
            {streamError}
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleRetry}
              id="player-error-retry-btn"
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-slate-950 font-medium transition text-xs flex items-center gap-2 shadow-md shadow-emerald-500/10"
            >
              <RotateCcw className="w-4 h-4" /> আবার চেষ্টা করুন
            </button>
            <div className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium cursor-help transition text-xs flex items-center gap-2">
              <Tv className="w-4 h-4" /> BDIX/CDN স্ট্রিম
            </div>
          </div>
        </div>
      )}

      {/* Top Banner overlay (Shows always when controls are visible) */}
      <div 
        id="player-top-overlay"
        className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/85 to-transparent flex items-center justify-between transition-all duration-300 z-10 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3">
          {channel.logo ? (
            <img 
              src={channel.logo} 
              alt={channel.name} 
              className="w-10 h-10 rounded-lg object-cover border border-slate-700/60 shadow-md referrerPolicy='no-referrer'" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1598257006458-087169a1f08d?w=150&auto=format&fit=crop&q=60';
              }}
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold text-sm shadow-md">
              {channel.name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-white font-bold text-sm leading-tight tracking-wide drop-shadow-md">
                {channel.name}
              </h2>
              <span className="px-2 py-0.5 text-[10px] uppercase font-semibold bg-red-600 text-white rounded-full animate-pulse-slow">
                LIVE
              </span>
            </div>
            <p className="text-slate-400 text-[11px] font-medium leading-none mt-1">
              {channel.category === 'cartoon' && '🎈 কার্টুন'}
              {channel.category === 'news' && '📰 সংবাদ'}
              {channel.category === 'movie' && '🎬 চলচ্চিত্র'}
              {channel.category === 'sports' && '🏆 খেলাধুলা'}
              {channel.category === 'entertainment' && '📺 বিনোদন'}
              {channel.category === 'custom' && '⚙️ সংরক্ষিত চ্যানেল'}
            </p>
          </div>
        </div>

        {/* Dynamic Digital Clock Display (Bangladesh Standard Time Localized) */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm border border-slate-800/40 select-none">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="font-mono text-emerald-400 text-xs tracking-wider">
            {currentTimeStr}
          </span>
        </div>
      </div>

      {/* Central Big Play/Pause Toggle Indicator on hover */}
      {showControls && !isBuffering && !streamError && (
        <button
          onClick={togglePlay}
          id="player-center-play-pause"
          className="absolute w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-2xl transition hover:scale-110 active:scale-95 z-10 opacity-90 backdrop-blur-xs border border-white/10"
        >
          {isPlaying ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950 translate-x-0.5" />}
        </button>
      )}

      {/* Bottom Custom Control HUD */}
      <div 
        id="player-bottom-hud"
        className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 via-black/80 to-transparent transition-all duration-300 z-10 ${
          showControls ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}
      >
        {/* Dynamic Channel Title Subtext */}
        <div className="text-slate-400 text-[11px] mb-3 truncate flex items-center gap-1.5 px-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          {channel.description || 'লাইভ টিভি ব্রডকাস্ট স্ট্রিম'}
        </div>

        {/* HUD control bar */}
        <div className="flex items-center justify-between gap-4">
          {/* Play/Pause & Volume */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              id="player-control-play-pause"
              className="w-10 h-10 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white flex items-center justify-center transition active:scale-95 border border-slate-700/30"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
            </button>

            {/* Volume controller */}
            <div className="flex items-center gap-2 group/volume bg-slate-800/40 rounded-xl p-1 px-2 border border-slate-700/20">
              <button
                onClick={toggleMute}
                id="player-control-volume-btn"
                className="text-slate-300 hover:text-white transition p-1"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-16 md:w-20 accent-emerald-500 h-1 rounded-lg cursor-pointer transition-all bg-slate-700"
              />
            </div>
          </div>

          {/* Settings, Quality & Video Layout Control triggers */}
          <div className="flex items-center gap-2 relative">
            
            {/* Resolution Selector Menu */}
            {hlsLevels.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowQualityMenu(prev => !prev)}
                  id="player-control-quality-toggle"
                  className="px-3 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-xs text-slate-300 hover:text-white transition flex items-center gap-1.5 border border-slate-700/30 font-medium"
                >
                  <Settings className="w-3.5 h-3.5 animate-spin-slow" />
                  {currentLevel === -1 ? 'Auto' : `${hlsLevels[currentLevel]?.height || 'Quality'}p`}
                </button>

                {/* Dropdown list for Stream Quality levels */}
                {showQualityMenu && (
                  <div className="absolute bottom-12 right-0 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 w-32 z-30 animate-fade-in flex flex-col gap-1">
                    <div className="text-[10px] text-slate-500 px-2 py-1 font-semibold uppercase tracking-wider select-none border-b border-slate-800 mb-1">
                      রেজোলিউশন
                    </div>
                    <button
                      onClick={() => handleLevelChange(-1)}
                      className={`w-full text-left px-2 py-1.5 rounded-lg text-xs leading-none transition ${
                        currentLevel === -1 ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      ✓ Auto
                    </button>
                    {hlsLevels.map((lvl) => (
                      <button
                        key={lvl.id}
                        onClick={() => handleLevelChange(lvl.id)}
                        className={`w-full text-left px-2 py-1.5 rounded-lg text-xs leading-none transition ${
                          currentLevel === lvl.id ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        {lvl.height}p
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Picture in Picture Switcher (If supported) */}
            {document.pictureInPictureEnabled && (
              <button
                onClick={async () => {
                  const video = videoRef.current;
                  if (!video) return;
                  try {
                    if (document.pictureInPictureElement) {
                      await document.exitPictureInPicture();
                    } else {
                      await video.requestPictureInPicture();
                    }
                  } catch (e) {
                    // Fail silently
                  }
                  resetControlsTimeout();
                }}
                id="player-control-pip"
                className="w-10 h-10 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white flex items-center justify-center transition active:scale-95 border border-slate-700/30"
                title="Picture in Picture"
              >
                <Eye className="w-4 h-4" />
              </button>
            )}

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              id="player-control-fullscreen"
              className="w-10 h-10 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white flex items-center justify-center transition active:scale-95 border border-slate-700/30"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
