// 公開前ゲートの共有ロジック（proxy.ts とログインページで共用）
export const AUTH_COOKIE = "nlp_auth";

// Cookie に入れる認証トークン（平文パスワードをそのまま置かない）
export function expectedToken(user: string, pass: string) {
  return Buffer.from(`${user}:${pass}`, "utf-8").toString("base64");
}
