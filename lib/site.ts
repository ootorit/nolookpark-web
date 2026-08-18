// Central content + asset definitions for the NO LOOK PARK event site.

export const EVENT = {
  name: "NO LOOK PARK",
  heroCopy: "「みえない」を楽しみつくそう！！",
  dateLabel: "2026年10月24日（土）11:00-17:00",
  date: "2026年10月24日（土）",
  time: "11:00 - 17:00",
  venue: "HOME/WORK VILLAGE",
  venueArea: "東京・池尻大橋",
  venuePostal: "〒154-0001",
  venueAddress: "東京都世田谷区池尻2-4-5",
  venueTel: "03-6450-8131",
  venueTelNote: "受付時間 11:00〜19:00",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("HOME/WORK VILLAGE 東京都世田谷区池尻2-4-5"),
  access: {
    train: ["東急田園都市線", "池尻大橋駅 徒歩10分", "三軒茶屋駅 徒歩16分"],
    bus: ["三宿 徒歩4分"],
    car: [
      "一般駐車場はございません。近隣のコインパーキングをご利用ください。",
      "バリアフリー駐車場はご用意がございます。",
    ],
  },
  locationLine: "@ HOME/WORK VILLAGE（東京・池尻大橋）",
  organizer: "NO LOOK BROTHERS（澤田智洋／石井健介／高橋鴻介）",
  coHost: "ビジョン・コンソーシアム",
  price: [
    "一般: ¥1,000",
    "ファミリー: ¥2,000",
    "※ 小学生以下無料",
    "※ ファミリーチケットは同一世帯の方は一律2000円で参加いただけます。",
  ],
} as const;

export const IMG = {
  logo: "/images/logo@2x.png",
  // 主催者プロフィール（実写）
  sawada: "/images/sawada_profile.jpg",
  ishii: "/images/ishii_profile.jpg",
  takahashi: "/images/kosuke_profile.jpg",
  // 会場（HOME/WORK VILLAGE）写真
  venuePhoto1: "/images/hwv_01.jpg",
  venuePhoto2: "/images/hwv_02.jpg",
  // 協賛ロゴ
  visionConsortiumLogo: "/images/logo_vision-cons.png",
  // コンテンツ キービジュアル
  contentTesagurido: "/images/tesagurido_keyshot.jpg",
  contentTouchmatch: "/images/touchmatch_keyshot.jpg",
  contentBrailleRelay: "/images/braillerelay_keyshot.jpg",
  contentNinnin: "/images/ninnin_keyshot.jpg",
  contentTouchpark: "/images/touchpark_keyvisual.jpg",
  contentYubibo: "/images/yubibo_keyvisual.jpg",
} as const;

// Order follows the actual on-page section order.
export const NAV_LINKS = [
  { label: "コンセプト", href: "#statement" },
  { label: "開催概要", href: "#details" },
  { label: "コンテンツ", href: "#contents" },
  { label: "主催者", href: "#organizers" },
  { label: "協賛", href: "#sponsors" },
  { label: "お問い合わせ", href: "#contact" },
] as const;

export const NAV_TICKET = "チケット";

// Spotify podcast embed. Replace with the real show/episode embed URL
// (Spotify → Share → Embed → copy the src URL).
export const SPOTIFY_EMBED_URL =
  "https://open.spotify.com/embed/episode/7makk4oTQel546B0PZlDM5?utm_source=generator";

export const PODCAST = {
  title: "イベントの裏側を、ポッドキャストで更新中",
  sub: "主催者のNO LOOK BROTHERS の3人が、企画の裏側や当日までの準備の様子を不定期で配信しています。",
} as const;

export const CONTENTS = [
  {
    num: "01",
    title: "手探り堂",
    withNames: "石井健介",
    image: IMG.contentTesagurido,
    alt: "子どもたちが駄菓子を触り、それを眺めている写真",
    desc: "手探りでお菓子を楽しむ、触覚駄菓子屋さん。君はおつかいでこの店を訪れるが、ルールは一つ「目を使わずに商品を選ぶこと」。目を使わずに味を当てたり、銘柄を選んだり…。今までと違うお菓子体験ができます。",
  },
  {
    num: "02",
    title: "たっちまっち",
    withNames: "MAGNET & Skyさくら",
    image: IMG.contentTouchmatch,
    alt: "3人のプレイヤーが触覚カードを触って楽しく遊んでいる様子",
    desc: "たくさんの触覚カードの中から、さまざまなでこぼこ模様の違いを指の感触だけで見つけて、神経衰弱などが楽しめるカードゲーム。指先や指の腹、爪、手のひらを使い分けることで、多様な触覚の違いを楽しめるのが特徴です。",
  },
  {
    num: "03",
    title: "コツコツ！点字ブロックリレー",
    withNames: "世界ゆるスポーツ協会",
    image: IMG.contentBrailleRelay,
    alt: "目隠しをした子どもが白杖を使い、床に並べた黄色い点字ブロックのコースを進む様子。隣で黄色いTシャツのスタッフがマイクでサポートし、周りの観客が見守っている。",
    desc: "目隠しをして、2種類の点字ブロックのコースをリレーする競技。2チームでコースを作りあい、早く走破した方が勝ち。直進の「GOGOブロック」と方向転換の「STOPブロック」を駆使し、難しいコースを作るのがコツです。",
  },
  {
    num: "04",
    title: "YUBIBO",
    withNames: "MAGNET & Skyさくら & JellyJellyGames",
    image: IMG.contentYubibo,
    alt: "5人がテーブルを囲み、指同士を細い棒でつなぎ合って支えながら遊ぶ様子。テーブルには指示カードが並んでいる。",
    desc: "カードの指示に合わせて、指同士を棒でつないでいく協力型の触覚コミュニケーションゲーム。棒を落とさないよう、お互いの指の動きや力を感じながらみんなで支え、クリアを目指します。",
  },
  {
    num: "05",
    title: "DEKABO",
    withNames: "MAGNET & Skyさくら",
    image: null,
    alt: "",
    desc: "YUBIBOの全身版。指先だけでなく体全体を使い、みんなでバランスを取りながら楽しむ、ダイナミックな協力型の触覚ゲームです。",
  },
  {
    num: "06",
    title: "TOUCH PARK",
    withNames: "MAGNET & Skyさくら",
    image: IMG.contentTouchpark,
    alt: "砂地の広場に組まれた手すりの遊具コースで、小さな子どもがカラフルなクッションの段差をのぼり、奥では子どもや大人が手すりをたどって進んでいる様子。",
    desc: "触覚だけで楽しむ、手すりを使った遊具。目を閉じたまま、手の感触と案内をたよりに迷路のような空間を進みます。見慣れた場所が、まったく新しい「感覚の遊び場」に変わります。",
  },
  {
    num: "07",
    title: "BLIND BLEND",
    withNames: "石井健介 & 高橋鴻介",
    image: null,
    alt: "",
    desc: "視覚をOFFにして、茶葉の形・匂い・味・音、そこで生まれる会話から、みんなでハーブティーをブレンドするワークショップ。自分の感覚に向き合い、他者との違いを楽しむ豊かな時間です。",
  },
] as const;

export const ORGANIZERS = [
  {
    num: "01",
    name: "澤田智洋",
    romaji: "TOMOHIRO SAWADA",
    role: "コピーライター",
    image: IMG.sawada,
    links: {
      x: "https://x.com/sawadayuru",
      instagram: "https://www.instagram.com/sawadayuru/",
      site: "https://www.sawadatomohiro.com/",
    },
    desc: "コピーライター／世界ゆるスポーツ協会 代表理事。だれもが楽しめる新しいスポーツを100以上開発し、25万人以上が体験。福祉領域の事業も多数手がける。著書に『マイノリティデザイン』。",
  },
  {
    num: "02",
    name: "石井健介",
    romaji: "KENSUKE ISHII",
    role: "ブラインドコミュニケーター",
    image: IMG.ishii,
    links: {
      x: "https://twitter.com/madhatter_ken",
      instagram: "https://www.instagram.com/kensuke_ishii_ecec/",
      site: "https://kensukeishii.com",
    },
    desc: "2016年に一夜にして視力を失うも、しなやかに社会復帰。2021年よりブラインドコミュニケーターとして、見える世界とみえない世界をポップに繋ぐワークショップや講演を行う。",
  },
  {
    num: "03",
    name: "高橋鴻介",
    romaji: "KOSUKE TAKAHASHI",
    role: "発明家",
    image: IMG.takahashi,
    links: {
      x: "https://x.com/ootori_t",
      instagram: "https://www.instagram.com/ootori_t/",
      site: "https://ootori.co",
    },
    desc: "異なる文化や人の間によい関わりを生みだすものづくりを行う発明家。点字と文字が一体になった書体「Braille Neue」や、触覚コミュニケーションゲーム「YUBIBO」、顔で遊ぶスポーツ「Facial Sports」などを発明。",
  },
] as const;

export const STATEMENT_BODY = [
  "NO LOOK PARKは「みえない」を楽しみ尽くす新しい体験型イベントです。",
  "この時代になっても、目がみえない人の仕事は、ごく限られた選択肢の中にあります。",
  "でも、本当にそうでしょうか。",
  "「みえない」ことから始まる職業や体験は、まだ誰も名前をつけていないだけで、もっとたくさんあるんじゃないか。私たちはそう考えました。",
  "NO LOOK PARKは、「みえない」を楽しむテーマパークです。ここには、「みえない」視点から生まれたコンテンツがたくさんあります。",
  "この公園に立ち寄って、「みえない」って、こんなに面白いのかと思ってもらえたら。その感覚こそが、未来の当たり前をつくっていくと信じています。",
] as const;

export const SPONSORS = ["SponsorA", "SponsorB", "SponsorC", "SponsorD", "SponsorE"] as const;

// 協賛ティア（プレースホルダー）。Gold は CO_HOST（Vision Consortium）を使用。
export const SILVER_SPONSORS = ["SPONSOR LOGO", "SPONSOR LOGO", "SPONSOR LOGO"] as const;
export const BRONZE_SPONSORS = ["ロゴ", "ロゴ", "ロゴ", "ロゴ", "ロゴ"] as const;

// 共催団体（Organizers セクション末尾のハイライトカード）
export const CO_HOST = {
  chip: "協賛",
  label: "SUPPORTED BY",
  nameEn: "Vision Consortium",
  nameJp: "ビジョン・コンソーシアム",
  desc: "点字が誕生して200年目の2025年。視覚障害者と社会の懸け橋となるという「点字毎日」創刊時の理念を現代にアップデートし、毎日新聞社は共感する仲間たちとともに「ビジョン・コンソーシアム」を設立しました。晴眼者に対する「見えない」「見えづらい」世界の体験提供を通じて、誰もが尊重し合い、支え合うインクルーシブ社会に向けた「学び」や「気付き」を広げていきます。",
  linkText: "mainichi.co.jp/vision-cons",
  href: "https://www.mainichi.co.jp/vision-cons/",
} as const;
