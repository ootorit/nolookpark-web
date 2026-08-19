import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 公開前のBasic認証ゲート。
// 認証情報は公開リポジトリに直書きせず、環境変数から読む:
//   BASIC_AUTH_USER / BASIC_AUTH_PASSWORD
// (Next.js 16 では Middleware は Proxy に改名。Node.js ランタイムで動作)
export function proxy(request: NextRequest) {
  // 貼り付け時の末尾空白・改行に強くするため trim する
  const user = process.env.BASIC_AUTH_USER?.trim();
  const pass = process.env.BASIC_AUTH_PASSWORD?.trim();

  // 認証情報が未設定なら、公開前として全体をロック(fail-closed)
  if (!user || !pass) {
    return new NextResponse("このサイトは現在準備中です。", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Basic ")) {
    const decoded = Buffer.from(auth.slice(6), "base64").toString("utf-8");
    const sep = decoded.indexOf(":");
    const u = decoded.slice(0, sep);
    const p = decoded.slice(sep + 1);
    if (u === user && p === pass) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="NO LOOK PARK", charset="UTF-8"',
      "content-type": "text/plain; charset=utf-8",
    },
  });
}

export const config = {
  // Next 内部の静的アセットと favicon 以外の全リクエストを認証対象にする
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
