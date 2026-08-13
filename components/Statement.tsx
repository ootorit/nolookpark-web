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

export default function Statement() {
  return (
    <section
      id="statement"
      aria-label="コンセプト"
      className="bg-white px-6 py-24 md:px-12 md:py-32"
    >
      <div className="mx-auto flex max-w-[840px] flex-col items-center gap-10 text-center">
        <Reveal>
          <h2 className="text-3xl leading-[1.5] text-ink md:text-[44px] md:leading-[1.6]">
            「みえない」を楽しみつくそう！！
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div className="flex max-w-[640px] flex-col gap-5 text-base leading-[1.8] text-ink">
            {STATEMENT_BODY.map((p, i) => (
              <p key={i}>{p}</p>
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
