const ACCOUNT_ID = process.env.LIVECHAT_ACCOUNT_ID;
const PAT = process.env.LIVECHAT_PAT;
const LICENSE_ID = process.env.LIVECHAT_LICENSE_ID;
const WEBHOOK_SECRET = process.env.LIVECHAT_WEBHOOK_SECRET;
const BOT_NAME = process.env.LIVECHAT_BOT_NAME ?? "Friday Bot";

if (!ACCOUNT_ID || !PAT || !LICENSE_ID || !WEBHOOK_SECRET) {
  throw new Error("LiveChat env vars missing");
}

async function livechatFetch(path: string, payload: any) {
  const url = `https://api.livechatinc.com${path}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PAT}`,
      "X-Region": "dal", // region default, biarkan dulu
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("LiveChat API error", res.status, text);
    throw new Error(`LiveChat API error: ${res.status}`);
  }

  return res.json();
}

export async function GET() {
  // 1. Daftarkan webhook chat events
  await livechatFetch("/v3.5/configuration/action/register_webhook", {
    url: "https://chatbot-livechat.vercel.app/api/livechat/webhook",
    type: "license",
    secret_key: WEBHOOK_SECRET,
    actions: ["incoming_chat", "incoming_event"],
  });

  // 2. Buat bot agent Friday (kalau belum ada, pemanggilan ulang biasanya idempotent)
  await livechatFetch("/v3.5/configuration/action/create_bot_agent", {
    type: "bot",
    name: BOT_NAME,
    avatar: "https://chatbot-livechat.vercel.app/friday-avatar.jpg",
    // kalau LiveChat butuh license scope, bisa ditambahkan field custom di sini
  });

  return new Response("registered", { status: 200 });
}