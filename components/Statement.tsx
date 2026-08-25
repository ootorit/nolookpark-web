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

/**
 * 段落の中の改行を <br> にする（原稿の改行位置をそのまま出す）。
 * ただしモバイルでは改行を効かせない。原稿の改行はPC幅で読みやすいように
 * 切ってあるので、狭い画面ではその行がさらに折り返し、2〜4文字の端切れが
 * 中央に浮いて読みにくくなる。md 未満では素の文章として流す。
 */
function renderLines(text: string) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br className="hidden md:inline" />}
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
          {/*
            行頭の「 と行末の！ は、送り幅の中で字面が片側に寄っている。
            そのままボックスを中央ぞろえにすると、1行目は右へ・2行目は左へ
            ずれて見える（44px で実測すると2行の字面中心が約20pxずれる）。
            字面の中心がそろうように、行ごとに光学補正をかけている。
            数値は canvas の actualBoundingBox 実測値（1行目 +0.271em / 2行目 -0.192em）。
          */}
          <h2 className="text-[26px] font-medium leading-[1.5] text-ink md:text-[44px] md:leading-[1.6]">
            <span className="block translate-x-[-0.271em]">「みえない」を</span>
            <span className="block translate-x-[0.192em]">楽しみつくそう！</span>
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="flex max-w-[640px] flex-col gap-5 text-base leading-[1.9] text-ink md:text-lg">
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
