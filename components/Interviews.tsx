"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { INTERVIEWS } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/**
 * メンバーのインタビュー動画（縦9:16）。
 * モバイルは横スクロール（縦長の動画を何本も積むと長くなりすぎるため）、PC は1行3本で折り返して中央に並べる。
 * 本数が少ないうちは w-max + mx-auto で中央に寄り、はみ出したら左から横スクロールになる。
 *
 * 再生前は表紙（本人の顔＋名前と肩書きの帯のカット）に再生ボタンだけを重ねる。ボタンは顔と帯を隠さないよう
 * 下の字幕の黒い帯の上に置く（黒地で見えるよう黄色。押せるのは表紙全体）。最初から controls は出さない（表紙に操作バーがかぶるため）。
 * 全画面は縦動画を切り抜かず、左右に黄色を残して画面の高さに収める（object-contain＋全画面時の背景を黄色）。
 * 全画面の黄色はサイトの brand（#ffd600）ではなく、再生中の動画の黄色の実測値（Chrome で #ffcf00 前後）に合わせる。
 * 動画は色の出方がブラウザで少し違うため、境目が完全に消えないことはある。
 * 押したら controls を出して再生。動画は押すまで読み込まない（preload="none"）。1本再生したら、ほかは止める。
 */
export default function Interviews() {
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const [started, setStarted] = useState<ReadonlySet<number>>(new Set());

  const start = (i: number) => {
    setStarted((s) => new Set(s).add(i));
    void videos.current[i]?.play();
  };

  const pauseOthers = (current: number) => {
    videos.current.forEach((v, i) => {
      if (v && i !== current && !v.paused) v.pause();
    });
  };

  return (
    <section
      id="interviews"
      aria-labelledby="interviews-title"
      className="bg-brand py-20 md:py-24"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-10 md:gap-12">
        <Reveal className="px-6">
          <SectionHeading
            id="interviews-title"
            jp="インタビュー"
            en="INTERVIEW"
          />
        </Reveal>

        <Reveal delay={80} className="px-6">
          {/* 短い一文なので中央揃え。文節ごとに inline-block で包み、モバイルで語の途中で折れないようにする */}
          <p className="max-w-[640px] text-center text-[15px] leading-[1.9] text-ink md:text-base">
            <span className="inline-block">NO LOOK PARK メンバーから</span>
            <span className="inline-block">あなたへ贈る</span>
            <span className="inline-block">「みえない世界の歩き方」。</span>
          </p>
        </Reveal>

        {/* overflow-x だけを auto にすると縦も auto 扱いになり、中身が数px でも縦にはみ出すと
            横スワイプ中に上下に揺れる。縦は hidden で止める。
            浮き上がり（Reveal）はカード1枚ずつでなく一覧全体に1回だけ。1枚ずつだと、横にスワイプして
            画面に入ってきたカードが下から浮き上がり、上下に動いて見える */}
        <Reveal delay={160} className="w-full">
          <div className="w-full overflow-x-auto overflow-y-hidden overscroll-x-contain snap-x snap-mandatory md:overflow-visible">
            <ul className="mx-auto flex w-max gap-5 px-6 pb-2 md:w-auto md:max-w-[880px] md:flex-wrap md:justify-center md:gap-7 md:px-0">
              {INTERVIEWS.map((m, i) => {
                const playing = started.has(i);
                return (
                  <li
                    key={m.video}
                    className="w-[min(72vw,280px)] shrink-0 snap-center md:w-[240px] lg:w-[260px]"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="relative overflow-hidden rounded-xl border-2 border-ink bg-brand">
                        <video
                          ref={(el) => {
                            videos.current[i] = el;
                          }}
                          src={m.video}
                          poster={m.poster}
                          controls={playing}
                          playsInline
                          preload="none"
                          onPlay={() => pauseOthers(i)}
                          aria-label={`${m.name}さん（${m.role}）のインタビュー動画（字幕入り）`}
                          className="block aspect-[9/16] w-full bg-brand object-contain [&:-webkit-full-screen]:bg-[#ffcf00] [&:fullscreen]:bg-[#ffcf00]"
                        />
                        {!playing && (
                          <button
                            type="button"
                            onClick={() => start(i)}
                            aria-label={`${m.name}さんのインタビュー動画を再生`}
                            className="group absolute inset-0"
                          >
                            <span className="absolute left-1/2 top-[80%] flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-ink shadow-lg ring-2 ring-ink transition-transform group-hover:scale-110 group-focus-visible:scale-110">
                              <Play
                                size={28}
                                fill="currentColor"
                                className="translate-x-[2px]"
                                aria-hidden
                              />
                            </span>
                          </button>
                        )}
                      </div>
                      <p className="px-1 text-ink">
                        <span className="text-[17px] tracking-[1px]">
                          {m.name}さん
                        </span>
                        <span className="inline-block max-w-full text-[12px] tracking-[0.5px] opacity-70">
                          （{m.role}）
                        </span>
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
