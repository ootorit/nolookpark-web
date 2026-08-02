# NO LOOK PARK — Event Site

「みえない」を楽しみつくす体験型イベント **NO LOOK PARK** の特設サイト。
Pencil のデザイン（`nolookpark.pen`）をもとに構築した1ページ構成のランディングサイトです。

- **開催**: 2026年10月24日（土）11:00–19:00
- **会場**: HOME/WORK VILLAGE（東京・池尻大橋）

## 技術スタック

- [Next.js 16](https://nextjs.org/)（App Router / Turbopack）
- React 19 / TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- フォント: Poppins（英字）＋ Noto Sans JP（和文）※ `next/font` で最適化
- アイコン: [lucide-react](https://lucide.dev/) ＋ 一部インライン SVG

## セクション構成

Hero（KV）／ Sponsors ／ Statement（＋Podcast）／ Event Details ／ Contents ／ Organizers ／ Contact ／ Footer

## 開発

```bash
npm install
npm run dev      # http://localhost:3000（このリポジトリでは 3200 でも起動可）
```

その他のスクリプト:

```bash
npm run build    # 本番ビルド
npm run start    # 本番サーバー起動
npm run lint     # ESLint
```

## ディレクトリ

```
app/            ルートレイアウト・ページ・グローバルCSS
components/     セクションごとのUIコンポーネント
lib/site.ts     イベント情報・コンテンツ・画像パスの一元管理
public/images/  KV・コンテンツ・主催者などの画像アセット
nolookpark.pen  デザインの元データ（Pencil）
```

## デプロイ（GitHub → Vercel）

1. GitHub にリポジトリを作成し push
2. [Vercel](https://vercel.com/new) で当該リポジトリを import
3. フレームワークは自動で Next.js と検出 → そのまま Deploy

追加の環境変数やビルド設定は不要です。

## TODO

- お問い合わせフォームの送信処理（現状は見た目のみ）
- MAP（Google Maps 等の埋め込み）
- スポンサーロゴ・主催者プロフィールの実データ差し替え
