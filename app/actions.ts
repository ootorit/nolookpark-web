"use server";

import { Resend } from "resend";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function sendContactEmail(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const purpose = String(formData.get("purpose") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const tel = String(formData.get("tel") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const agree = formData.get("agree") === "on";

  // --- Validation ---
  if (!name || !email || !message) {
    return { status: "error", message: "必須項目（お名前・メール・お問い合わせ内容）をご入力ください。" };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { status: "error", message: "メールアドレスの形式をご確認ください。" };
  }
  if (!agree) {
    return { status: "error", message: "プライバシーポリシーへの同意が必要です。" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "NO LOOK PARK <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return { status: "error", message: "送信設定が未完了です。しばらくしてから再度お試しください。" };
  }

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `【NO LOOK PARK お問い合わせ】${purpose || "（目的未選択）"}／${name}`,
      text: [
        `お問い合わせ目的: ${purpose || "-"}`,
        `お名前: ${name}`,
        `会社・団体名: ${company || "-"}`,
        `メールアドレス: ${email}`,
        `電話番号: ${tel || "-"}`,
        "",
        "── お問い合わせ内容 ──",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return { status: "error", message: "送信に失敗しました。しばらくしてから再度お試しください。" };
    }
    return {
      status: "success",
      message: "お問い合わせを送信しました。内容を確認のうえ、担当者よりご返信いたします。",
    };
  } catch (e) {
    console.error("Contact form send failed:", e);
    return { status: "error", message: "送信に失敗しました。しばらくしてから再度お試しください。" };
  }
}
