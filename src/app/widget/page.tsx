import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          mendadak Chatbot
        </h1>
        <p className="text-gray-600">
          Klik tombol biru di pojok kanan bawah untuk mulai chat
        </p>
      </div>
      <ChatWidget />
    </main>
  );
}