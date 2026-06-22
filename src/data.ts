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
  // ==================== SPORTS ====================
  {
    id: 'sports-go3-1',
    name: 'Go3 Sport 1 HD',
    url: 'http://ytoxw6un.ottclub.xyz/iptv/KCUHA6DGYYVA8ZZFUPQV3KZH/18000/index.m3u8',
    category: 'sports',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Go3_Sport_1_Logo_2023.svg/500px-Go3_Sport_1_Logo_2023.svg.png',
    description: 'Premier Live action Sports and Football streams.'
  },
  {
    id: 'sports-go3-2',
    name: 'Go3 Sport 2 HD',
    url: 'http://ytoxw6un.ottclub.xyz/iptv/KCUHA6DGYYVA8ZZFUPQV3KZH/18001/index.m3u8',
    category: 'sports',
    logo: 'https://r2.thesportsdb.com/images/media/channel/logo/14ktq21723836456.png',
    description: 'High-definition Sports coverage.'
  },
  {
    id: 'sports-toffee-1',
    name: 'TOFFEE-🇧🇩-1 FHD (Server 1)',
    url: 'http://sm-monirul.top/tof/live/gervsivo/index.m3u8',
    category: 'sports',
    logo: 'https://i.imgur.com/53aSeDH.png',
    description: 'Popular high-definition Bangladeshi live sports stream.'
  },
  {
    id: 'sports-toffee-1-s2',
    name: 'TOFFEE-🇧🇩-1 FHD (Server 2)',
    url: 'https://kazimmt.ami.bd/playlist/TF/TF-1.m3u8',
    category: 'sports',
    logo: 'https://i.imgur.com/53aSeDH.png',
    description: 'Alternative high-speed server stream.'
  },
  {
    id: 'sports-toffee-2',
    name: 'TOFFEE-🇧🇩-2 FHD (Server 1)',
    url: 'http://sm-monirul.top/tof/live/ecuvscur/index.m3u8',
    category: 'sports',
    logo: 'https://i.imgur.com/53aSeDH.png',
    description: 'Live action premium toffee sports coverage.'
  },
  {
    id: 'sports-toffee-2-s2',
    name: 'TOFFEE-🇧🇩-2 FHD (Server 2)',
    url: 'https://kazimmt.ami.bd/playlist/TF/TF-2.m3u8',
    category: 'sports',
    logo: 'https://i.imgur.com/53aSeDH.png',
    description: 'Alternative fast route.'
  },
  {
    id: 'sports-toffee-3',
    name: 'TOFFEE-🇧🇩-3 FHD (Server 1)',
    url: 'http://sm-monirul.top/tof/live/tunvsjap/index.m3u8',
    category: 'sports',
    logo: 'https://i.imgur.com/53aSeDH.png',
    description: 'Action playbyplays of world sports.'
  },
  {
    id: 'sports-toffee-3-s2',
    name: 'TOFFEE-🇧🇩-3 FHD (Server 2)',
    url: 'https://kazimmt.ami.bd/playlist/TF/TF-3.m3u8',
    category: 'sports',
    logo: 'https://i.imgur.com/53aSeDH.png',
    description: 'Alternative fast mirror.'
  },
  {
    id: 'sports-toffee-4',
    name: 'TOFFEE-🇧🇩-4 FHD (Server 1)',
    url: 'https://sm-monirul.top/tof/live/toffee4/index.m3u8',
    category: 'sports',
    logo: 'https://i.imgur.com/53aSeDH.png',
    description: 'Interactive sports discussion and live streams.'
  },
  {
    id: 'sports-toffee-4-s2',
    name: 'TOFFEE-🇧🇩-4 FHD (Server 2)',
    url: 'https://kazimmt.ami.bd/playlist/TF/TF-4.m3u8',
    category: 'sports',
    logo: 'https://i.imgur.com/53aSeDH.png',
    description: 'High throughput network play stream.'
  },
  {
    id: 'sports-toffee-5',
    name: 'TOFFEE-🇧🇩-5 FHD (Server 1)',
    url: 'https://sm-monirul.top/tof/live/toffee5/index.m3u8',
    category: 'sports',
    logo: 'https://i.imgur.com/53aSeDH.png',
    description: 'Premium live regional sport feeds.'
  },
  {
    id: 'sports-toffee-5-s2',
    name: 'TOFFEE-🇧🇩-5 FHD (Server 2)',
    url: 'https://kazimmt.ami.bd/playlist/TF/TF-5.m3u8',
    category: 'sports',
    logo: 'https://i.imgur.com/53aSeDH.png',
    description: 'High speed toffee server connection.'
  },
  {
    id: 'sports-l5',
    name: 'SONY LIV 5',
    url: 'http://live.balajibroadband.com:3500/live/155.m3u8',
    category: 'sports',
    logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/SonyLIV_Sports_5.png',
    description: 'Sony Liv live matches and regional leagues.'
  },
  {
    id: 'sports-l1',
    name: 'SONY LIV 1',
    url: 'http://live.balajibroadband.com:3500/live/162.m3u8',
    category: 'sports',
    logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/SonyLIV_Sports_1.png',
    description: 'Premium sports and major football broadcaster.'
  },
  {
    id: 'sports-l2',
    name: 'SONY LIV 2',
    url: 'http://live.balajibroadband.com:3500/live/891.m3u8',
    category: 'sports',
    logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/SonyLIV_Sports_2.png',
    description: 'Non-stop interactive sports mirror.'
  },
  {
    id: 'sports-l3',
    name: 'SONY LIV 3',
    url: 'http://live.balajibroadband.com:3500/live/892.m3u8',
    category: 'sports',
    logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/SonyLIV_Sports_3.png',
    description: 'Sony Liv Sports live digital action stream.'
  },
  {
    id: 'sports-bd-v-aus-1',
    name: 'BD V AUS 🇧🇩 FHD (S1)',
    url: 'http://114.130.57.233:8080/TsportHD/tracks-v1a1/mono.m3u8?token=SkQuhAXZxgBan1',
    category: 'sports',
    logo: 'https://i.imgur.com/UspLV8i.png',
    description: 'Live bilateral series and action.'
  },
  {
    id: 'sports-bd-v-aus-2',
    name: 'BD V AUS 🇧🇩 FHD (S2)',
    url: 'http://103.158.133.62:8080/live/index.m3u8',
    category: 'sports',
    logo: 'https://i.imgur.com/UspLV8i.png',
    description: 'Alternative live sports stream.'
  },
  {
    id: 'sports-bd-v-aus-3',
    name: 'BD V AUS 🇧🇩 FHD (S3)',
    url: 'https://tv.beyondtaxconsultants.com/api/robi/lps/http://198.195.239.50:8095/tsports/tracks-v1a1/mono.m3u8',
    category: 'sports',
    logo: 'https://i.imgur.com/UspLV8i.png',
    description: 'Proxy sports high definition action stream.'
  },
  {
    id: 'sports-fifa-worldcup',
    name: 'Fifa World Cup Live',
    url: 'https://live-aburayhan1103.telewebion.ir/ek/faratar/live/playlist.m3u8?isp=NA&city=NA',
    category: 'sports',
    logo: 'https://shorturl.at/NPoFh',
    description: 'Continuous football action and premium summaries.'
  },
  {
    id: 'sports-unite8-s1-1',
    name: 'Unite8 Sports 1 FHD (S1)',
    url: 'https://tv.beyondtaxconsultants.com/api/robi/lps/http://198.195.239.50:8095/ptv/tracks-v1a1/mono.m3u8',
    category: 'sports',
    logo: 'https://i.postimg.cc/0NYVSnkr/Gemini-Generated-Image-ykkw2cykkw2cykkw.png',
    description: 'High-definition football and cricket broadcasting.'
  },
  {
    id: 'sports-unite8-s1-2',
    name: 'Unite8 Sports 1 FHD (S2)',
    url: 'https://xfireflix.my.id/mac.php?id=373312.m3u8',
    category: 'sports',
    logo: 'https://i.postimg.cc/0NYVSnkr/Gemini-Generated-Image-ykkw2cykkw2cykkw.png',
    description: 'Alternative fast route.'
  },
  {
    id: 'sports-unite8-s1-3',
    name: 'Unite8 Sports 1 FHD (S3)',
    url: 'https://restream-bay.vercel.app/chuchhi?id=206315&format=.m3u8',
    category: 'sports',
    logo: 'https://i.postimg.cc/0NYVSnkr/Gemini-Generated-Image-ykkw2cykkw2cykkw.png',
    description: 'Proxy high definition sports mirror.'
  },
  {
    id: 'sports-fifa-fast',
    name: 'FIFA SERVER FAST',
    url: 'https://live05.msdht.app/live/24561735.m3u8',
    category: 'sports',
    logo: 'https://i.postimg.cc/0NYVSnkr/Gemini-Generated-Image-ykkw2cykkw2cykkw.png',
    description: 'Ultra-speed sports streaming connection.'
  },
  {
    id: 'sports-caze-br',
    name: 'Caze TV BR',
    url: 'https://dfr80qz435crc.cloudfront.net/MNOP/Amagi/Caze/Caze_TV_BR/Caze_TV.m3u8',
    category: 'sports',
    logo: 'https://i.postimg.cc/0NYVSnkr/Gemini-Generated-Image-ykkw2cykkw2cykkw.png',
    description: 'Live Brazilian sporting and interactive programs.'
  },
  {
    id: 'sports-bein-direct',
    name: 'beIN Sports Direct',
    url: 'https://1nyaler.streamhostingcdn.top/stream/23/index.m3u8',
    category: 'sports',
    logo: 'https://carboncredits.com/wp-content/uploads/2025/09/shutterstock_2306088965-e1757112807302.jpg',
    description: 'Global flagship match channels and tournaments.'
  },
  {
    id: 'sports-sky-world-cup',
    name: 'Football World Cup Sky',
    url: 'https://d1211whpimeups.cloudfront.net/smil:rtbgo/chunklist.m3u8',
    category: 'sports',
    logo: 'https://carboncredits.com/wp-content/uploads/2025/09/shutterstock_2306088965-e1757112807302.jpg',
    description: 'Sky sports live world cup matches play stream.'
  },
  {
    id: 'sports-unite8-s2',
    name: 'Unite8 Sports 2 HD',
    url: 'http://212.102.34.8:9080/AndFlixHD/video.m3u8',
    category: 'sports',
    logo: 'https://carboncredits.com/wp-content/uploads/2025/09/shutterstock_2306088965-e1757112807302.jpg',
    description: 'Regional premium sports and football action.'
  },
  {
    id: 'sports-fancode-1',
    name: 'FANCODE HD',
    url: 'https://abfjk4haaaaaaaampv6ofhkihi4r6.bia-cf.live.pv-cdn.net/iad-nitro/live/clients/dash/enc/fdb3pubmek/out/v1/aefca6420f944a9482e117f315de535f/cenc.mpd',
    category: 'sports',
    logo: 'https://iili.io/KWn2Z0u.png',
    description: 'Premier digital sporting events coverage.'
  },
  {
    id: 'sports-cricbuzz-1',
    name: 'Cricbuzz Live HD',
    url: 'https://xfireflix.my.id/mac.php?id=809382.m3u8',
    category: 'sports',
    logo: 'https://epg.pw/media/images/epg/2025/05/09/20250509042549016858_59.png',
    description: 'Continuous cricket live scorecard and streams.'
  },
  {
    id: 'sports-fox-501',
    name: 'Fox Sports 501 HD',
    url: 'https://rgkkw.live:443/live/1Aoen7elp5/IgMJ60tmAa/4748.ts',
    category: 'sports',
    logo: 'http://greenpa1.com/fox.png',
    description: 'Fox Sports premium high power satellite action stream.'
  },
  {
    id: 'sports-willow-cricket-1',
    name: 'Willow Cricket HD (S1)',
    url: 'https://xfireflix.my.id/mac.php?id=809386.m3u8',
    category: 'sports',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtZcJANelaW8aBRREj0hAfcWIjvYWJdJ_Epg&usqp=CAU',
    description: 'Live high throughput regional sporting action stream.'
  },
  {
    id: 'sports-willow-cricket-2',
    name: 'Willow Cricket HD (S2)',
    url: 'https://tvsen5.aynaott.com/willowhd/index.m3u8',
    category: 'sports',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtZcJANelaW8aBRREj0hAfcWIjvYWJdJ_Epg&usqp=CAU',
    description: 'Fast alternative direct link for Willow.'
  },
  {
    id: 'sports-t-sports-1',
    name: 'T Sports Live (S1)',
    url: 'https://mflixott.com/tv/dd/live.php?id=270',
    category: 'sports',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/T_Sports_logo.svg/500px-T_Sports_logo.svg.png',
    description: 'Bilateral cricket tournaments and major leagues broadcaster.'
  },
  {
    id: 'sports-t-sports-2',
    name: 'T Sports Live (S2)',
    url: 'http://113.21.231.219:789/Tsports/index.m3u8',
    category: 'sports',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/T_Sports_logo.svg/500px-T_Sports_logo.svg.png',
    description: 'Local server optimized link of T Sports.'
  },
  {
    id: 'sports-t-sports-3',
    name: 'T Sports Live (S3)',
    url: 'https://tvsen7.aynaott.com/tsportsfhd/index.m3u8',
    category: 'sports',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/T_Sports_logo.svg/500px-T_Sports_logo.svg.png',
    description: 'Fast alternative port of T Sports HD.'
  },
  {
    id: 'sports-dazn-combat',
    name: 'DAZN COMBAT',
    url: 'https://dazn-combat-rakuten.amagi.tv/hls/amagi_hls_data_rakutenAA-dazn-combat-rakuten/CDN/master.m3u8',
    category: 'sports',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThxvpmiCnoGHXYiTzY0lp1E0UXdRSPg69f3Q&s',
    description: 'Championship boxing, martial arts and ringside.'
  },
  {
    id: 'sports-dazn-ringside',
    name: 'DAZN RINGSIDE',
    url: 'https://aegis-cloudfront-1.tubi.video/bfad29e2-5bee-44f3-8256-127324e8b106/playlist.m3u8',
    category: 'sports',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKVJVdXD6NTy8nMOIOb_mqewV8NZMUjHdPog&s',
    description: 'Ringside commentaries, interviews and championship replays.'
  },
  {
    id: 'sports-sony-ten1',
    name: 'Sony Sports 1 HD',
    url: 'https://b4uplay.com/sliv/stream.m3u8?id=1000009276|referer=https://b4uplay.com/',
    category: 'sports',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/India/sony-ten-1-hd-in.png',
    description: 'High definition Sony Ten 1 sports live action stream.'
  },
  {
    id: 'sports-sony-ten2',
    name: 'Sony Sports 2 HD',
    url: 'https://b4uplay.com/sliv/stream.m3u8?id=1000009277|referer=https://b4uplay.com/',
    category: 'sports',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/India/sony-ten-2-hd-in.png',
    description: 'Flagship European football leagues and actions.'
  },
  {
    id: 'sports-sony-ten3',
    name: 'Sony Sports 3 HD',
    url: 'https://b4uplay.com/sliv/stream.m3u8?id=1000009278|referer=https://b4uplay.com/',
    category: 'sports',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/India/sony-ten-3-hd-in.png',
    description: 'Multi-lingual premium sports coverage of Sony.'
  },
  {
    id: 'sports-sony-ten5',
    name: 'Sony Sports 5 HD',
    url: 'https://b4uplay.com/sliv/stream.m3u8?id=1000009275|referer=https://b4uplay.com/',
    category: 'sports',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/India/sony-ten-5-hd-in.png',
    description: 'Sony Ten 5 Sports live interactive portal stream.'
  },

  // ==================== NEWS ====================
  {
    id: 'news-fgn',
    name: 'FGN NEWS',
    url: 'http://103.175.73.12:8080/live/856/856_0.m3u8',
    category: 'news',
    logo: 'https://yt3.googleusercontent.com/rDtVRwirMau7LnqmpkNHMrsqCQ7TtWTIbXePXFcY_GWDMs4z64A-w2XBG92t-IV4-C8UoEI=s900-c-k-c0x00ffffff-no-rj',
    description: 'Flagship non-stop live global breaking headlines channel.'
  },
  {
    id: 'news-btv',
    name: 'বিটিভি নিউজ',
    url: 'https://in1.sunilprasad.com.np/wodgoLive/btv-world/master.m3u8',
    category: 'news',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/BTV_News_Logo.svg/1280px-BTV_News_Logo.svg.png',
    description: 'Bangladesh Television national 24/7 dedicated news network.'
  },
  {
    id: 'news-somoy-1',
    name: 'সময় টিভি (Server 1)',
    url: 'https://live.thebosstv.com:30443/dwlive/Somoy-TV/chunks.m3u8',
    category: 'news',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/somoy-bd.png',
    description: 'First satellite news oriented television channel in Bangladesh.'
  },
  {
    id: 'news-somoy-2',
    name: 'সময় টিভি (Server 2)',
    url: 'http://114.130.57.224:8080/Somoy-TV-3Mb/tracks-v1a1/mono.m3u8?token=SkQuhAXZxgBan1',
    category: 'news',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/somoy-bd.png',
    description: 'Backup high fidelity stream of Somoy live coverage.'
  },
  {
    id: 'news-somoy-3',
    name: 'সময় টিভি (Server 3)',
    url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/somoyt000011226615544544.stream/tracks-v1a1/mono.m3u8',
    category: 'news',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/somoy-bd.png',
    description: 'Somoy News network local fast latency route.'
  },
  {
    id: 'news-jamuna-1',
    name: 'যমুনা টিভি (Server 1)',
    url: 'http://103.158.133.62:8080/jamunatv/index.m3u8',
    category: 'news',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/jamuna-tv-bd.png',
    description: 'Committed to fearless, objective investigative reporting.'
  },
  {
    id: 'news-jamuna-2',
    name: 'যমুনা টিভি (Server 2)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1701/output/index.m3u8',
    category: 'news',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/jamuna-tv-bd.png',
    description: 'Non-stop interactive news broadcast and discussions.'
  },
  {
    id: 'news-jamuna-3',
    name: 'যমুনা টিভি (Server 3)',
    url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/jamuna-test-sample-ok.stream/tracks-v1a1/mono.m3u8',
    category: 'news',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/jamuna-tv-bd.png',
    description: 'Low-latency alternative mirror for Jamuna TV.'
  },
  {
    id: 'news-independent-1',
    name: 'Independent TV (S1)',
    url: 'http://stvlive.net:8080/independent/index.m3u8',
    category: 'news',
    logo: 'https://cdn.itvbd.net/contents/themes/public/style/images/logo.png',
    description: 'Analytical talk shows and immediate headlines around the country.'
  },
  {
    id: 'news-independent-2',
    name: 'Independent TV (S2)',
    url: 'https://sm-monirul.top/toffee/play/independent_tv.m3u8',
    category: 'news',
    logo: 'https://cdn.itvbd.net/contents/themes/public/style/images/logo.png',
    description: 'First popular regional news service stream.'
  },
  {
    id: 'news-independent-3',
    name: 'Independent TV (S3)',
    url: 'http://103.158.133.62:8080/independent/index.m3u8',
    category: 'news',
    logo: 'https://cdn.itvbd.net/contents/themes/public/style/images/logo.png',
    description: 'High performance dedicated local server routing.'
  },
  {
    id: 'news-ch24-1',
    name: 'Channel 24 (S1)',
    url: 'http://stvlive.net:8080/channel24/index.m3u8',
    category: 'news',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/channel-24-bd.png',
    description: 'Highly acclaimed general headlines and economy talkshows.'
  },
  {
    id: 'news-ch24-2',
    name: 'Channel 24 (S2)',
    url: 'http://103.158.133.62:8080/channel24/index.m3u8',
    category: 'news',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/channel-24-bd.png',
    description: 'Channel 24 network local fiber connection.'
  },
  {
    id: 'news-ch24-3',
    name: 'Channel 24 (S3)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8',
    category: 'news',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/channel-24-bd.png',
    description: 'South Asian premium satellite news broadcaster.'
  },
  {
    id: 'news-atn-news-1',
    name: 'ATN News (Server 1)',
    url: 'http://103.158.133.62:8080/atnnews/index.m3u8',
    category: 'news',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/atn-news-hd-bd.png',
    description: 'ATN News network local dedicated route.'
  },
  {
    id: 'news-atn-news-2',
    name: 'ATN News (Server 2)',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1706/output/index.m3u8',
    category: 'news',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/atn-news-hd-bd.png',
    description: 'High-speed alternative portal for ATN News.'
  },
  {
    id: 'news-atn-news-3',
    name: 'ATN News (Server 3)',
    url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/atnws-sg.stream/tracks-v1a1/mono.m3u8',
    category: 'news',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/atn-news-hd-bd.png',
    description: 'Committed to live current affairs and headlines.'
  },

  // ==================== MOVIES ====================
  {
    id: 'movie-mhakka',
    name: 'MHAKKA TV',
    url: 'https://media2.streambrothers.com:1936/8122/8122/playlist.m3u8',
    category: 'movie',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_bKVo8j8dSj_8kK-3I0pG1lOu5eUa1XU3iw&s',
    description: 'Vibrant action films, dramas and live movie releases.'
  },
  {
    id: 'movie-zee-bangla-cinema',
    name: 'Zee Bangla Sonar',
    url: 'https://stream.ottplus.live/live/zee_bangla_cinema_abr/live/zee_bangla_cinema_720/chunks.m3u8',
    category: 'movie',
    logo: 'https://jiotv.catchup.cdn.jio.com/dare_images/images/ZeeBanglaSonar.png',
    description: 'Continuously active Bengali hits and classic dramas.'
  },
  {
    id: 'movie-sonymax',
    name: 'Sony Max SD',
    url: 'http://103.158.133.62:8080/sonymax/index.m3u8',
    category: 'movie',
    logo: 'https://jiotvimages.cdn.jio.com/dare_images/images/channel/2102fac092ee28f75652131b19d74260.png',
    description: 'Goldmines premium Indian movie events and blockbusters.'
  },
  {
    id: 'movie-goldmines-1',
    name: 'Goldmines TV',
    url: 'https://cdn-2.pishow.tv/live/1459/master.m3u8',
    category: 'movie',
    logo: 'https://static.wikia.nocookie.net/jhmovie/images/7/7b/Goldmines_logo.png',
    description: 'Hindi movies, blockbusters and classic family releases.'
  },
  {
    id: 'movie-b4u',
    name: 'B4U Movies',
    url: 'http://103.175.73.12:8080/live/43/43_0.m3u8',
    category: 'movie',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/B4U%20Movies.png',
    description: 'South Bollywood action movies and hit collections.'
  },

  // ==================== CARTOON / KIDS ====================
  {
    id: 'cartoon-disney-hd',
    name: 'Disney Channel HD',
    url: 'https://rgkkw.live:443/live/1Aoen7elp5/IgMJ60tmAa/19741.ts',
    category: 'cartoon',
    logo: 'https://live.dinesh29.com.np/logos/disney-channel.png',
    description: 'High definition premium cartoons and interactive kids series.'
  },
  {
    id: 'cartoon-duronto-tv',
    name: 'Duronto TV (দুরন্ত)',
    url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/duronto.stream/tracks-v1a1/mono.m3u8',
    category: 'cartoon',
    logo: 'https://upload.wikimedia.org/wikipedia/en/d/d7/Duronto_TV_Logo.png',
    description: 'First popular children-based TV channel in Bangladesh.'
  },
  {
    id: 'cartoon-network-m',
    name: 'Cartoon Network Kids',
    url: 'https://vodzong.mjunoon.tv:8087/streamtest/cartoon-network-87/playlist.m3u8',
    category: 'cartoon',
    logo: 'https://github.com/sonamul4545/Channel_logo-s/blob/main/CN.jpg?raw=true',
    description: 'Non-stop classic Ben 10, Tom & Jerry and animated series.'
  },

  // ==================== ENTERTAINMENT ====================
  {
    id: 'ent-bioscope',
    name: 'Bioscope+',
    url: 'https://sm-monirul.top/ultra_restream/bioscope/index.m3u8',
    category: 'entertainment',
    logo: 'https://static.wikia.nocookie.net/etv-gspn-bangla/images/8/82/Bioscope%2B.png',
    description: 'Popular dramas, movie reviews and alternative releases.'
  },
  {
    id: 'ent-btv-nat',
    name: 'বিটিভি ন্যাশনাল',
    url: 'https://tv.beyondtaxconsultants.com/api/robi/lps/http://198.195.239.50:8095/btv/tracks-v1a1/mono.m3u8',
    category: 'entertainment',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/btv-hd-bd.png',
    description: 'National public network general entertainment portfolio.'
  },
  {
    id: 'ent-btv-ctg',
    name: 'বিটিভি চট্টগ্রাম',
    url: 'https://tvsen6.aynaott.com/btvctg/tracks-v1a1/mono.ts.m3u8',
    category: 'entertainment',
    logo: 'https://s3.aynaott.com/storage/20e835171a2d078ca6c678fc95bd4bbd',
    description: 'Chittagong regional programs mirror BTV feed.'
  },
  {
    id: 'ent-sangsad-tv',
    name: 'সংসদ বাংলাদেশ',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8',
    category: 'entertainment',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/sangsad-television-bd.png',
    description: 'Live Parliamentary proceedings and national events.'
  },
  {
    id: 'ent-mytv',
    name: 'মাই টিভি',
    url: 'https://tvsen6.aynaott.com/mytv/index.m3u8',
    category: 'entertainment',
    logo: 'https://i.imgur.com/bahWhBG.png',
    description: 'Classic general family shows and documentaries.'
  },
  {
    id: 'ent-banglavision',
    name: 'Bangla Vision',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1715/output/index.m3u8',
    category: 'entertainment',
    logo: 'https://s3.aynaott.com/storage/e86c14566b4d5b6dd68ac37dce4f6043',
    description: 'Premium family dramas, talkshows and headlines.'
  },
  {
    id: 'ent-rtv',
    name: 'RTV HD',
    url: 'http://116.204.149.16/rtvhd/index.m3u8',
    category: 'entertainment',
    logo: 'https://s3.aynaott.com/storage/fd634ca672c8294f109225ca42d20991',
    description: 'RTV satellite general entertainment stream.'
  },
  {
    id: 'ent-atn-bangla',
    name: 'এটিএন বাংলা',
    url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/atnbd-8-org.stream/tracks-v1a1/mono.m3u8',
    category: 'entertainment',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/atn-bangla-hd-bd.png',
    description: 'Classic first satellite channel of Bangladesh.'
  },
  {
    id: 'ent-maasranga',
    name: 'Maasranga TV',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8',
    category: 'entertainment',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Maasranga%20TV.png',
    description: 'Analytical talkshows and family serials.'
  },
  {
    id: 'ent-channel-i',
    name: 'Channel I',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/index.m3u8',
    category: 'entertainment',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/Bangladesh/channel-i-hd-bd.png',
    description: 'National award winning dramas and agricultural talkshows.'
  },
  {
    id: 'ent-ntv',
    name: 'NTV',
    url: 'https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/index.m3u8',
    category: 'entertainment',
    logo: 'https://s3.aynaott.com/storage/73c39182782a201338070c2f4429e449',
    description: 'NTV general entertainment and mirror dramas.'
  },
  {
    id: 'ent-deepto-tv',
    name: 'Deepto TV',
    url: 'http://103.158.133.62:8080/deepto/index.m3u8',
    category: 'entertainment',
    logo: 'https://imglink.cc/cdn/2ODX-FAGY4.png',
    description: 'Engaging family programs and high definition dramas.'
  },
  {
    id: 'ent-etv',
    name: 'ETV (একুশে টিভি)',
    url: 'https://tvsen6.aynaott.com/etv/index.m3u8',
    category: 'entertainment',
    logo: 'https://s3.aynaott.com/storage/d805cf57543080b49de8a2621cd54da4',
    description: 'Terrestrial general coverage and news portfolio.'
  },
  {
    id: 'ent-global-tv',
    name: 'Global TV',
    url: 'https://app24.jagobd.com.bd/c3VydmVyX8RpbEU9Mi8xNy8yMFDEEHGcfRgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcEdsEfeDeKiNkVN3PTOmdFseWRtaW51aiPhnPTI2/Global-tv.stream/playlist.m3u8',
    category: 'entertainment',
    logo: 'https://s3.aynaott.com/storage/bda05e1c2173251baebc20ffe43dea0b',
    description: 'Interactive cultural stream and lifestyle serials.'
  },
  {
    id: 'ent-green-tv',
    name: 'Green TV Bangladesh',
    url: 'https://app.ncare.live/c3VydmVyX8RpbEU9Mi8xNy8yMDE0GIDU6RgzQ6NTAgdEoaeFzbF92YWxIZTO0U0ezN1IzMyfvcGVMZEJCTEFWeVN3PTOmdFsaWRtaW51aiPhnPTI2/greentv.stream/live-orgin/greentv.stream/chunks.m3u8',
    category: 'entertainment',
    logo: 'https://cdnhost.akashbd.net/assets/uploads/channels_images/1683606878-6994272.png',
    description: 'New generation entertainment channel with visual serials.'
  },
  {
    id: 'ent-zee-bangla-hd',
    name: 'Zee Bangla HD',
    url: 'http://103.158.133.62:8080/zee_bangla_hd/tracks-v1a1/mono.m3u8',
    category: 'entertainment',
    logo: 'https://i.ibb.co.com/9HM31yqc/ZEE-BANGLA-HD.png',
    description: 'High definition broadcast of premier serials.'
  },
  {
    id: 'ent-sun-bangla-hd',
    name: 'Sun Bangla HD',
    url: 'https://xfireflix.my.id/mac.php?id=908685.m3u8',
    category: 'entertainment',
    logo: 'https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Sun%20Bangla.png',
    description: 'Sun Bangla news, dramas and music.'
  },
  {
    id: 'ent-star-jalsha-hd',
    name: 'Star Jalsha HD',
    url: 'https://tvsen3.aynascope.net/n64PH4YL/index.m3u8',
    category: 'entertainment',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Star_Jalsha_logo_2023.png',
    description: 'High definition Indian Bengali daily soap broadcaster.'
  },
  {
    id: 'ent-colors-bangla-hd',
    name: 'Colors Bangla HD',
    url: 'http://live.balajibroadband.com:3500/live/756.m3u8',
    category: 'entertainment',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Colors_Bangla.png',
    description: 'Engaging real family values drama broadcaster.'
  },
  {
    id: 'ent-colors-bangla-cinema',
    name: 'Colors Bangla Cinema',
    url: 'http://live.balajibroadband.com:3500/live/1657.m3u8',
    category: 'entertainment',
    logo: 'https://jiotv.catchup.cdn.jio.com/dare_images/images/Colors_Bangla_Cinema.png',
    description: 'Bengali blockbusters and continuous cinemas.'
  },
  {
    id: 'ent-jalsha-movies-hd',
    name: 'Jalsha Movies HD',
    url: 'http://103.158.133.62:8080/jalsha_movies_hd/tracks-v1a1/mono.m3u8',
    category: 'entertainment',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/India/jalsha-movies-hd-in.png',
    description: 'High definition sports and blockbuster films.'
  },
  {
    id: 'ent-colors-hd',
    name: 'Colors HD',
    url: 'http://live.balajibroadband.com:3500/live/144.m3u8',
    category: 'entertainment',
    logo: 'https://jiotv.catchup.cdn.jio.com/dare_images/images/ColorsHD.png',
    description: 'Sony/Viacom 18 prime entertainment serials.'
  },
  {
    id: 'ent-starplus-hd',
    name: 'StarPlus HD',
    url: 'https://tvsen7.aynaott.com/sphdbd/index.m3u8',
    category: 'entertainment',
    logo: 'https://jiotv.catchup.cdn.jio.com/dare_images/images/Star_Plus_HD.png',
    description: 'Leading generic entertainment and soap channel.'
  },
  {
    id: 'ent-sony-hd',
    name: 'Sony TV HD',
    url: 'https://b4uplay.com/sliv/stream.m3u8?id=1000009246|referer=https://b4uplay.com/',
    category: 'entertainment',
    logo: 'https://raw.githubusercontent.com/AsimDipto/Logo-box/refs/heads/main/India/sony-entertainment-television-hd-in.png',
    description: 'Premium family game shows, CID and CID classics.'
  },
  {
    id: 'ent-sony-sab-hd',
    name: 'Sony Sab HD',
    url: 'https://b4uplay.com/sliv/stream.m3u8?id=1000009248|referer=https://b4uplay.com/',
    category: 'entertainment',
    logo: 'https://assets.dishhomego.com.np/f_webp,q_85,w_250/dhome/posters/ea93cb6a-cb48-4841-99d2-8d2cfd835b63.jpg',
    description: 'Non-stop laughter, comedy dramas and Taarak Mehta.'
  },
  {
    id: 'ent-sony-pal',
    name: 'Sony Pal',
    url: 'https://b4uplay.com/sliv/stream.m3u8?id=1000009273|referer=https://b4uplay.com/',
    category: 'entertainment',
    logo: 'https://sonypicturesnetworks.com/images/logos/SONY%20PAL.png',
    description: 'Continuous drama serials and cultural streams.'
  },
  {
    id: 'ent-sony-aath',
    name: 'Sony Aath',
    url: 'https://b4uplay.com/sliv/stream.m3u8?id=1000009255|referer=https://b4uplay.com/',
    category: 'entertainment',
    logo: 'https://sonypicturesnetworks.com/images/logos/SONY%20AATH.png',
    description: 'Vibrant crime mysteries, drama series and cartoons in Bengali.'
  }
];
