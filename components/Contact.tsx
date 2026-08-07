"use client";

import { useState } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const PURPOSES = ["イベントについて", "メディア取材", "協賛・出展", "その他"];

function FieldLabel({
  label,
  required,
  htmlFor,
  id,
}: {
  label: string;
  required?: boolean;
  htmlFor?: string;
  id?: string;
}) {
  const content = (
    <>
      <span className="text-[13px] tracking-[1px] text-white">{label}</span>
      {required ? (
        <span className="rounded bg-brand px-1.5 py-0.5 text-[10px] text-ink">
          必須
        </span>
      ) : (
        <span className="text-[10px] text-white">任意</span>
      )}
    </>
  );
  if (htmlFor) {
    return (
      <label htmlFor={htmlFor} className="flex items-center gap-2">
        {content}
      </label>
    );
  }
  return (
    <div id={id} className="flex items-center gap-2">
      {content}
    </div>
  );
}

const inputCls =
  "h-[52px] w-full rounded-lg bg-field px-4 text-sm text-white outline-none ring-1 ring-inset ring-line-dark placeholder:text-white/35 focus:ring-brand";

export default function Contact() {
  const [purpose, setPurpose] = useState(0);
  const [agree, setAgree] = useState(false);

  return (
    <section
      id="contact"
      aria-label="お問い合わせ"
      className="bg-ink px-6 py-24 md:px-12 md:py-28"
    >
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-12">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <SectionHeading jp="お問い合わせ" en="CONTACT" tone="brand" />
          <p className="max-w-[600px] text-base leading-[1.8] text-white">
            本イベントに関するお問い合わせは、下記フォームよりご連絡ください。
          </p>
        </Reveal>

        <Reveal delay={100} className="w-full">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full flex-col gap-7 rounded-2xl bg-ink-soft p-6 ring-1 ring-inset ring-line-dark md:p-12"
        >
          {/* Purpose */}
          <div className="flex flex-col gap-3.5">
            <FieldLabel label="お問い合わせ目的" required id="purpose-label" />
            <div
              role="radiogroup"
              aria-labelledby="purpose-label"
              aria-required="true"
              className="flex flex-wrap gap-2.5"
            >
              {PURPOSES.map((p, i) => {
                const active = purpose === i;
                return (
                  <button
                    key={p}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setPurpose(i)}
                    className={[
                      "rounded-full px-4 py-2.5 text-[13px] transition-colors",
                      active
                        ? "bg-brand text-ink ring-2 ring-inset ring-brand"
                        : "bg-[#2e2e2e] text-white ring-1 ring-inset ring-line-dark hover:text-white",
                    ].join(" ")}
                  >
                    <span aria-hidden>{active ? "✓ " : ""}</span>
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <FieldLabel label="お名前" required htmlFor="contact-name" />
              <input id="contact-name" aria-required="true" className={inputCls} placeholder="山田 太郎" />
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel label="会社・団体名" htmlFor="contact-company" />
              <input id="contact-company" className={inputCls} placeholder="株式会社ノールック" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <FieldLabel label="メールアドレス" required htmlFor="contact-email" />
              <input id="contact-email" type="email" aria-required="true" className={inputCls} placeholder="info@example.com" />
            </div>
            <div className="flex flex-col gap-2">
              <FieldLabel label="電話番号" htmlFor="contact-tel" />
              <input id="contact-tel" type="tel" className={inputCls} placeholder="03-1234-5678" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <FieldLabel label="お問い合わせ内容" required htmlFor="contact-message" />
            <textarea
              id="contact-message"
              aria-required="true"
              rows={5}
              className="w-full rounded-lg bg-field p-4 text-sm text-white outline-none ring-1 ring-inset ring-line-dark placeholder:text-white/35 focus:ring-brand"
              placeholder="取材のご依頼、ご相談内容などをご記入ください。"
            />
          </div>

          <label className="flex items-center justify-center gap-2.5 text-[13px] text-white">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="h-[18px] w-[18px] accent-brand"
            />
            プライバシーポリシーに同意のうえ送信します
          </label>

          <div className="flex justify-center">
            <button
              type="submit"
              className="group flex items-center gap-3 rounded-full bg-brand px-16 py-[18px] transition-transform hover:scale-105"
            >
              <span className="text-[15px] tracking-[1px] text-ink">送信する</span>
              <span
                aria-hidden
                className="font-en text-[15px] text-ink transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </div>
        </form>
        </Reveal>
      </div>
    </section>
  );
}
