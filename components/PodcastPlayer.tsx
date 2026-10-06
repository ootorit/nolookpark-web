"use client";

import { useState } from "react";
import { PODCAST, PODCAST_EPISODES, PODCAST_SHOW_URL } from "@/lib/site";

/**
 * NO LOOK RADIO の全エピソードを、小さな箱1つに収める。
 * Spotify のコンパクトプレーヤー（高さ152px）とエピソード一覧を、PCでは横並び、
 * モバイルでは縦積みにする。PCで縦に積むと箱が550px近くになり場所を取るため。
 * 一覧の回を押すとプレーヤーがその回に切り替わる（ページ内で完結）。
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
    <div className="flex w-full max-w-[900px] flex-col gap-4 rounded-[20px] bg-cream p-5 ring-1 ring-inset ring-line md:gap-5 md:px-8 md:py-7">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h3 className="text-lg tracking-[1px] text-ink md:text-xl">
          {PODCAST.title}
        </h3>
        <p className="text-left text-sm leading-[1.8] text-ink md:text-center md:text-[15px]">
          {PODCAST.sub}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <iframe
          key={current.id}
          title={`NO LOOK RADIO ${current.num}「${current.title}」（Spotify）`}
          src={`https://open.spotify.com/embed/episode/${current.id}?utm_source=generator`}
          width="100%"
          height="152"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          className="h-[152px] w-full rounded-xl"
          style={{ border: 0 }}
        />

        <div className="text-left">
          <p
            id="podcast-episodes"
            className="text-xs tracking-[1px] text-muted"
          >
            エピソード一覧
          </p>
          <ul
            aria-labelledby="podcast-episodes"
            className="mt-1.5 divide-y divide-line border-y border-line"
          >
            {PODCAST_EPISODES.map((ep) => {
              const active = ep.id === current.id;
              return (
                <li key={ep.id}>
                  <button
                    type="button"
                    onClick={() => setCurrentId(ep.id)}
                    aria-pressed={active}
                    className={`flex w-full items-baseline gap-3 py-2 text-left text-sm leading-[1.6] transition-colors hover:bg-ink/5 ${
                      active ? "font-bold text-ink" : "text-ink/80"
                    }`}
                  >
                    <span className="w-7 shrink-0 tabular-nums">{ep.num}</span>
                    <span className="min-w-0 flex-1 truncate" title={ep.title}>
                      {ep.title}
                    </span>
                    {active && (
                      <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-ink">
                        選択中
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
          <a
            href={PODCAST_SHOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-xs text-ink underline underline-offset-4 hover:opacity-70"
          >
            Spotifyで番組をフォローする（新しいタブで開きます）
          </a>
        </div>
      </div>
    </div>
  );
}
