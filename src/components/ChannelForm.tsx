import React, { useState, useRef } from 'react';
import { Plus, X, Upload, FileText, Info } from 'lucide-react';
import { Channel } from '../types';

interface ChannelFormProps {
  onAddChannel: (channel: Omit<Channel, 'id'>) => void;
  onImportM3u: (channels: Omit<Channel, 'id'>[]) => void;
  onClose: () => void;
}

export default function ChannelForm({ onAddChannel, onImportM3u, onClose }: ChannelFormProps) {
  // Tabs: Manual Add vs. M3U Import playlist
  const [activeTab, setActiveTab] = useState<'manual' | 'm3u'>('manual');

  // Manual States
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState<Channel['category']>('news');
  const [logo, setLogo] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // M3U file upload state
  const [parsingStatus, setParsingStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('চ্যানেলের নাম দেওয়া আবশ্যক।');
      return;
    }
    if (!url.trim() || !url.startsWith('http')) {
      setError('অনুগ্রহ করে একটি সঠিক m3u8 স্ট্রিম লিঙ্ক প্রদান করুন।');
      return;
    }

    onAddChannel({
      name: name.trim(),
      url: url.trim(),
      category,
      logo: logo.trim() || undefined,
      description: description.trim() || undefined,
      isCustom: true
    });

    onClose();
  };

  // M3U Parsing Logic
  const handleM3uFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsingStatus('ফাইল লোড করা হচ্ছে...');
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (!text) {
          setParsingStatus('ফাইলটি খালি বা পড়া যায়নি!');
          return;
        }

        const lines = text.split('\n');
        const importedList: Omit<Channel, 'id'>[] = [];
        
        let currentName = '';
        let currentLogo = '';
        let currentGroup: Channel['category'] = 'news';

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.startsWith('#EXTINF:')) {
            // Get channel name
            const tvgNameMatch = line.match(/tvg-name="([^"]+)"/) || line.match(/tvg-id="([^"]+)"/);
            const logoMatch = line.match(/tvg-logo="([^"]+)"/);
            const groupMatch = line.match(/group-title="([^"]+)"/);

            // Channel display title comes after parsing the last comma
            const lastCommaPos = line.lastIndexOf(',');
            if (lastCommaPos !== -1) {
              currentName = line.substring(lastCommaPos + 1).trim();
            } else if (tvgNameMatch) {
              currentName = tvgNameMatch[1];
            } else {
              currentName = 'Unknown Channel';
            }

            if (logoMatch) currentLogo = logoMatch[1];

            // Normalize or map group-title to standard category
            if (groupMatch) {
              const grp = groupMatch[1].toLowerCase();
              if (grp.includes('cartoon') || grp.includes('kid') || grp.includes('anime')) {
                currentGroup = 'cartoon';
              } else if (grp.includes('news') || grp.includes('খবর')) {
                currentGroup = 'news';
              } else if (grp.includes('movie') || grp.includes('cinema') || grp.includes('সিনেমা')) {
                currentGroup = 'movie';
              } else if (grp.includes('sports') || grp.includes('খেলা') || grp.includes('sport')) {
                currentGroup = 'sports';
              } else {
                currentGroup = 'entertainment';
              }
            }
          } else if (line.startsWith('http') && line.includes('.m3u8')) {
            if (currentName) {
              importedList.push({
                name: currentName,
                url: line,
                category: currentGroup,
                logo: currentLogo || undefined,
                description: `M3U প্লেলিস্ট থেকে আমদানিকৃত - ক্যাটাগরি: ${currentGroup}`,
                isCustom: true
              });
            }
            // Reset temp variables
            currentName = '';
            currentLogo = '';
            currentGroup = 'news';
          }
        }

        if (importedList.length === 0) {
          setParsingStatus('প্লেলিস্ট থেকে কোনো .m3u8 স্ট্রিম পাওয়া যায়নি!');
        } else {
          onImportM3u(importedList);
          setParsingStatus(`সফলভাবে ${importedList.length} টি চ্যানেল যুক্ত করা হয়েছে!`);
          setTimeout(() => {
            onClose();
          }, 1500);
        }
      } catch (err) {
        setParsingStatus('M3U প্লেলিস্ট পার্স করতে সমস্যা হয়েছে।');
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in animate-duration-200">
      <div 
        id="channel-creator-modal"
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
              নতুন লাইভ টিভি চ্যানেল যুক্ত করুন
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
              HLS m3u8 ইনডেক্স কোড বা প্লেলিস্ট যোগ করুন
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Headers */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 p-2 gap-1.5 bg-slate-50 dark:bg-slate-900/40">
          <button
            onClick={() => { setActiveTab('manual'); setError(''); }}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition ${
              activeTab === 'manual'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            ✍️ ম্যানুয়াল ফর্ম
          </button>
          <button
            onClick={() => { setActiveTab('m3u'); setError(''); }}
            className={`flex-1 py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition ${
              activeTab === 'm3u'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            📁 M3U ফাইল আমদানি
          </button>
        </div>

        {/* Content Box */}
        <div className="p-6 overflow-y-auto flex-1 text-slate-700 dark:text-slate-300">
          {error && (
            <div className="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs sm:text-sm text-rose-500 font-medium animate-pulse">
              ⚠️ {error}
            </div>
          )}

          {activeTab === 'manual' ? (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              {/* Channel Name */}
              <div>
                <label className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold mb-1.5">
                  চ্যানেলের নাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: আরটিভি ড্রামা"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition text-xs sm:text-sm"
                />
              </div>

              {/* Stream URL */}
              <div>
                <label className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold mb-1.5">
                  m3u8 বা স্ট্রিম লিঙ্ক <span className="text-rose-500">*</span>
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://domain.com/live/stream/index.m3u8"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition text-xs sm:text-sm font-mono"
                />
                <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-1 leading-snug">
                  * ZuckTV বা যেকোনো অনলাইন IPTV স্ট্রিম লিঙ্ক এখানে পেস্ট করুন।
                </span>
              </div>

              {/* Category Grid */}
              <div>
                <label className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold mb-1.5">
                  ক্যাটাগরি
                </label>
                <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
                  {(['cartoon', 'news', 'movie', 'sports', 'entertainment'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition ${
                        category === cat
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                          : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {cat === 'cartoon' && '🎈 কার্টুন'}
                      {cat === 'news' && '📰 সংবাদ'}
                      {cat === 'movie' && '🎬 মুভি'}
                      {cat === 'sports' && '🏆 স্পোর্টস'}
                      {cat === 'entertainment' && '📺 বিনোদন'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Logo URL */}
              <div>
                <label className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold mb-1.5">
                  লোগো ছবির লিঙ্ক (ঐচ্ছিক)
                </label>
                <input
                  type="url"
                  placeholder="https://site.com/logo.png"
                  value={logo}
                  onChange={(e) => setLogo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition text-xs sm:text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-bold mb-1.5">
                  চ্যানেল বিবরণ (ঐচ্ছিক)
                </label>
                <textarea
                  placeholder="যেমন: জনপ্রিয় এইচডি বাংলা মুভি চ্যানেল"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition text-xs sm:text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.98] text-slate-950 font-bold rounded-2xl transition shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4 text-slate-950" /> চ্যানেল প্রস্তুত করুন
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-900/30">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20 text-emerald-500">
                <Upload className="w-6 h-6" />
              </div>
              <h4 className="text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base mb-1">
                m3u প্লেলিস্ট ড্র্যাগ-এন্ড-ড্রপ করুন
              </h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mb-6">
                আপনার ডাউনলোডকৃত m3u প্লেলিস্ট ফাইল নির্বাচন করুন। আমরা স্বয়ংক্রিয়ভাবে চ্যানেল ও লিঙ্কগুলো লোড করব।
              </p>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".m3u"
                onChange={handleM3uFileChange}
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition active:scale-95 text-xs inline-flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-slate-400" /> প্লেলিস্ট ফাইল যোগ করুন
              </button>

              {parsingStatus && (
                <div className="mt-4 text-xs font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg animate-pulse-slow">
                  {parsingStatus}
                </div>
              )}

              {/* Information Hint */}
              <div className="mt-6 flex gap-2 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800/80 pt-4 text-left leading-relaxed">
                <Info className="w-4 h-4 flex-shrink-0 text-amber-500" />
                <span>
                  ফাইলের ভেতরে <code>#EXTINF</code> বিবরণীর সাথে <code>.m3u8</code> ফরম্যাটে লাইভ টেলিভিশন প্রবাহের সংযোগ থাকতে হবে।
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
