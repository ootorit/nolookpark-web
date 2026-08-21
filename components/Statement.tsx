import { Fragment } from "react";
import { STATEMENT_BODY, SPOTIFY_EMBED_URL, PODCAST } from "@/lib/site";
import Reveal from "./Reveal";

function PodcastPlayer() {
  return (
    <div className="flex w-full max-w-[900px] flex-col gap-6 rounded-[20px] bg-cream p-8 ring-1 ring-inset ring-line md:px-12 md:pb-11 md:pt-12">
      <div className="flex flex-col items-center gap-2.5 text-center">
        <h3 className="text-xl tracking-[1px] text-ink">{PODCAST.title}</h3>
        <p className="text-[15px] leading-[1.9] text-ink">{PODCAST.sub}</p>
      </div>

      <iframe
        title="NO LOOK BROTHERS のポッドキャスト（Spotify）"
        src={SPOTIFY_EMBED_URL}
        width="100%"
        height="352"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        className="h-[352px] w-full rounded-xl md:h-[232px]"
        style={{ border: 0 }}
      />
    </div>
  );
}

// ハイライトが伸び始めるまでの間（本文が現れてから少し遅れて引く）と、
// 2本目以降をずらす幅。伸びる速さ自体は globals.css の .hl。
const HIGHLIGHT_DELAY = 400;
const HIGHLIGHT_STEP = 300;

/** 段落の中の改行を <br> にする（原稿の改行位置をそのまま出す） */
function renderLines(text: string) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}

/**
 * `==…==` で囲まれたところに黄色のマーカーを引く。
 * 行をまたいで囲めるよう、段落をいったん改行つなぎの1本の文字列にしてから分ける。
 * box-decoration-break は Next の CSS 圧縮で -webkit- が落ちるため、
 * ここでインラインで当てる（Safari で行ごとにマーカーが引かれなくなるのを防ぐ）。
 */
function renderParagraph(lines: readonly string[], nextHighlight: () => number) {
  return lines
    .join("\n")
    .split("==")
    .map((part, i) => {
      if (i % 2 === 0) return <Fragment key={i}>{renderLines(part)}</Fragment>;
      const order = nextHighlight();
      return (
        <mark
          key={i}
          className="hl"
          style={{
            WebkitBoxDecorationBreak: "clone",
            boxDecorationBreak: "clone",
            transitionDelay: `${HIGHLIGHT_DELAY + order * HIGHLIGHT_STEP}ms`,
          }}
        >
          {renderLines(part)}
        </mark>
      );
    });
}

export default function Statement() {
  let highlights = 0;
  const nextHighlight = () => highlights++;

  return (
    <section
      id="statement"
      aria-label="コンセプト"
      className="bg-white px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto flex max-w-[840px] flex-col items-center gap-10 text-center">
        <Reveal>
          <h2 className="text-3xl leading-[1.5] text-ink md:text-[44px] md:leading-[1.6]">
            「みえない」を
            <br />
            楽しみつくそう！
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="flex max-w-[640px] flex-col gap-5 text-base leading-[1.8] text-ink">
            {STATEMENT_BODY.map((lines, i) => (
              <p key={i}>{renderParagraph(lines, nextHighlight)}</p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={300} className="mt-4 flex w-full justify-center">
          <PodcastPlayer />
        </Reveal>
      </div>
    </section>
  );
}
