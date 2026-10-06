"use client";

import { useState } from "react";
import { PODCAST, PODCAST_EPISODES } from "@/lib/site";

/**
 * NO LOOK RADIO の全エピソードを、黄色いカード1枚に収める。
 * Spotify のプレーヤーと、白い角丸ボックスに入れたエピソード一覧を、
 * PCでは横並び（高さをそろえる）、モバイルでは縦積みにする。
 * 一覧の回を押すとプレーヤーがその回に切り替わる（ページ内で完結）。
 *
 * プレーヤーの高さ: モバイルは Spotify のコンパクト版（152px）。
 * PCは一覧ボックス（見出し＋4行で約210px）と高さをそろえるため、
 * Spotify の標準サイズ 232px にして、一覧ボックスをそれに合わせて伸ばす。
 * 152〜232px の中間の高さは Spotify 側のレイアウトが崩れるので使わない。
 */
export default function PodcastPlayer() {
  // 最初は #1 を選んでおく（はじめての人には第1回から聴いてほしい）。
  // 一覧は新しい回が先頭なので、#1 は配列の末尾
  const [currentId, setCurrentId] = useState(PODCAST_EPISODES.at(-1)?.id);
  const current =
    PODCAST_EPISODES.find((ep) => ep.id === currentId) ??
    PODCAST_EPISODES.at(-1);
  if (!current) return null;

  return (
    <div className="box-border flex w-full max-w-[900px] min-w-0 flex-col gap-4 rounded-[20px] bg-brand p-5 md:gap-5 md:px-8 md:py-7">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h3 className="text-lg tracking-[1px] text-ink md:text-xl">
          {PODCAST.title}
        </h3>
        <p className="text-left text-sm leading-[1.8] text-ink md:text-center md:text-[15px]">
          {PODCAST.sub}
        </p>
      </div>

      {/* 列幅を minmax(0,1fr) にしないと、グリッドの列が一覧の長いタイトルの幅まで
          広がり、プレーヤーごとカードの外へはみ出す（モバイルで右側が切れていた）。
          PCは items-stretch でプレーヤーと一覧ボックスの高さをそろえる */}
      <div className="grid grid-cols-[minmax(0,1fr)] items-stretch gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-6">
        <div className="w-full min-w-0 max-w-full overflow-hidden rounded-xl">
          <iframe
            key={current.id}
            title={`NO LOOK RADIO ${current.num}「${current.title}」（Spotify）`}
            src={`https://open.spotify.com/embed/episode/${current.id}?utm_source=generator`}
            width="100%"
            height="152"
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            className="block h-[152px] w-full max-w-full md:h-[232px]"
            style={{ border: 0 }}
          />
        </div>

        {/* エピソード一覧。角丸はプレーヤー（rounded-xl = 12px）とそろえる */}
        <div className="min-w-0 rounded-xl bg-white px-5 py-4 text-left md:flex md:flex-col">
          <p
            id="podcast-episodes"
            className="text-xs tracking-[1px] text-ink/70"
          >
            エピソード一覧
          </p>
          <ul
            aria-labelledby="podcast-episodes"
            // PCではプレーヤーの高さまで伸ばした分を4行で等分し、下に空きを作らない
            className="mt-1 divide-y divide-[#eee] md:flex md:flex-1 md:flex-col"
          >
            {PODCAST_EPISODES.map((ep) => {
              const active = ep.id === current.id;
              return (
                <li key={ep.id} className="md:flex md:flex-1">
                  <button
                    type="button"
                    onClick={() => setCurrentId(ep.id)}
                    aria-pressed={active}
                    className={`flex w-full min-w-0 items-baseline gap-4 py-2 md:items-center text-left text-sm leading-[1.6] transition-colors hover:bg-cream ${
                      active ? "font-bold text-ink" : "text-ink/80"
                    }`}
                  >
                    <span className="w-7 shrink-0 tabular-nums">{ep.num}</span>
                    <span
                      // モバイルは2行、PCは1行で末尾を「…」に。行数は --clamp で切り替える。
                      // -webkit- 系は CSS に書くと圧縮時に消えることがあるのでインラインで当てる
                      className="min-w-0 flex-1 overflow-hidden [--clamp:2] [overflow-wrap:anywhere] md:[--clamp:1]"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: "var(--clamp)",
                        WebkitBoxOrient: "vertical",
                      }}
                      title={ep.title}
                    >
                      {ep.title}
                    </span>
                    {active && (
                      <span className="shrink-0 rounded-full bg-ink px-2 py-0.5 text-[11px] font-bold text-brand">
                        選択中
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
