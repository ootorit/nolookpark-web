import { Headphones, Play, RotateCcw, RotateCw } from "lucide-react";
import { STATEMENT_BODY } from "@/lib/site";

function PodcastPlayer() {
  return (
    <div className="w-full max-w-[800px]">
      <div className="flex flex-col gap-6 rounded-2xl bg-ink-soft p-6 ring-1 ring-inset ring-line-dark sm:flex-row sm:items-center">
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-brand">
          <Headphones className="h-12 w-12 text-ink" strokeWidth={1.75} />
        </div>

        <div className="flex flex-1 flex-col gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="font-en rounded bg-brand px-2 py-1 text-[10px] font-bold tracking-[2px] text-ink">
              PODCAST
            </span>
            <span className="font-en text-[11px] font-bold tracking-[2px] text-white/50">
              EP.01
            </span>
          </div>
          <h3 className="text-xl font-bold tracking-[1px] text-white">
            「見ない」からはじまる話
          </h3>
          <p className="text-xs text-white/50">NO LOOK BROTHERS ／ 24分18秒</p>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-line-dark">
            <div className="h-full w-1/2 rounded-full bg-brand" />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-en text-[11px] text-white/50">07:42</span>
            <span className="font-en text-[11px] text-white/50">24:18</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <button aria-label="15秒戻る" className="text-white/60 transition-colors hover:text-white">
            <RotateCcw size={20} />
          </button>
          <button
            aria-label="再生"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand transition-transform hover:scale-105"
          >
            <Play className="h-6 w-6 fill-ink text-ink" />
          </button>
          <button aria-label="15秒進む" className="text-white/60 transition-colors hover:text-white">
            <RotateCw size={20} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <span className="text-xs text-ink/45">各種配信サービスでも公開中</span>
        {["Spotify", "Apple Podcasts", "YouTube"].map((p) => (
          <span key={p} className="font-en text-xs font-medium text-ink/70">
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Statement() {
  return (
    <section id="statement" className="bg-white px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto flex max-w-[840px] flex-col items-center gap-10 text-center">
        <h2 className="text-3xl font-bold leading-[1.5] text-ink md:text-[44px] md:leading-[1.6]">
          「みえない」を楽しみつくそう
        </h2>

        <div className="flex max-w-[640px] flex-col gap-5 text-base font-semibold leading-[1.8] text-ink/70">
          {STATEMENT_BODY.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-4 flex w-full justify-center">
          <PodcastPlayer />
        </div>
      </div>
    </section>
  );
}
