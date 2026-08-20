"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, NAV_TICKET, TICKET_URL, IMG } from "@/lib/site";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        scrolled ? "bg-brand/95 backdrop-blur-sm" : ""
      }`}
    >
      <nav
        aria-label="メインナビゲーション"
        className="mx-auto flex max-w-[1360px] items-center px-6 py-5 md:px-10"
      >
        <a href="#top" className="flex items-center" aria-label="NO LOOK PARK ホーム">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG.logo} alt="NO LOOK PARK" className="h-11 w-11 object-contain md:h-14 md:w-14" />
        </a>

        <div className="flex-1" />

        {/* Desktop links */}
        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13px] tracking-[1px] text-ink transition-opacity hover:opacity-60"
            >
              {l.label}
            </a>
          ))}
          <a
            href={TICKET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-6 py-2.5 text-[13px] tracking-[1px] text-brand transition-transform hover:scale-105"
          >
            {NAV_TICKET}
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
                className="text-sm tracking-[1px] text-white"
              >
                {l.label}
              </a>
            ))}
            <a
              href={TICKET_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-1 w-full rounded-full bg-brand py-3 text-center text-sm tracking-[1px] text-ink"
            >
              {NAV_TICKET}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
