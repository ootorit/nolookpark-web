"use client";

import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { INTERVIEWS } from "@/lib/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/**
 * メンバーのインタビュー動画（縦9:16）。
 * モバイルは横スクロール（縦長の動画を5本積むと長くなりすぎるため）、PC は折り返して中央に並べる。
 * 本数が少ないうちは w-max + mx-auto で中央に寄り、はみ出したら左から横スクロールになる。
 *
 * 再生前は表紙（タイトル画面）に再生ボタンだけを重ねる（ロゴと名前の帯を隠さないよう上の写真のあたり。押せるのは表紙全体）。最初から controls を出すと、
 * 操作バーが表紙下部の「◯◯さん インタビュー」に重なって読めないため。
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
      className="bg-white py-20 md:py-24"
    >
      <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-10 md:gap-12">
        <Reveal className="px-6">
          <SectionHeading id="interviews-title" jp="インタビュー" en="INTERVIEW" />
        </Reveal>

        <Reveal delay={80} className="self-stretch px-6 md:self-auto">
          <p className="max-w-[640px] text-left text-[15px] leading-[1.9] text-ink md:text-center">
            NO LOOK PARK をつくるメンバーに、担当するコンテンツと「みえない」の楽しみ方を聞きました。動画は字幕入りです。
          </p>
        </Reveal>

        <div className="w-full overflow-x-auto snap-x snap-mandatory md:overflow-visible">
          <ul className="mx-auto flex w-max gap-5 px-6 pb-2 md:w-auto md:flex-wrap md:justify-center md:gap-7 md:px-12">
            {INTERVIEWS.map((m, i) => {
              const playing = started.has(i);
              return (
                <li key={m.video} className="w-[min(72vw,280px)] shrink-0 snap-center md:w-[240px] lg:w-[260px]">
                  <Reveal delay={i * 120} className="flex flex-col gap-3">
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
                        aria-label={`${m.name}さんのインタビュー動画（${m.duration}・字幕入り）`}
                        className="block aspect-[9/16] w-full object-cover"
                      />
                      {!playing && (
                        <button
                          type="button"
                          onClick={() => start(i)}
                          aria-label={`${m.name}さんのインタビュー動画を再生（${m.duration}）`}
                          className="group absolute inset-0"
                        >
                          <span className="absolute left-1/2 top-[15%] flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-ink text-brand shadow-lg transition-transform group-hover:scale-110 group-focus-visible:scale-110">
                            <Play size={28} fill="currentColor" className="translate-x-[2px]" aria-hidden />
                          </span>
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5 px-1">
                      <span className="text-[17px] tracking-[1px] text-ink">{m.name}</span>
                      <span className="text-[12px] tracking-[0.5px] text-ink opacity-70">
                        {m.role}・{m.duration}
                      </span>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
