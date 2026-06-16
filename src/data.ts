import { Channel } from './types';

export const CATEGORIES = [
  { id: 'all', name: 'সব চ্যানেল', icon: 'Tv', color: 'from-blue-500 to-indigo-600' },
  { id: 'recent', name: 'সাম্প্রতিক', icon: 'History', color: 'from-slate-500 to-zinc-600' },
  { id: 'cartoon', name: 'কার্টুন', icon: 'Gamepad2', color: 'from-pink-500 to-rose-600' },
  { id: 'news', name: 'খবর', icon: 'Newspaper', color: 'from-emerald-500 to-teal-600' },
  { id: 'movie', name: 'মুভি', icon: 'Film', color: 'from-amber-500 to-orange-600' },
  { id: 'sports', name: 'খেলাধুলা', icon: 'Trophy', color: 'from-violet-500 to-purple-600' },
  { id: 'entertainment', name: 'বিনোদন', icon: 'Sparkles', color: 'from-cyan-500 to-blue-600' },
  { id: 'custom', name: 'আমার চ্যানেল', icon: 'PlusCircle', color: 'from-gray-600 to-slate-700' },
  { id: 'favorite', name: 'প্রিয় চ্যানেল', icon: 'Heart', color: 'from-red-500 to-pink-600' },
] as const;

export const DEFAULT_CHANNELS: Channel[] = [
  // ==================== CARTOON / KIDS ====================
  {
    id: 'cartoon-duronto-cdn',
    name: 'দূরন্ত টিভি (Public CDN)',
    url: 'https://tvsen4.aynaott.com/durontotv/index.m3u8',
    category: 'cartoon',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Duronto_TV_Logo.png',
    description: 'First popular children-based TV channel in Bangladesh.'
  },
  {
    id: 'cartoon-toonami',
    name: 'Toonami Aftermath Movie',
    url: 'http://api.toonamiaftermath.com:3000/movies/playlist.m3u8',
    category: 'cartoon',
    logo: 'https://static.wikia.nocookie.net/logopedia/images/6/62/TOONAMI-2025.svg',
    description: 'Non-stop animated and hero-themed cinematic collections.'
  },
  // ==================== SPORTS ====================
  {
    id: 'sports-bijoy-1',
    name: 'Sports 1 (BIJOY Local)',
    url: 'http://10.20.30.30:7171/Sports-1/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'sports',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/f628edc7-701f-4d64-97eb-623efd39d80f_180x180_Start-Sports-1-hd.jpg',
    description: 'Local high-definition live action sports selector.'
  },
  {
    id: 'sports-bijoy-2',
    name: 'Sports 2 (BIJOY Local)',
    url: 'http://10.20.30.30:7171/Sports-2/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'sports',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/a7cb31b1-b6b4-4ec4-baed-6677124a8959_180x180_SSCSports1HD.jpeg',
    description: 'Live high throughput regional sporting action stream.'
  },
  {
    id: 'sports-bijoy-3',
    name: 'Sports 3 (BIJOY Local)',
    url: 'http://10.20.30.30:7171/Sports-3/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'sports',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/22a8244f-9923-497a-a626-768cdd2d4d3c_180x180_sports-18.jpg',
    description: 'Live coverage of world cups, leagues and grand prix.'
  },
  {
    id: 'sports-bijoy-4',
    name: 'Sports 4 (BIJOY Local)',
    url: 'http://10.20.30.30:7171/Sports-4/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'sports',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/f628edc7-701f-4d64-97eb-623efd39d80f_180x180_Start-Sports-1-hd.jpg',
    description: 'Interactive sports discussion and live feeds.'
  },
  {
    id: 'sports-premierkey',
    name: 'Football - Premier League (Local)',
    url: 'http://10.20.30.30:7171/Sports-7/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'sports',
    logo: 'https://grandcinema.tv/logo.png',
    description: 'English Premier League non-stop local broadcast.'
  },
  {
    id: 'sports-laligakey',
    name: 'Football - LaLiga TV (Local)',
    url: 'http://10.20.30.30:7171/Sports-8/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'sports',
    logo: 'https://grandcinema.tv/logo.png',
    description: 'Spanish LaLiga local interactive football coverage.'
  },

  // ==================== NEWS ====================
  {
    id: 'news-somoy-cdn',
    name: 'সময় টিভি (Public CDN)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8',
    category: 'news',
    logo: 'https://dl.dropbox.com/s/leielj83em5kg7h/somoy_news.png',
    description: 'Leading 24/7 news broadcaster of Bangladesh.'
  },
  {
    id: 'news-somoy-local',
    name: 'Somoy News (BIJOY Local)',
    url: 'http://10.20.30.30:7171/News-2/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'news',
    logo: 'https://dl.dropbox.com/s/leielj83em5kg7h/somoy_news.png',
    description: 'Local ultra-speed live somoy breaking headlines.'
  },
  {
    id: 'news-jamuna-cdn',
    name: 'যমুনা টিভি (Public CDN)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1701/output/index.m3u8',
    category: 'news',
    logo: 'https://dl.dropbox.com/s/k7z1dsec1jfjbkn/jamuna_tv_bd.png',
    description: 'Committed to fearless, objective journalistic reporting.'
  },
  {
    id: 'news-jamuna-local',
    name: 'Jamuna News (BIJOY Local)',
    url: 'http://10.20.30.30:7171/News-4/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'news',
    logo: 'https://dl.dropbox.com/s/k7z1dsec1jfjbkn/jamuna_tv_bd.png',
    description: 'Local high fidelity stream of Jamuna live coverage.'
  },
  {
    id: 'news-71-cdn',
    name: 'একাত্তর টিভি (Public CDN)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1705/output/index.m3u8',
    category: 'news',
    logo: 'https://s4.gifyu.com/images/imagea02f4314e761661d.png',
    description: 'Full coverage of national current affairs and political debate.'
  },
  {
    id: 'news-71-local',
    name: '71 News (BIJOY Local)',
    url: 'http://10.20.30.30:7171/News-5/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'news',
    logo: 'https://s4.gifyu.com/images/imagea02f4314e761661d.png',
    description: 'Ekattor national news source local streaming portal.'
  },
  {
    id: 'news-ch24-cdn',
    name: 'চ্যানেল 24 (Public CDN)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8',
    category: 'news',
    logo: 'https://dl.dropbox.com/s/puf12xv5flgbnz5/channel24_bd.png',
    description: 'Highly acclaimed infotainment, analysis and economy bulletin.'
  },
  {
    id: 'news-ch24-local',
    name: 'Channel 24 News (BIJOY Local)',
    url: 'http://10.20.30.30:7171/News-3/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'news',
    logo: 'https://dl.dropbox.com/s/puf12xv5flgbnz5/channel24_bd.png',
    description: 'Local server optimized link of Channel 24 News.'
  },
  {
    id: 'news-independent-cdn',
    name: 'ইনডিপেন্ডডেন্ট টিভি (Public CDN)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/index.m3u8',
    category: 'news',
    logo: 'https://dl.dropbox.com/s/7xwwb8hetz3w8rp/independent_tv.png',
    description: 'Real-time informative reports and comprehensive live updates.'
  },
  {
    id: 'news-independent-local',
    name: 'Independent News (BIJOY Local)',
    url: 'http://10.20.30.30:7171/News-9/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'news',
    logo: 'https://dl.dropbox.com/s/7xwwb8hetz3w8rp/independent_tv.png',
    description: 'Non-stop interactive local news broadcast from Independent.'
  },
  {
    id: 'news-atn-cdn',
    name: 'এটিএন নিউজ (Public CDN)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1706/output/index.m3u8',
    category: 'news',
    logo: 'https://dl.dropbox.com/s/4ldi1dp09s8o6bm/atn_news_bd.png',
    description: 'First 24-hour news oriented television channel in Bangladesh.'
  },
  {
    id: 'news-atn-local',
    name: 'ATN News (BIJOY Local)',
    url: 'http://10.20.30.30:7171/News-10/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'news',
    logo: 'https://dl.dropbox.com/s/4ldi1dp09s8o6bm/atn_news_bd.png',
    description: 'ATN News network local dedicated fast latency route.'
  },
  {
    id: 'news-dbc-local',
    name: 'DBC News (BIJOY Local)',
    url: 'http://10.20.30.30:7171/News-7/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'news',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/f71d343e-e574-4599-bed6-f622c2a6b741_180x180_0fb5d763-281f-4ed3-8c05-62aa33dfd0c2.png',
    description: 'Analytical talk shows and immediate headlines around the country.'
  },
  {
    id: 'news-24-local',
    name: 'News 24 (BIJOY Local)',
    url: 'http://10.20.30.30:7171/News-6/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'news',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/2b7e4021-ff6b-4fb3-8a6e-36ff4388086d_180x180_8e4e88aa-10c0-4c91-8465-9c2ddad8b6e8.png',
    description: '24-hour satellite news feed under East West Media Group.'
  },
  {
    id: 'news-starnews-cdn',
    name: 'Star News (Public CDN)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1710/output/1710-audio_113402_eng=113200-video=3224800.m3u8',
    category: 'news',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/1ffb3fa3-7270-45e1-8cf7-4542db428670_180x180_Aljazeera.jpg',
    description: 'South Asian premium satellite news broadcaster.'
  },
  {
    id: 'news-starnews-local',
    name: 'Star News (BIJOY Local)',
    url: 'http://10.20.30.30:7171/News-1/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'news',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/1ffb3fa3-7270-45e1-8cf7-4542db428670_180x180_Aljazeera.jpg',
    description: 'Star news local server dedicated high performance link.'
  },
  {
    id: 'news-aljazeera-local',
    name: 'AL-Jazeera (BIJOY Local)',
    url: 'http://10.20.30.40:7171/News-8/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'news',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/1ffb3fa3-7270-45e1-8cf7-4542db428670_180x180_Aljazeera.jpg',
    description: 'Doha based flagship international news service stream.'
  },

  // ==================== MOVIES ====================
  {
    id: 'movie-srktv-cdn',
    name: 'SRK TV (Public CDN)',
    url: 'https://srknowapp.ncare.live/srktvhlswodrm/srktv.stream/playlist.m3u8',
    category: 'movie',
    logo: 'https://sunplex.net/iptv/logo/depto-tv.jpg',
    description: 'Non stop premium cinemas and cinematic clips.'
  },
  {
    id: 'movie-srktv-local',
    name: 'SRK TV (Local Server)',
    url: 'http://10.20.30.30:8989/Srktv/tracks-v1a1/mono.ts.m3u8',
    category: 'movie',
    logo: 'https://sunplex.net/iptv/logo/depto-tv.jpg',
    description: 'Low buffer active movie channel.'
  },
  {
    id: 'movie-moviebangla-pub',
    name: 'মুভি বাংলা (Public)',
    url: 'http://alvetv.com/moviebanglatv/8080/index.m3u8',
    category: 'movie',
    logo: 'https://i.ibb.co/0rPdpW9/MB-TV.jpg',
    description: 'Popular Bengali and Indian action movie broadcaster.'
  },
  {
    id: 'movie-moviebangla-local',
    name: 'মুভি বাংলা (Roarzone Alternative)',
    url: 'https://edge2.roarzone.info:8447/roarzone/edge3/movie-bangla/tracks-v1a1/mono.m3u8?token=9d83f14e8afc0c60b3a0e9e3a3783af326e0844b-388f33a80110c35bf29fe1f6e55d4345-1772118157-1772114557',
    category: 'movie',
    logo: 'https://i.ibb.co/0rPdpW9/MB-TV.jpg',
    description: 'High definition local streaming proxy for Movie Bangla.'
  },
  {
    id: 'movie-bhojpuri',
    name: 'Bhojpuri Cinema HD',
    url: 'https://live-bhojpuri.akamaized.net/liveabr/playlist.m3u8',
    category: 'movie',
    logo: 'https://static.wikia.nocookie.net/logopedia/images/a/ad/Bhojpuri_cinema.png',
    description: 'Bhojpuri songs, family dramas and cinema releases.'
  },
  {
    id: 'movie-hollywood',
    name: 'Action Hollywood Movies',
    url: 'https://cdn-apse1-prod.tsv2.amagi.tv/linear/amg01076-lightningintern-actionhollywood-samsungnz/playlist.m3u8',
    category: 'movie',
    logo: 'https://provider-static.plex.tv/epg/cms/production/c94e3220-9a45-42e9-8bdb-01fc43e0f27c/white_textAction_Hollywood_Movies_logo_dark_-_Angela_Chan.png',
    description: 'A rich stream of classic western action, thrillers and suspense.'
  },
  {
    id: 'movie-bangbang',
    name: 'Bang Bang TV',
    url: 'https://streams.sofast.tv/ptnr-yupptv/title-BANG-BANG-TV-ENG_yupptv/v1/master/611d79b11b77e2f571934fd80ca1413453772ac7/6a98fce2-bf4c-4bfb-91f4-c43851bb3801/manifest.m3u8',
    category: 'movie',
    logo: 'https://alchetron.com/cdn/bang-bang-tv-channel-86505200-5377-43bb-ac56-4a72cc2c786-resize-750.jpg',
    description: 'Action hits, thriller shows and world class dramatic movies.'
  },
  {
    id: 'movie-grandcinema',
    name: 'Grand Cinema',
    url: 'https://gcinemahls.wns.live/hls/stream.m3u8',
    category: 'movie',
    logo: 'https://grandcinema.tv/logo.png',
    description: 'Artistic cinema, blockbusters and hit movies.'
  },
  {
    id: 'movie-zeecinema-local',
    name: 'ZEE Cinema HD (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Movies-1/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'movie',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/eac1d5e7-1738-46e5-b5c1-16afe3b579a6_180x180_ZeeCinemaHD.jpg',
    description: 'Golden Hits and newly released movies on local fast servers.'
  },
  {
    id: 'movie-andpicture-local',
    name: 'AND Picture HD (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Movies-2/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'movie',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/eac1d5e7-1738-46e5-b5c1-16afe3b579a6_180x180_ZeeCinemaHD.jpg',
    description: 'Modern, youthful Indian movies and dynamic films.'
  },
  {
    id: 'movie-stargold-local',
    name: 'Star GOLD HD (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Movies-4/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'movie',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/1071c4ad-c6ef-4f9c-9f09-8f658bbae1ad_180x180_SonyMAXHD.jpg',
    description: 'Premium premier movie events and blockbusters.'
  },
  {
    id: 'movie-sonymax-local',
    name: 'SONY Max HD (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Movies-1/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid', // Keep exact user URL
    category: 'movie',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/1071c4ad-c6ef-4f9c-9f09-8f658bbae1ad_180x180_SonyMAXHD.jpg',
    description: 'The premier destination for Hindi cinemas and action movies.'
  },
  {
    id: 'movie-cineplex-local',
    name: 'CinePlex HD (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Movies-3/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'movie',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/ca2ecac1-7447-46fe-9921-e6c3e37a8dc9_180x180_hbo.jpg',
    description: 'Western and premium multi-dub movie channel.'
  },
  {
    id: 'movie-starmovies-local',
    name: 'Star Movies HD (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Movies-7/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'movie',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/ca2ecac1-7447-46fe-9921-e6c3e37a8dc9_180x180_hbo.jpg',
    description: 'Premium English movies and major Hollywood award releases.'
  },
  {
    id: 'movie-sonypix-local',
    name: 'SONY Pix HD (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Movies-6/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'movie',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/ca2ecac1-7447-46fe-9921-e6c3e37a8dc9_180x180_hbo.jpg',
    description: 'Vibrant blockbuster Hollywood releases.'
  },
  {
    id: 'movie-mnx-local',
    name: 'MNX HD (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Movies-9/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'movie',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/ca2ecac1-7447-46fe-9921-e6c3e37a8dc9_180x180_hbo.jpg',
    description: 'Non-stop Hollywood thrillers and fast-paced adventure streams.'
  },
  {
    id: 'movie-axn-local',
    name: 'AXN (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Movies-10/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'movie',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/ca2ecac1-7447-46fe-9921-e6c3e37a8dc9_180x180_hbo.jpg',
    description: 'High-octane action thrillers and adventure series.'
  },
  {
    id: 'movie-jolshamovie-local',
    name: 'Jolsha Movies (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Movies-8/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'movie',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/794347ed-ed16-4fb7-be30-a78218fb5f85_180x180_ZeeBanglaCinema.jpg',
    description: 'Popular cinema channel broadcasting Bengali hits.'
  },
  {
    id: 'movie-colorscinema-local',
    name: 'Colours Cinema (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Movies-11/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'movie',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/794347ed-ed16-4fb7-be30-a78218fb5f85_180x180_ZeeBanglaCinema.jpg',
    description: 'A colorful blend of retro and new generation cinemas.'
  },

  // ==================== ENTERTAINMENT ====================
  {
    id: 'ent-btv-cdn',
    name: 'বিটিভি (BTV HD Public CDN)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/1709-audio_113392_eng=113200-video=1692000.m3u8',
    category: 'entertainment',
    logo: 'https://static.wikia.nocookie.net/logopedia/images/1/12/BTV_HD_Logo.svg',
    description: 'National public television network of Bangladesh.'
  },
  {
    id: 'ent-btv-manifest',
    name: 'BTV National (Backup CDN)',
    url: 'http://103.230.105.252:1935/live/btv/manifest.m3u8',
    category: 'entertainment',
    logo: 'https://static.wikia.nocookie.net/logopedia/images/1/12/BTV_HD_Logo.svg',
    description: 'Alternative direct port of BTV National streaming.'
  },
  {
    id: 'ent-btv-local',
    name: 'BTV National (BIJOY Local)',
    url: 'http://10.20.30.30:7171/Bangladesh-1/tracks-v1a1/mono.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://static.wikia.nocookie.net/logopedia/images/1/12/BTV_HD_Logo.svg',
    description: 'Local ultra low latency National BTV stream.'
  },
  {
    id: 'ent-deepto-cdn1',
    name: 'দীপ্ত টিভি (Public CDN)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1711/output/index.m3u8',
    category: 'entertainment',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Logo_of_Deepto_TV.svg/1200px-Logo_of_Deepto_TV.svg.png',
    description: 'Modern family entertainment, serials and lifestyle.'
  },
  {
    id: 'ent-deepto-cdn2',
    name: 'দীপ্ত টিভি (Alternative CDN)',
    url: 'https://byphdgllyk.gpcdn.net/hls/DeeptoTV/index.m3u8',
    category: 'entertainment',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Logo_of_Deepto_TV.svg/1200px-Logo_of_Deepto_TV.svg.png',
    description: 'Deepto TV stream optimized for broad reach.'
  },
  {
    id: 'ent-deepto-local',
    name: 'Deepto TV (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Bangladesh-2/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/00/Logo_of_Deepto_TV.svg/1200px-Logo_of_Deepto_TV.svg.png',
    description: 'Local connection route for high definition Deepto TV.'
  },
  {
    id: 'ent-ch-i-cdn',
    name: 'চ্যানেল আই (Public CDN)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/index.m3u8',
    category: 'entertainment',
    logo: 'https://cdn.tvpassport.com/image/station/240x135/channel-i-bangla.png',
    description: 'Award winning news and premier general entertainment.'
  },
  {
    id: 'ent-ch-i-web',
    name: 'চ্যানেল আই (Web Backup)',
    url: 'http://stvlive.net:8080/channeli/index.m3u8',
    category: 'entertainment',
    logo: 'https://cdn.tvpassport.com/image/station/240x135/channel-i-bangla.png',
    description: 'Alternative portal for global viewers of Channel I.'
  },
  {
    id: 'ent-ch-i-local',
    name: 'Channel I (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Bangladesh-7/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cdn.tvpassport.com/image/station/240x135/channel-i-bangla.png',
    description: 'Fast local fiber network connection of Channel I.'
  },
  {
    id: 'ent-ntv-cdn',
    name: 'এনটিভি (Public CDN)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/index.m3u8',
    category: 'entertainment',
    logo: 'https://www.ntvbd.com/sites/default/files/aggregator/2020/02/17/ntv-channel_0.jpg',
    description: 'Highly acclaimed general entertainment and classic dramas.'
  },
  {
    id: 'ent-ntv-local',
    name: 'NTV (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Bangladesh-4/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://www.ntvbd.com/sites/default/files/aggregator/2020/02/17/ntv-channel_0.jpg',
    description: 'High performance entertainment link on local server.'
  },
  {
    id: 'ent-banglavision-cdn',
    name: 'বাংলা ভিশন (Public CDN)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1715/output/1715-audio_113452_eng=113200-video=1692000.m3u8',
    category: 'entertainment',
    logo: 'https://www.bvnews24.com/media/common/newbvlogo.png',
    description: 'Premium Bengali dramas, talkshows and headlines.'
  },
  {
    id: 'ent-banglavision-backup',
    name: 'বাংলা ভিশন (Web Backup)',
    url: 'http://stvlive.net:8080/banglavision/index.m3u8',
    category: 'entertainment',
    logo: 'https://www.bvnews24.com/media/common/newbvlogo.png',
    description: 'Backup route to Bangla Vision feed.'
  },
  {
    id: 'ent-banglavision-local',
    name: 'Bangla Vision (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Bangladesh-9/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://www.bvnews24.com/media/common/newbvlogo.png',
    description: 'Fast speed local mirror of Bangla Vision.'
  },
  {
    id: 'ent-atn-bangla-cdn',
    name: 'এটিএন বাংলা (Public CDN)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8',
    category: 'entertainment',
    logo: 'https://s6.gifyu.com/images/image27cfa7002786c232.png',
    description: 'First satellite channel of Bangladesh with classical family shows.'
  },
  {
    id: 'ent-deshtv-app',
    name: 'Desh TV (CDN)',
    url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/deshtv.stream/tracks-v1a1/mono.m3u8',
    category: 'entertainment',
    logo: 'https://www.deshitv.com/images//bangla_logo/DeshTV24-BanglaLogo.png',
    description: 'General community news, live events and drama series.'
  },
  {
    id: 'ent-ekushey-stream',
    name: 'একুশে টিভি (Ekushey TV)',
    url: 'https://ekusheyserver.com/hls-live/livepkgr/_definst_/liveevent/livestream3.m3u8',
    category: 'entertainment',
    logo: 'https://i.postimg.cc/C15wr1RW/Ekushey-Television-Logo-svg.png',
    description: 'First private terrestrial programming channel of Bangladesh.'
  },
  {
    id: 'ent-ekushey-local',
    name: 'Ekushey TV (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Bangladesh-3/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://i.postimg.cc/C15wr1RW/Ekushey-Television-Logo-svg.png',
    description: 'Reliable high speed local path for Ekushey TV.'
  },
  {
    id: 'ent-metv',
    name: 'Me-টিভি (Full HD)',
    url: 'https://iptvbd.live/metv1080/1080.m3u8',
    category: 'entertainment',
    logo: 'https://buddytv.netlify.app/img/no-logo.png',
    description: 'Premium Bengali variety entertainment mirror.'
  },
  {
    id: 'ent-deshitv',
    name: 'দেশি টিভি (Deshi TV)',
    url: 'https://deshitv.deshitv24.net/live/myStream/playlist.m3u8',
    category: 'entertainment',
    logo: 'https://www.deshitv.com/images//bangla_logo/DeshTV24-BanglaLogo.png',
    description: 'Regional entertainment, cultural dances and folk live streams.'
  },
  {
    id: 'ent-mohonatv',
    name: 'Mohona TV',
    url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/mohonatv.stream/tracks-v1a1/mono.m3u8',
    category: 'entertainment',
    logo: 'https://buddytv.netlify.app/img/no-logo.png',
    description: 'Folk music, regional news bulletins and entertainment dramas.'
  },
  {
    id: 'ent-mytv',
    name: 'মাই টিভি (My TV)',
    url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/mytv-up-off.stream/tracks-v1a1/mono.m3u8',
    category: 'entertainment',
    logo: 'https://dl.dropbox.com/s/jjr5835pbth49tm/my_tv_bd.png',
    description: 'Empowering children and families through educational programs.'
  },
  {
    id: 'ent-rajdhani',
    name: 'Rajdhani TV',
    url: 'https://stream.shariarsuvo.com/hls5/rajdhanicable.m3u8',
    category: 'entertainment',
    logo: 'https://buddytv.netlify.app/img/no-logo.png',
    description: 'Dhaka capital region local cable stream.'
  },
  {
    id: 'ent-enter10',
    name: 'Enter10 Bangla HD',
    url: 'https://live-bangla.akamaized.net/liveabr/pub-iobanglakp3sff/live_720p/chunks.m3u8',
    category: 'entertainment',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Enter%2010%20Bangla.jpeg',
    description: 'Major entertainment dramas, short films and series.'
  },
  {
    id: 'ent-machranga-local',
    name: 'MachRanga TV (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Bangladesh-5/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/2617e1b9-31fa-47ab-a3d7-9880e757a93c_180x180_gazi_tv.png',
    description: 'Beautiful colorful infotainment channel on local server.'
  },
  {
    id: 'ent-satv-local',
    name: 'SA TV (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Bangladesh-10/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/e669d5a1-5d1b-4583-9832-aff70bdfd893_180x180_e18f5d1e-879c-44e1-b50f-863b724b665d.png',
    description: 'SA TV premium music and talk shows on dedicated route.'
  },
  {
    id: 'ent-ch9-local',
    name: 'Channel 9 (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Bangladesh-6/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/e669d5a1-5d1b-4583-9832-aff70bdfd893_180x180_e18f5d1e-879c-44e1-b50f-863b724b665d.png',
    description: 'Sports and entertainment oriented prime network.'
  },
  {
    id: 'ent-gseries',
    name: 'G-Series Drama TV',
    url: 'https://vods2.aynaott.com/gseriesDrama/tracks-v1a1/mono.ts.m3u8',
    category: 'entertainment',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Enter%2010%20Bangla.jpeg',
    description: 'Continuous dramas, music, cultural streams, and modern sit-coms.'
  },
  {
    id: 'ent-peacetv-local',
    name: 'Peace TV Bangla (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Islamic-1/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/a7cb31b1-b6b4-4ec4-baed-6677124a8959_180x180_SSCSports1HD.jpeg',
    description: 'Peaceful religious streams, discussions and moral lectures.'
  },
  {
    id: 'ent-islamictv-local',
    name: 'Islamic TV Bangla (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Islamic-2/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/a7cb31b1-b6b4-4ec4-baed-6677124a8959_180x180_SSCSports1HD.jpeg',
    description: 'Local religious daily programs stream.'
  },
  {
    id: 'ent-starjolsha-local',
    name: 'Star Jolsha (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Entertainment-1/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/09bff4ab-934e-4b47-bacd-4c24ffaf3047_180x180_zee-bangla-hd.jpg',
    description: 'Highly popular GEC broadcasting hit Bengali serials.'
  },
  {
    id: 'ent-zeebangla-local',
    name: 'ZEE Bangla (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Entertainment-2/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/09bff4ab-934e-4b47-bacd-4c24ffaf3047_180x180_zee-bangla-hd.jpg',
    description: 'Daily prime time dramas and competitive game shows.'
  },
  {
    id: 'ent-sonyaath-local',
    name: 'Sony Aath (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Entertainment-4/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/09bff4ab-934e-4b47-bacd-4c24ffaf3047_180x180_zee-bangla-hd.jpg',
    description: 'Crime Petrol and animated thriller series.'
  },
  {
    id: 'ent-colorsbangla-local',
    name: 'Colors Bangla (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Entertainment-3/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/09bff4ab-934e-4b47-bacd-4c24ffaf3047_180x180_zee-bangla-hd.jpg',
    description: 'Engaging real family values drama broadcaster.'
  },
  {
    id: 'ent-hindihits-local',
    name: 'Hindi Hits (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Music-1/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/22a8244f-9923-497a-a626-768cdd2d4d3c_180x180_sports-18.jpg',
    description: 'Non-stop latest Bollywood hits and classic tracks.'
  },
  {
    id: 'ent-yrfmusic-local',
    name: 'YRF Music (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Music-2/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/22a8244f-9923-497a-a626-768cdd2d4d3c_180x180_sports-18.jpg',
    description: 'Yash Raj Films official music loops non stop.'
  },
  {
    id: 'ent-songeet-local',
    name: 'Songeet Bangla (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Music-4/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/22a8244f-9923-497a-a626-768cdd2d4d3c_180x180_sports-18.jpg',
    description: 'Leading Bengali video songs television station.'
  },
  {
    id: 'ent-natgeobangla-local',
    name: 'Nat Geo Bangla (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Documentary-2/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/63d49539-a30b-4326-8848-2af69fb58f92_180x180_discovery_kids.jpg',
    description: 'National Geographic popular science, technology & history in Bengali.'
  },
  {
    id: 'ent-discoverybangla-local',
    name: 'Discovery Bangla (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Documentary-3/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/63d49539-a30b-4326-8848-2af69fb58f92_180x180_discovery_kids.jpg',
    description: 'Survivalist adventures, construction, wild discovery.'
  },
  {
    id: 'ent-bbcearth-local',
    name: 'BBC Earth (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Documentary-5/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/63d49539-a30b-4326-8848-2af69fb58f92_180x180_discovery_kids.jpg',
    description: 'Breathtaking nature captures guided by David Attenborough.'
  },
  {
    id: 'ent-natgeowild-local',
    name: 'Nat Geo WILD (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Documentary-4/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/63d49539-a30b-4326-8848-2af69fb58f92_180x180_discovery_kids.jpg',
    description: 'Stunning close ups with active predators and migrations.'
  },
  {
    id: 'ent-animalplanet-local',
    name: 'Animal Planet (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Documentary-1/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/63d49539-a30b-4326-8848-2af69fb58f92_180x180_discovery_kids.jpg',
    description: 'Human animal relationships, veterinary shows and wildlife reserves.'
  },
  {
    id: 'ent-lovenature-local',
    name: 'Love Nature (BIJOY Local)',
    url: 'http://10.20.30.40:7171/Documentary-7/tracks-v1a1/mono.ts.m3u8?token=sunrise0galaxy0eid',
    category: 'entertainment',
    logo: 'https://cloudtv.akamaized.net/anyott/images/CMS_BD/63d49539-a30b-4326-8848-2af69fb58f92_180x180_discovery_kids.jpg',
    description: 'Documenting the beauty and complexity of our green planet.'
  }
];
