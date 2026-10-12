// 当日ガイド（/guide）のコンテンツ定義。
// 原本: Illustrator「260917_NLP_DESIGN_REAFLET.ai」（当日リーフレット）と
// Google Docs「NO LOOK PARK キャプション原稿」（1LCVr_JuZ8cIRKCT4p4qFhBtp8RcKloLZ-Bt3mnwUrYg）。
// リーフレットの短い紹介文 = lead、キャプション原稿のキャッチコピー/本文 = catchCopy/body。

export type ZoneId = "A" | "B" | "C" | "D" | "E" | "F";
export type Floor = "1F" | "2F";

export type Zone = {
  id: ZoneId;
  /** 英語名（NO LOOK GYM など） */
  name: string;
  floor: Floor;
  /** 会場内の場所 */
  place: string;
  /** 紹介コピー */
  copy: string;
};

export const ZONES: Zone[] = [
  {
    id: "A",
    name: "NO LOOK GYM",
    floor: "1F",
    place: "体育館",
    copy: "視覚に頼らないスポーツや、感覚であそぶ遊具をプレイしよう！",
  },
  {
    id: "B",
    name: "NO LOOK GALLERY",
    floor: "1F",
    place: "ギャラリー（受付のとなり）",
    copy: "見えない×アート体験。全く新しい表現を体験しよう。",
  },
  {
    id: "C",
    name: "NO LOOK BREWERY",
    floor: "1F",
    place: "西エントランス側",
    copy: "目をOFFにして楽しむ、新感覚のビアバー！",
  },
  {
    id: "D",
    name: "NO LOOK 縁日",
    floor: "2F",
    place: "ホール209",
    copy: "ノールックな遊びやゲームが盛りだくさん！",
  },
  {
    id: "E",
    name: "NO LOOK LOUNGE",
    floor: "2F",
    place: "ブックラウンジ",
    copy: "占い、写真館、お茶など心を落ち着けるコンテンツが並びます。",
  },
  {
    id: "F",
    name: "NO LOOK SIDEWALK",
    floor: "2F",
    place: "ルーフバルコニー前の廊下",
    copy: "見える世界と、見えない世界をつなぐデザインを展示します。",
  },
];

export const FLOORS: { id: Floor; label: string }[] = [
  { id: "1F", label: "1階" },
  { id: "2F", label: "2階" },
];

export type Ticket = {
  /** 1回あたりの所要時間 */
  duration?: string;
  /** 開始時間 */
  times: string;
};

export type GuideContent = {
  /** リーフレット上の記号（A1 など）。QR の短縮 URL にも使う */
  code: string;
  /** URL スラッグ: /guide/[slug] */
  slug: string;
  zone: ZoneId;
  title: string;
  withNames: string;
  /** リーフレットの短い紹介文 */
  lead: string;
  /** キャプション原稿のキャッチコピー */
  catchCopy: string;
  /** キャプション原稿の本文 */
  body: string;
  image: string;
  alt: string;
  /** 整理券が必要なコンテンツ */
  ticket?: Ticket;
};

const img = (name: string) => `/images/guide/${name}.jpg`;

export const GUIDE_CONTENTS: GuideContent[] = [
  // ---- A NO LOOK GYM（1F 体育館） ----
  {
    code: "A1",
    slug: "touch-park",
    zone: "A",
    title: "TOUCH PARK",
    withNames: "MAGNET & Skyさくら",
    lead: "目を閉じ、手の触覚だけで進む手すり迷路。感覚を研ぎ澄まして遊んでみよう。",
    catchCopy: "目をつぶってあそぶ、触覚めいろ。",
    body: "触覚だけで楽しむ、手すりを使った遊具です。目を閉じたまま、迷路のような空間を手の感触と案内を頼りに進みます。いつもの手すりが、まったく新しい感覚の遊び場に。子どもから大人まで体験できます。",
    image: img("touch-park"),
    alt: "白い壁の部屋に、灰色の手すりパイプでつくられた迷路のようなコースが組まれている。足元には人工芝、壁には色とりどりの図形が貼られている。",
  },
  {
    code: "A2",
    slug: "braille-block-relay",
    zone: "A",
    title: "コツコツ！点字ブロックリレー",
    withNames: "世界ゆるスポーツ協会",
    lead: "目隠しをした状態で、点字ブロックのコースをリレーするスポーツ！",
    catchCopy: "点字ブロックで、リレー？",
    body: "目隠しをして、2種類の点字ブロックでできたコースをリレーする競技です。2チームでお互いのコースを作りあい、早く走破したチームの勝ち。直進の「GOGOブロック」と、停止・方向転換の「STOPブロック」を駆使して、どんな難しいコースができるでしょうか。",
    image: img("braille-block-relay"),
    alt: "目隠しをして白杖を持った子どもが、床に敷かれた黄色い点字ブロックの上を進んでいる。黄色いTシャツのスタッフがマイクで実況し、まわりで観客が見守っている。",
  },
  {
    code: "A3",
    slug: "chanbara-chan",
    zone: "A",
    title: "チャンバラちゃん",
    withNames: "世界ゆるスポーツ協会 & Google",
    lead: "GoogleのProject Guideline技術を用い、音で位置を把握する、目を使わないチャンバラです。",
    catchCopy: "音を頼りに、いざ勝負。",
    body: "GoogleのProject Guideline技術を使った、目を使わないチャンバラです。自分のいる位置を音の情報で把握しながら、相手の名前を呼ぶ、自分の名前を呼ぶ、をくり返して相手をねらいます。耳をすませて、いざ勝負！",
    image: img("chanbara-chan"),
    alt: "体育館のコートで、2人の子どもが黄色いスポンジの剣を持って向かい合っている。",
  },
  {
    code: "A4",
    slug: "mienai-obakeyashiki",
    zone: "A",
    title: "みえないお化け屋敷",
    withNames: "晃華学園",
    lead: "目を使わないお化け屋敷。みえないおばけと、みえないあなたが出会うとどうなる？",
    catchCopy: "みえないから、もっとドキドキ。",
    body: "ここは、目を使わないお化け屋敷です。視覚を使わずに進むと、一体、どんなドキドキが待っているでしょうか。案内役に導かれながら、いつもと違うお化け屋敷を体験してください。",
    image: img("obakeyashiki"),
    alt: "暗い嵐のような背景の中、目隠しをした人物が両手を前に伸ばして進んでくるイラスト。",
  },

  // ---- B NO LOOK GALLERY（1F ギャラリー） ----
  {
    code: "B1",
    slug: "white-letter",
    zone: "B",
    title: "WHITE LETTER",
    withNames: "FULLWONDER",
    lead: "点字で書かれた、まっしろな手紙。点字表を見ながらひと文字ずつ読んでみましょう。",
    catchCopy: "指でたどる、まっしろな手紙。",
    body: "ここにあるのは、点字で書かれた、まっしろな手紙。点字表を手がかりに、ひと文字ずつ読んでみましょう。すぐには読めないからこそ、文字にふれ、言葉をゆっくり受け取る時間が生まれます。いつもと違う「遅いコミュニケーション」を体験してみてください。",
    image: img("white-letter"),
    alt: "白い紙に点字が打たれ、ぽつぽつと浮き出た点が並んでいるクローズアップ。",
  },
  {
    code: "B2",
    slug: "nolook-shodo",
    zone: "B",
    title: "ノールック書道",
    withNames: "FULLWONDER",
    lead: "先天的全盲の視覚障害者による新しい書道スタイル。君もノールックで筆を走らせてみよう。",
    catchCopy: "見えないという自由。",
    body: "ノールック書道は、先天的に全盲の視覚障害者による、まったく新しい書のジャンルです。視覚に頼らず、身体の感覚と内なるイメージだけで筆を走らせる。その筆致には、純粋な身体表現としての力強さが宿っています。今回は作品展示に加え、アイマスクをつけた体験会も開催します！",
    image: img("nolook-shodo"),
    alt: "濃紺の布の上で、2人が白い和紙に筆で大きく墨をのせている様子を真上から見た写真。和紙は黄色い文鎮でとめられている。",
    ticket: { duration: "各回30分", times: "11:30／13:00／14:30／16:00 スタート" },
  },

  // ---- C NO LOOK BREWERY（1F） ----
  {
    code: "C1",
    slug: "off-time-bar",
    zone: "C",
    title: "OFF TIME BAR",
    withNames: "澤田智洋 & 高橋鴻介 & After School Brewery",
    lead: "美味しいビールを、目をOFFにして飲み比べながら、会話を楽しむバーです。",
    catchCopy: "目をOFFにして、ビールを味わおう",
    body: "目をOFFにして、クラフトビールやノンアルコールの飲み物を、香りと味で飲み比べます。どんな香りがする？ どんな味が残る？ ノールックバーテンダーと感じたことを話しながら、ひと口ごとの違いを楽しんでください。",
    image: img("off-time-bar"),
    alt: "カウンターに、色の異なる6杯のクラフトビールがグラスに注がれて並んでいる。グラスには「AFTER SCHOOL BREWERY」の文字とイラスト。",
    ticket: { duration: "各回20分", times: "14時より、毎時00分・20分・40分スタート" },
  },

  // ---- D NO LOOK 縁日（2F ホール209） ----
  {
    code: "D1",
    slug: "yubibo",
    zone: "D",
    title: "YUBIBO",
    withNames: "MAGNET & Skyさくら",
    lead: "カードの指示で指同士を棒でつなぐ協力型の触覚バランスゲーム。お互いの指の動きや、指の力を感じながら、棒をみんなで支えましょう。",
    catchCopy: "新感覚の触覚バランスゲーム",
    body: "カードの指示に合わせて、指同士を棒でつないでいく協力型の触覚コミュニケーションゲームです。ミッションは、棒を落とさないようにみんなで支えること。お互いの指の動きや力を感じながら、クリアを目指そう！",
    image: img("yubibo"),
    alt: "5人の手が集まり、指先どうしを細い木の棒でつなぎ合って、棒を落とさないよう支えている。",
  },
  {
    code: "D2",
    slug: "dekabo",
    zone: "D",
    title: "DEKABO",
    withNames: "MAGNET & Skyさくら",
    lead: "体を使って棒を支える、触覚バランスゲーム。互いの体の動きを感じながら、クリアを目指そう！",
    catchCopy: "使うのは、身体と棒だけ。",
    body: "カードの指示に合わせて、手足や頭を棒でつないでいく協力型の触覚コミュニケーションゲームです。棒を支え、体全体でバランスを取りながら、みんなで協力します。相手の身体の動きを感じ、声をかけ合いながら、クリアを目指しましょう。",
    image: img("dekabo"),
    alt: "砂地の広場で、子どもと大人が長い棒を腕や頭で支え合いながら遊んでいる。",
  },
  {
    code: "D3",
    slug: "touch-match",
    zone: "D",
    title: "たっちまっち",
    withNames: "MAGNET & Skyさくら",
    lead: "でこぼこ模様の違いを指の感触だけで見つける、触覚の神経衰弱ゲーム！たくさんの触覚カードの中から、同じ触覚の2枚を見つけよう。",
    catchCopy: "おなじ触り心地をさがせ！触覚神経衰弱",
    body: "目をつぶって、たくさんの触覚カードの中から、同じテクスチャーのカードを触覚だけで見つけるカードゲームです。正解したら+1点、間違えてしまったら-1点。指先や指の腹、爪、手のひらを使い分けることで、さまざまな触覚の違いが楽しめます。",
    image: img("touch-match"),
    alt: "水色の背景の前で、白い紙の衣装を着た2人の大人と子どもがテーブルを囲み、小さな触覚カードを指で触っている。",
  },
  {
    code: "D4",
    slug: "touch-match-soft",
    zone: "D",
    title: "たっちまっちソフト",
    withNames: "MAGNET & Skyさくら",
    lead: "目をつぶって、たくさんの触覚クッションの中から、同じ触覚の2つを見つけよう。",
    catchCopy: "様々な素材のクッションで、遊んでみよう！",
    body: "目をつぶって、異なる素材でできたたくさんの触覚クッションの中から、同じ素材感のクッションを触覚だけで見つけるゲームです。正解したら+1点、間違えてしまったら-1点。手のひらや、手の甲など、いろんな場所を使い分けることで、さまざまな触覚の違いが楽しめます。",
    image: img("touch-match-soft"),
    alt: "緑のカーペットの上に、素材の違うクッションがたくさん置かれ、大人と子どもが座って触っている。",
  },
  {
    code: "D5",
    slug: "tesagurido",
    zone: "D",
    title: "手探り堂",
    withNames: "石井健介",
    lead: "目を使わずにお菓子を選ぶ駄菓子屋さん。触りごこちや匂いを感じながら、駄菓子を選ぼう！",
    catchCopy: "目を使わずに、お菓子を探す駄菓子屋さん",
    body: "ここは目を閉じて体験する、ちょっとふしぎな駄菓子屋さん。ルールはひとつ、「目を使わずに商品を選ぶこと」。形や手ざわり、匂いを頼りに、味を当てたり銘柄を選んだり。いつもと違うお菓子体験を楽しんでください。",
    image: img("tesagurido"),
    alt: "国旗の飾られたテントの下で、サングラスをかけた店主が駄菓子の並ぶ台の前に立ち、子どもたちが手探りでお菓子を選んでいる。",
  },
  {
    code: "D6",
    slug: "trian-go",
    zone: "D",
    title: "トライアン碁",
    withNames: "澤田智洋",
    lead: "アイマスクをして、碁石3個を交互に打ち、より大きな三角形をつくった方が勝ち！しかしそこには罠が…！？",
    catchCopy: "手で確かめる、次の一手。",
    body: "アイマスクをして、碁石3個を交互に打ち、より大きな三角形をつくった方が勝ちのゲームです。しかしそこには罠が…！？",
    image: img("trian-go"),
    alt: "木の碁盤の上に、白と黒の碁石が3個ずつ置かれている。",
  },

  // ---- E NO LOOK LOUNGE（2F ブックラウンジ） ----
  {
    code: "E1",
    slug: "shashunkan",
    zone: "E",
    title: "写瞬館",
    withNames: "NO LOOK BROTHERS",
    lead: "ノールックカメラマンが、見ないであなたの最高の瞬間を撮る、ふしぎな写真館。",
    catchCopy: "見ないで撮る、あなたの一瞬。",
    body: "ノールックコミュニケーターが、目を使わずに撮影する写真館です。会話を交わしながら、いつもと違う撮影の時間を楽しんでみませんか。撮影した写真は、その場でお渡しします。ノールックカメラマンが切り取った一瞬を、ぜひ持ち帰ってください。",
    image: img("shashunkan"),
    alt: "アイマスクをつけた男性が、三脚に載せたフィルムカメラを構えてスツールに座っている。",
  },
  {
    code: "E2",
    slug: "mimiyori-uranai",
    zone: "E",
    title: "耳よりな占い",
    withNames: "NO LOOK BROTHERS",
    lead: "みえない占い師が、あなたの運勢を占います。きっと、耳よりな情報がたくさん手に入るはず。",
    catchCopy: "見えない占い師の館",
    body: "目を使わない対話を通して、あなたの気になることをひもとく占いです。ノールック占い師と話しながら、自分の気持ちにゆっくり耳をすませてみましょう。会話の中から、次の一歩のヒントが見つかるかも知れません。",
    image: img("mimiyori-uranai"),
    alt: "白い背景に置かれた、白い耳のオブジェ。",
  },
  {
    code: "E3",
    slug: "blind-blend",
    zone: "E",
    title: "BLIND BLEND",
    withNames: "石井健介 & 高橋鴻介",
    lead: "視覚をOFFにし、茶葉の形・匂い・味から、自分だけのハーブティーをブレンドするワークショップ。",
    catchCopy: "感覚と会話から、あなただけのブレンドティーをつくろう",
    body: "視覚をOFFにして、茶葉の形、匂い、味、音、そこで生まれる会話から、みんなでハーブティーをブレンドするワークショップです。その日その時の自分の感覚に向き合い、他者との違いを楽しむ、その場でしか生まれない時間をお楽しみください。",
    image: img("blind-blend"),
    alt: "木のテーブルで、黒いトレーの上に広げた茶葉やドライフラワーを手で触り、ブレンドしている様子。",
    ticket: { duration: "各回40分", times: "11:30／13:30／14:30／15:30 スタート" },
  },
  {
    code: "E4",
    slug: "mienai-ohanaya",
    zone: "E",
    title: "みえないお花屋さん",
    withNames: "石井健介 & 浪漫花店",
    lead: "お花を、香りと手触りだけで選ぶ、「みない」フラワーショップです。",
    catchCopy: "香りと手ざわりで、花を選ぶ。",
    body: "目をOFFにして、香りや手ざわりを頼りにお花を選んでみませんか。いつもと違う感覚から、気になる一輪を探すフラワーショップです。ノールックコミュニケーターと一緒に、花との新しい出会いを楽しみましょう。",
    image: img("mienai-ohanaya"),
    alt: "街角の花屋の前で、アイマスクをした子どもと大人が一輪の花を手に取り、香りを確かめている。",
  },
  {
    code: "E5",
    slug: "calm-down-booth",
    zone: "E",
    title: "カームダウンブース",
    withNames: "乃村工藝社",
    lead: "にぎやかな会場でひと息つきたいときに、静かに休めるブース。それぞれのペースでお過ごしください。",
    catchCopy: "自分のペースで、ひと休み。",
    body: "にぎやかな会場で少しひと息つきたいときに、静かに休めるブースです。音や人の多さに疲れたときや、気持ちを落ち着けたいときにご利用ください。ここでは声をひかえめにして、それぞれのペースでゆっくり過ごしましょう。アイマスクをつけてみてもいいかも？",
    image: img("calm-down-booth"),
    alt: "木の床の明るい室内に、布を張った背の高いパネルで囲まれた静かな小部屋がある。",
  },

  // ---- F NO LOOK SIDEWALK（2F ルーフバルコニー前） ----
  {
    code: "F1",
    slug: "braille-neue",
    zone: "F",
    title: "Braille Neue",
    withNames: "高橋鴻介",
    lead: "点字と文字が一体になったフォント。見える人と見えない人が一緒に使えるツールを展示します。",
    catchCopy: "目でも、指でも、同じ文字。",
    body: "点字と文字がひとつになったフォントです。目が見えない人と見える人が同じツールを使うことで、その間にコミュニケーションが生まれるきっかけになります。",
    image: img("braille-neue"),
    alt: "点字と英字が一体になった青いフォント「Braille Neue」で書かれた文章の上を、指先がたどっている。",
  },
];

/** 整理券が必要なコンテンツの案内文 */
export const TICKET_NOTE =
  "以下のコンテンツは、整理券が必要です。各ブースで整理券を受け取り、時間になったらそのブースへお越しください。";

export const TICKET_CONTENTS = GUIDE_CONTENTS.filter((c) => c.ticket);

/** 会場MAP画像（Illustrator の EVENT MAP を 4x 書き出し、Drive `2609_NOLOOKPARK_GR/4x/`） */
export const MAP_IMAGES: {
  floor: Floor;
  src: string;
  width: number;
  height: number;
  alt: string;
}[] = [
  {
    floor: "1F",
    src: "/images/guide/map-1f.png",
    width: 2258,
    height: 1450,
    alt: "1階の見取り図。正門を入ると広場があり、その先にメインエントランス。メインエントランスのすぐ横に受付。受付のとなり、114号室の前のギャラリーが B NO LOOK GALLERY。建物の西側、110号室の前が C NO LOOK BREWERY。建物の東側、中庭の先の体育館が A NO LOOK GYM で、東門からも入れる。",
  },
  {
    floor: "2F",
    src: "/images/guide/map-2f.png",
    width: 2015,
    height: 958,
    alt: "2階の見取り図。メインエントランスの階段を上がった先の廊下、206号室の前のルーフバルコニー側が F NO LOOK SIDEWALK。ブックラウンジが E NO LOOK LOUNGE。廊下の東の突き当たり、209号室が D NO LOOK 縁日。",
  },
];

/** 会場MAPの文章による説明（スクリーンリーダー向け・画像の代替） */
export const MAP_GUIDE: { floor: Floor; steps: string[] }[] = [
  {
    floor: "1F",
    steps: [
      "正門を入ると広場があります。広場を抜けた先の建物の入口がメインエントランスです。",
      "メインエントランスを入ってすぐのところに受付があります。アイマスクやスタンプラリーの台紙は受付でどうぞ。",
      "受付のとなりがギャラリー。ここが B NO LOOK GALLERY です。",
      "建物の西側、西エントランスの近くが C NO LOOK BREWERY です。",
      "建物の東側、中庭の先にある体育館が A NO LOOK GYM です。東門からも入れます。",
    ],
  },
  {
    floor: "2F",
    steps: [
      "メインエントランス横の外階段を上がるとルーフバルコニーに出ます。館内の階段も使えます。",
      "ルーフバルコニー前の廊下が F NO LOOK SIDEWALK です。",
      "2階のブックラウンジが E NO LOOK LOUNGE です。",
      "2階の廊下を東へ進んだ突き当たりのホール209が D NO LOOK 縁日です。",
    ],
  },
];

export const STAMP_RALLY = {
  title: "NO LOOK PARK スタンプラリー",
  body: "館内でスタンプラリーを実施しています。各エリアに1つずつスタンプがあるので、すべて集めて受付までお持ちください！",
  note: "スタンプをすべて集めたら受付へ！ 先着50名様にささやかなプレゼントが…？",
} as const;

export const CREDITS = [
  { label: "主催", value: "NO LOOK BROTHERS（澤田智洋／石井健介／高橋鴻介）" },
  { label: "共催", value: "ビジョン・コンソーシアム" },
  { label: "協賛", value: "参天製薬株式会社／smartschool（プラス株式会社）" },
  {
    label: "協力",
    value:
      "世界ゆるスポーツ協会／FULLWONDER／MAGNET／Skyさくら／Jelly Jelly Games／乃村工藝社／After School Brewery",
  },
] as const;

// ---- helpers ----

export function zoneOf(id: ZoneId): Zone {
  return ZONES.find((z) => z.id === id)!;
}

export function contentsInZone(id: ZoneId): GuideContent[] {
  return GUIDE_CONTENTS.filter((c) => c.zone === id);
}

export function contentBySlug(slug: string): GuideContent | undefined {
  return GUIDE_CONTENTS.find((c) => c.slug === slug);
}

export function contentByCode(code: string): GuideContent | undefined {
  const up = code.toUpperCase();
  return GUIDE_CONTENTS.find((c) => c.code === up);
}

/** ゾーン表示名（例: "A NO LOOK GYM"） */
export function zoneLabel(z: Zone): string {
  return `${z.id} ${z.name}`;
}

// ---- エリア別ページ（/guide/zone/[id]）----

/** エリアの URL 用 id（小文字）: /guide/zone/a */
export function zoneSlug(id: ZoneId): string {
  return id.toLowerCase();
}

export function zoneBySlug(slug: string): Zone | undefined {
  return ZONES.find((z) => zoneSlug(z.id) === slug);
}

export function zonePath(id: ZoneId): string {
  return `/guide/zone/${zoneSlug(id)}`;
}
