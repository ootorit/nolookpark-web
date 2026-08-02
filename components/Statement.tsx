import { STATEMENT_BODY, SPOTIFY_EMBED_URL } from "@/lib/site";
import Reveal from "./Reveal";

function PodcastPlayer() {
  return (
    <div className="w-full max-w-[800px]">
      <iframe
        title="NO LOOK BROTHERS のポッドキャスト（Spotify）"
        src={SPOTIFY_EMBED_URL}
        width="100%"
        height="232"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        className="w-full rounded-xl"
        style={{ border: 0 }}
      />
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <span className="text-xs text-ink">各種配信サービスでも公開中</span>
        {["Spotify", "Apple Podcasts", "YouTube"].map((p) => (
          <span key={p} className="font-en text-xs text-ink">
            {p}
          </span>
        ))}
      </div>
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
            「みえない」を楽しみつくそう
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
