import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE, expectedToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function login(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "").trim();
  const pw = String(formData.get("password") ?? "");
  const user = process.env.BASIC_AUTH_USER?.trim();
  const pass = process.env.BASIC_AUTH_PASSWORD?.trim();

  if (user && pass && id === user && pw === pass) {
    const jar = await cookies();
    jar.set(AUTH_COOKIE, expectedToken(user, pass), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30日
    });
    redirect("/");
  }

  redirect("/login?error=1");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-8 bg-brand px-6 py-16">
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="font-en text-2xl tracking-[2px] text-ink">NO LOOK PARK</span>
        <span className="text-sm leading-[1.7] text-ink/70">
          公開前のサイトです。
          <br />
          IDとパスワードを入力してください。
        </span>
      </div>

      <form action={login} className="flex w-full max-w-[340px] flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm text-ink">
          ID
          <input
            name="id"
            autoComplete="username"
            required
            className="h-12 rounded-lg border-2 border-ink bg-white px-4 text-ink outline-none focus:ring-2 focus:ring-ink"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm text-ink">
          パスワード
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="h-12 rounded-lg border-2 border-ink bg-white px-4 text-ink outline-none focus:ring-2 focus:ring-ink"
          />
        </label>

        {error ? (
          <p className="text-sm text-[#b00020]">IDまたはパスワードが違います。</p>
        ) : null}

        <button
          type="submit"
          className="mt-2 h-12 rounded-full bg-ink text-sm tracking-[1px] text-brand transition-opacity hover:opacity-90"
        >
          ログイン
        </button>
      </form>
    </main>
  );
}
