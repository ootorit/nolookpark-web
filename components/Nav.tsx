"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, IMG } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-[1360px] items-center px-6 py-5 md:px-10">
        <a href="#top" className="flex items-center" aria-label="NO LOOK PARK ホーム">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.logo} alt="NO LOOK PARK" className="h-11 w-11 object-contain md:h-14 md:w-14" />
        </a>

        <div className="flex-1" />

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-en text-xs font-medium tracking-[2px] text-ink transition-opacity hover:opacity-60"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="font-en rounded-full bg-ink px-6 py-2.5 text-xs font-bold tracking-[2px] text-brand transition-transform hover:scale-105"
          >
            TICKET
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-brand md:hidden"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="mx-6 rounded-2xl bg-ink px-6 py-6 md:hidden">
          <div className="flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-en text-sm font-medium tracking-[2px] text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="font-en mt-1 w-full rounded-full bg-brand py-3 text-center text-sm font-bold tracking-[2px] text-ink"
            >
              TICKET
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
