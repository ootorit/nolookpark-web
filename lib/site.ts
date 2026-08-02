// Central content + asset definitions for the NO LOOK PARK event site.

export const EVENT = {
  name: "NO LOOK PARK",
  heroCopy: "「見えない」を楽しみつくそう！",
  dateLabel: "2026.10.24 SAT — 11:00-17:00",
  date: "2026年10月24日（土）",
  time: "11:00 - 17:00",
  venue: "HOME/WORK VILLAGE",
  venueArea: "東京・池尻大橋",
  venueAddress: "東京都世田谷区池尻 ◯-◯-◯（住所は確定次第掲載）",
  mapUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("HOME/WORK VILLAGE 池尻大橋"),
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
  kvL2: "/images/generated-1785631187993.png",
  kvL1: "/images/generated-1785555838975.png",
  kvR1: "/images/generated-1785555841069.png",
  kvR2: "/images/generated-1785555841928.png",
  darkPlayground: "/images/generated-1785555838975.png",
  soundKitchen: "/images/generated-1785555841069.png",
  blindArt: "/images/generated-1785555841928.png",
  sawada: "/images/generated-1785630891232.png",
  ishii: "/images/generated-1785630892604.png",
  takahashi: "/images/generated-1785630892598.png",
} as const;

export const NAV_LINKS = [
  { label: "コンセプト", href: "#statement" },
  { label: "コンテンツ", href: "#contents" },
  { label: "開催概要", href: "#details" },
  { label: "お問い合わせ", href: "#contact" },
] as const;

export const NAV_TICKET = "チケット";

export const CONTENTS = [
  {
    num: "01",
    title: "DARK PLAYGROUND",
    image: IMG.darkPlayground,
    desc: "完全暗闇の遊び場。視覚を遮断した空間で、触覚と聴覚だけを頼りに遊具を探索する体験型アトラクション。",
  },
  {
    num: "02",
    title: "SOUND KITCHEN",
    image: IMG.soundKitchen,
    desc: "音だけで料理する「聴くレストラン」。食材が焼ける音、切る音、混ぜる音──耳で味わう新感覚フードコート。",
  },
  {
    num: "03",
    title: "BLIND ART SESSION",
    image: IMG.blindArt,
    desc: "目隠しアート制作ワークショップ。触覚と想像力だけで作品を生み出す、新しいクリエイティブ体験。",
  },
] as const;

export const ORGANIZERS = [
  {
    num: "01",
    name: "澤田智洋",
    romaji: "TOMOHIRO SAWADA",
    image: IMG.sawada,
    desc: "プロフィール文が入ります。ご経歴や NO LOOK PARK での役割などを2〜3行でご記入ください。",
  },
  {
    num: "02",
    name: "石井健介",
    romaji: "KENSUKE ISHII",
    image: IMG.ishii,
    desc: "プロフィール文が入ります。ご経歴や NO LOOK PARK での役割などを2〜3行でご記入ください。",
  },
  {
    num: "03",
    name: "高橋鴻介",
    romaji: "KOSUKE TAKAHASHI",
    image: IMG.takahashi,
    desc: "プロフィール文が入ります。ご経歴や NO LOOK PARK での役割などを2〜3行でご記入ください。",
  },
] as const;

export const STATEMENT_BODY = [
  "NO LOOK PARKは「みえない」を楽しみ尽くす新しい体験型イベントです。",
  "この時代になっても、目が見えない人の仕事は、ごく限られた選択肢の中にあります。",
  "でも、本当にそうでしょうか。",
  "「みえない」ことから始まる職業や体験は、まだ誰も名前をつけていないだけで、もっとたくさんあるんじゃないか。私たちはそう考えました。",
  "NO LOOK PARKは、「みえない」を楽しむテーマパークです。ここには、「みえない」視点から生まれたコンテンツがたくさんあります。",
  "この公園に立ち寄って、「みえない」って、こんなに面白いのかと思ってもらえたら。その感覚こそが、未来の当たり前をつくっていくと信じています。",
] as const;

export const SPONSORS = ["SponsorA", "SponsorB", "SponsorC", "SponsorD", "SponsorE"] as const;

// 共催団体（Organizers セクション末尾のハイライトカード）
export const CO_HOST = {
  chip: "協賛",
  label: "SUPPORTED BY",
  nameEn: "Vision Consortium",
  nameJp: "一般社団法人 ヴィジョン・コンソーシアム",
  desc: "視覚に頼らない体験デザインを研究・支援する団体。NO LOOK PARK では、コンテンツの安全設計とアクセシビリティ監修をご協力いただいています。",
  linkText: "vision-consortium.org",
  href: "#",
} as const;
