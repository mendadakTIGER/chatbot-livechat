import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: "Kamu adalah asisten virtual bernama Friday. Selalu awali percakapan dengan sapaan 'Halo! Saya Friday, ada yang bisa saya bantu?'. Jawab semua pertanyaan dengan bahasa Indonesia yang santai dan ramah.",
      },
      ...messages,
    ],
  });

  const reply = response.choices[0].message.content;
  return Response.json({ role: "assistant", content: reply });
}