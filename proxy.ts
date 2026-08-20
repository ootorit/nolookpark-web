import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_COOKIE, expectedToken } from "./lib/auth";

// 公開前ゲート（Cookie方式）。
// HTTP Basic認証はブラウザ/セキュリティソフトにフィッシングと誤判定され警告されるため、
// 通常のログインフォーム + Cookie で認証する方式にしている。
// 認証情報は公開リポジトリに直書きせず環境変数から読む:
//   BASIC_AUTH_USER / BASIC_AUTH_PASSWORD
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ログイン画面（とそのServer Action POST）は常に許可
  if (pathname === "/login") {
    return NextResponse.next();
  }

  const user = process.env.BASIC_AUTH_USER?.trim();
  const pass = process.env.BASIC_AUTH_PASSWORD?.trim();

  // 認証情報が未設定なら、公開前として全体をロック(fail-closed)
  if (!user || !pass) {
    return new NextResponse("このサイトは現在準備中です。", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const cookie = request.cookies.get(AUTH_COOKIE)?.value;
  if (cookie && cookie === expectedToken(user, pass)) {
    return NextResponse.next();
  }

  // 未認証 → ログイン画面へ
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  // Next 内部の静的アセットと favicon 以外の全リクエストを対象にする
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
